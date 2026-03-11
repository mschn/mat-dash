import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'
import type { AppRouter } from 'server'

const baseUrl = import.meta.env.VITE_BASE_URL || '/';
const rpcUrl = new URL('rpc', new URL(baseUrl, window.location.origin)).toString();

const link = new RPCLink({
  url: rpcUrl,
})

export const orpc: RouterClient<AppRouter> = createORPCClient(link)
export const orpcUtils = createORPCReactQueryUtils(orpc)
