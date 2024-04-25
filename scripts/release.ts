import type { ExecSyncOptions } from 'child_process'

import chalk from 'chalk'
import { execSync } from 'child_process'
import execa from 'execa'
import fse from 'fs-extra'
import minimist from 'minimist'
import { fileURLToPath } from 'node:url'
import pLimit from 'p-limit'
import path from 'path'
import prompts from 'prompts'
import semver from 'semver'
import { simpleGit } from 'simple-git'

import type { PackageDetails } from './lib/getPackageDetails.js'

import { getPackageDetails } from './lib/getPackageDetails.js'
import { updateChangelog } from './utils/updateChangelog.js'

const npmPublishLimit = pLimit(10)

// Update this list with any packages to publish
const packageWhitelist = [
  'payload',
  'translations',
  'ui',
  'next',
  'graphql',
  'db-mongodb',
  'db-postgres',
  'richtext-slate',
  'richtext-lexical',

  'create-payload-app',

  // Adapters
  'email-nodemailer',

  'storage-s3',
  'storage-azure',
  'storage-gcs',
  'storage-vercel-blob',

  // Plugins
  'plugin-cloud',
  'plugin-cloud-storage',
  'plugin-form-builder',
  'plugin-nested-docs',
  'plugin-redirects',
  'plugin-search',
  'plugin-seo',
  // 'plugin-stripe',
  // 'plugin-sentry',
]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const cwd = path.resolve(dirname, '..')

const git = simpleGit(cwd)

const execOpts: ExecSyncOptions = { stdio: 'inherit' }
const execaOpts: execa.Options = { stdio: 'inherit' }

const args = minimist(process.argv.slice(2))

const {
  bump = 'patch', // Semver release type
  changelog = false, // Whether to update the changelog. WARNING: This gets throttled on too many commits
  'dry-run': dryRun,
  'git-tag': gitTag = true, // Whether to run git tag and commit operations
  'git-commit': gitCommit = true, // Whether to run git commit operations
  tag = 'latest',
} = args

const logPrefix = dryRun ? chalk.bold.magenta('[dry-run] >') : ''

const cmdRunner =
  (dryRun: boolean, gitTag: boolean) => (cmd: string, execOpts: ExecSyncOptions) => {
    const isGitCommand = cmd.startsWith('git')
    if (dryRun || (isGitCommand && !gitTag)) {
      console.log(logPrefix, cmd)
    } else {
      execSync(cmd, execOpts)
    }
  }

const cmdRunnerAsync =
  (dryRun: boolean) => async (cmd: string, args: string[], options?: execa.Options) => {
    if (dryRun) {
      console.log(logPrefix, cmd, args.join(' '))
      return { exitCode: 0 }
    } else {
      return await execa(cmd, args, options ?? { stdio: 'inherit' })
    }
  }

