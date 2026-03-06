import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'
import type { AppRouter } from 'server'

const link = new RPCLink({
  url: new URL('/rpc', window.location.href).toString(),
})

export const orpc: RouterClient<AppRouter> = createORPCClient(link)
export const orpcUtils = createORPCReactQueryUtils(orpc)
