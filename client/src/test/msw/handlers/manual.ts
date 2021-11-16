import { graphql, rest } from 'msw'

import { Config } from '~/config'
import {
  GetStatusQuery,
  GetStatusQueryVariables,
  GetUserInfoQuery,
  GetUserInfoQueryVariables,
  LoginMutation,
  LoginMutationVariables,
  namedOperations,
  Status,
} from '~/generated/graphql'

const initConfigHandler = (devConfig: Config) =>
  rest.get('/config', (req, res, ctx) => {
    return res(ctx.json<Config>(devConfig))
  })

const initApiHandlers = (devConfig: Config) => {
  const handleApi = graphql.link(devConfig.api.url)
  const handlers = [
    handleApi.query<GetStatusQuery, GetStatusQueryVariables>(
      namedOperations.Query.GetStatus,
      (req, res, ctx) => {
        return res(ctx.data({ status: Status.Ready }))
      },
    ),

    // Handles a "Login" mutation
    handleApi.mutation<LoginMutation, LoginMutationVariables>(
      namedOperations.Mutation.Login,
      (req, res, ctx) => {
        const { username } = req.variables
        const id = 'abc'
        sessionStorage.setItem('is-authenticated', JSON.stringify({ username, id }))
        return res(ctx.data({ login: { id } }))
      },
    ),
    // Handles a "GetUserInfo" query
    handleApi.query<GetUserInfoQuery, GetUserInfoQueryVariables>(
      namedOperations.Query.GetUserInfo,
      (req, res, ctx) => {
        // When authenticated, respond with a query payload
        return res(ctx.data({ user: { id: 'abc', username: 'foobar' } }))
      },
    ),
  ]

  return {
    handleApi,
    handlers,
  }
}

export const initManualHandlers = (devConfig: Config) => {
  const configHandler = initConfigHandler(devConfig)
  const { handleApi, handlers } = initApiHandlers(devConfig)

  return {
    handleApi,
    handlers: [configHandler, ...handlers],
  }
}