async function main() {
  if (dryRun) {
    console.log(chalk.bold.yellow(chalk.bold.magenta('\n  👀 Dry run mode enabled')))
  }

  console.log({ args })

  const runCmd = cmdRunner(dryRun, gitTag)
  const runCmdAsync = cmdRunnerAsync(dryRun)

  if (!semver.RELEASE_TYPES.includes(bump)) {
    abort(`Invalid bump type: ${bump}.\n\nMust be one of: ${semver.RELEASE_TYPES.join(', ')}`)
  }

  if (bump.startsWith('pre') && tag === 'latest') {
    abort(`Prerelease bumps must have tag: beta or canary`)
  }

  const monorepoVersion = fse.readJSONSync('package.json')?.version

  if (!monorepoVersion) {
    throw new Error('Could not find version in package.json')
  }

  const lastTag = (await git.tags()).all.reverse().filter((t) => t.startsWith('v'))?.[0]

  // TODO: Re-enable this check once we start tagging releases again
  // if (monorepoVersion !== lastTag.replace('v', '')) {
  //   throw new Error(
  //     `Version in package.json (${monorepoVersion}) does not match last tag (${lastTag})`,
  //   )
  // }

  const nextReleaseVersion = semver.inc(monorepoVersion, bump, undefined, tag)

  if (!nextReleaseVersion) {
    abort(`Invalid nextReleaseVersion: ${nextReleaseVersion}`)
    return // For TS type checking
  }

  let packageDetails = await getPackageDetails(packageWhitelist)

  console.log(chalk.bold(`\n  Version: ${monorepoVersion} => ${chalk.green(nextReleaseVersion)}\n`))
  console.log(chalk.bold.yellow(`  Bump: ${bump}`))
  console.log(chalk.bold.yellow(`  Tag: ${tag}\n`))
  console.log(chalk.bold.green(`  Changes (${packageDetails.length} packages):\n`))
  console.log(
    `${packageDetails
      .map((p) => `  - ${p.name.padEnd(32)} ${p.version} => ${chalk.green(nextReleaseVersion)}`)
      .join('\n')}\n`,
  )

  const confirmPublish = await confirm('Are you sure you want to create these versions?')

  if (!confirmPublish) {
    abort()
  }

  // Prebuild all packages
  header(`\n🔨 Prebuilding all packages...`)

  await execa('pnpm', ['install'], execaOpts)

  const buildResult = await execa('pnpm', ['build:all', '--output-logs=errors-only'], execaOpts)
  if (buildResult.exitCode !== 0) {
    console.error(chalk.bold.red('Build failed'))
    console.log(buildResult.stderr)
    abort('Build failed')
  }

  // Update changelog
  if (changelog) {
    header(`${logPrefix}📝 Updating changelog...`)
    await updateChangelog({ dryRun, newVersion: nextReleaseVersion })
  } else {
    console.log(chalk.bold.yellow('📝 Skipping changelog update'))
  }

  // Increment all package versions
  header(`${logPrefix}📦 Updating package.json versions...`)
  await Promise.all(
    packageDetails.map(async (pkg) => {
      const packageJson = await fse.readJSON(`${pkg.packagePath}/package.json`)
      packageJson.version = nextReleaseVersion
      if (!dryRun) {
        await fse.writeJSON(`${pkg.packagePath}/package.json`, packageJson, { spaces: 2 })
      }
    }),
  )

  // Set version in root package.json
  header(`${logPrefix}📦 Updating root package.json...`)
  const rootPackageJsonPath = path.resolve(dirname, '../package.json')
  const rootPackageJson = await fse.readJSON(rootPackageJsonPath)
  rootPackageJson.version = nextReleaseVersion
  if (!dryRun) {
    await fse.writeJSON(rootPackageJsonPath, rootPackageJson, { spaces: 2 })
  }

  // Commit
  header(`🧑‍💻 Committing changes...`)

  // Commit all staged changes
  runCmd(`git add CHANGELOG.md packages/**/package.json package.json`, execOpts)

  if (gitCommit) {
    runCmd(`git commit -m "chore(release): v${nextReleaseVersion} [skip ci]"`, execOpts)
  }

  // Tag
  header(`🏷️  Tagging release v${nextReleaseVersion}`, { enable: gitTag })
  runCmd(`git tag -a v${nextReleaseVersion} -m "v${nextReleaseVersion}"`, execOpts)

  // Publish only payload to get 5 min auth token
  packageDetails = packageDetails.filter((p) => p.name !== 'payload')
  runCmd(`pnpm publish -C packages/payload --no-git-checks --json --tag ${tag}`, execOpts)

  const results = await Promise.all(
    packageDetails.map((pkg) => publishPackageThrottled(pkg, { dryRun })),
  )

  console.log(chalk.bold.green(`\n\nResults:\n`))

  // New results format
  console.log(
    results
      .map(({ name, success, details }) => {
        let summary = `  ${success ? '✅' : '❌'} ${name}`
        if (details) {
          summary += `\n    ${details}\n`
        }
        return summary
      })
      .join('\n') + '\n',
  )

  // TODO: Push commit and tag
  // const push = await confirm(`Push commits and tags?`)
  // if (push) {
  //   header(`Pushing commits and tags...`)
  //   execSync(`git push --follow-tags`, execOpts)
  // }

  header('🎉 Done!')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

/** Publish with promise concurrency throttling */
async function publishPackageThrottled(pkg: PackageDetails, opts?: { dryRun?: boolean }) {
  const { dryRun = false } = opts ?? {}
  return npmPublishLimit(() => publishSinglePackage(pkg, { dryRun }))
}

async function publishSinglePackage(pkg: PackageDetails, opts?: { dryRun?: boolean }) {
  const { dryRun = false } = opts ?? {}
  console.log(chalk.bold(`🚀 ${pkg.name} publishing...`))
  const cmdArgs = ['publish', '-C', pkg.packagePath, '--no-git-checks', '--json', '--tag', tag]
  if (dryRun) {
    cmdArgs.push('--dry-run')
  }
  const { exitCode, stderr } = await execa('pnpm', cmdArgs, {
    cwd,
    stdio: ['ignore', 'ignore', 'pipe'],
    // stdio: 'inherit',
  })

  if (exitCode !== 0) {
    console.log(chalk.bold.red(`\n\n❌ ${pkg.name} ERROR: pnpm publish failed\n\n${stderr}`))
    return { name: pkg.name, success: false, details: stderr }
  }

  console.log(`${logPrefix} ${chalk.green(`✅ ${pkg.name} published`)}`)
  return { name: pkg.name, success: true }
}

function abort(message = 'Abort', exitCode = 1) {
  console.error(chalk.bold.red(`\n${message}\n`))
  process.exit(exitCode)
}

async function confirm(message: string): Promise<boolean> {
  const { confirm } = await prompts(
    {
      name: 'confirm',
      type: 'confirm',
      initial: false,
      message,
    },
    {
      onCancel: () => {
        abort()
      },
    },
  )

  return confirm
}

async function question(message: string): Promise<string> {
  const { value } = await prompts(
    {
      name: 'value',
      type: 'text',
      message,
    },
    {
      onCancel: () => {
        abort()
      },
    },
  )

  return value
}

function header(message: string, opts?: { enable?: boolean }) {
  const { enable } = opts ?? {}
  if (!enable) return

  console.log(chalk.bold.green(`${message}\n`))
}
