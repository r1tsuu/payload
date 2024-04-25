import type { Payload } from '../../../index.js'
import type { PayloadRequestWithData } from '../../../types/index.js'
import type { AuthArgs, AuthResult } from '../auth.js'

import { createLocalReq } from '../../../utilities/createLocalReq.js'
import { auth as authOperation } from '../auth.js'

export const auth = async (payload: Payload, options: AuthArgs): Promise<AuthResult> => {
  const { headers } = options

  return await authOperation({
    headers,
    req: await createLocalReq({ req: options.req as PayloadRequestWithData }, payload),
  })
}
