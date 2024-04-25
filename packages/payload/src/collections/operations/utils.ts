import type { forgotPasswordOperation } from '../../auth/operations/forgotPassword.js'
import type { loginOperation } from '../../auth/operations/login.js'
import type { refreshOperation } from '../../auth/operations/refresh.js'
import type { PayloadRequestWithData } from '../../types/index.js'
import type { AfterOperationHook, SanitizedCollectionConfig, TypeWithID } from '../config/types.js'
import type { countOperation } from './count.js'
import type { createOperation } from './create.js'
import type { deleteOperation } from './delete.js'
import type { deleteByIDOperation } from './deleteByID.js'
import type { findOperation } from './find.js'
import type { findByIDOperation } from './findByID.js'
import type { updateOperation } from './update.js'
import type { updateByIDOperation } from './updateByID.js'

export type AfterOperationMap<T extends TypeWithID> = {
  count: typeof countOperation
  create: typeof createOperation // todo: pass correct generic
  delete: typeof deleteOperation // todo: pass correct generic
  deleteByID: typeof deleteByIDOperation // todo: pass correct generic
  find: typeof findOperation<T>
  findByID: typeof findByIDOperation<T>
  forgotPassword: typeof forgotPasswordOperation
  login: typeof loginOperation
  refresh: typeof refreshOperation
  update: typeof updateOperation // todo: pass correct generic
  updateByID: typeof updateByIDOperation // todo: pass correct generic
}
export type AfterOperationArg<T extends TypeWithID> = {
  /** The collection which this hook is being run on */
  collection: SanitizedCollectionConfig
  req: PayloadRequestWithData
} & (
  | {
      args: Parameters<AfterOperationMap<T>['count']>[0]
      operation: 'count'
      result: Awaited<ReturnType<AfterOperationMap<T>['count']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['create']>[0]
      operation: 'create'
      result: Awaited<ReturnType<AfterOperationMap<T>['create']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['delete']>[0]
      operation: 'delete'
      result: Awaited<ReturnType<AfterOperationMap<T>['delete']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['deleteByID']>[0]
      operation: 'deleteByID'
      result: Awaited<ReturnType<AfterOperationMap<T>['deleteByID']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['find']>[0]
      operation: 'find'
      result: Awaited<ReturnType<AfterOperationMap<T>['find']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['findByID']>[0]
      operation: 'findByID'
      result: Awaited<ReturnType<AfterOperationMap<T>['findByID']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['forgotPassword']>[0]
      operation: 'forgotPassword'
      result: Awaited<ReturnType<AfterOperationMap<T>['forgotPassword']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['login']>[0]
      operation: 'login'
      result: Awaited<ReturnType<AfterOperationMap<T>['login']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['refresh']>[0]
      operation: 'refresh'
      result: Awaited<ReturnType<AfterOperationMap<T>['refresh']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['update']>[0]
      operation: 'update'
      result: Awaited<ReturnType<AfterOperationMap<T>['update']>>
    }
  | {
      args: Parameters<AfterOperationMap<T>['updateByID']>[0]
      operation: 'updateByID'
      result: Awaited<ReturnType<AfterOperationMap<T>['updateByID']>>
    }
)

// export type AfterOperationHook = typeof buildAfterOperation;

export const buildAfterOperation = async <
  T extends TypeWithID = any,
  O extends keyof AfterOperationMap<T> = keyof AfterOperationMap<T>,
>(
  operationArgs: Omit<AfterOperationArg<T>, 'req'> & { operation: O },
): Promise<Awaited<ReturnType<AfterOperationMap<T>[O]>>> => {
  const { args, collection, operation, result } = operationArgs

  let newResult = result

  await args.collection.config.hooks.afterOperation.reduce(
    async (priorHook, hook: AfterOperationHook<T>) => {
      await priorHook

      const hookResult = await hook({
        args,
        collection,
        operation,
        req: args.req,
        result: newResult,
      } as AfterOperationArg<T>)

      if (hookResult !== undefined) {
        newResult = hookResult
      }
    },
    Promise.resolve(),
  )

  return newResult
}
