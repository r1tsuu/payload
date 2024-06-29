// Example content of gitpkg.config.js
module.exports = () => ({
  getTagName: (pkg) => `${pkg.name}-${pkg.version}-${crypto.randomUUID().split('-')[0]}`,
})
