import type { Config } from '~/config'

export const devConfig: Config = {
  api: {
    url: 'http://api',
  },
  auth: {
    url: 'http://localhost:8083/auth/',
    realm: 'demo-realm',
    clientId: 'react-web-app',
  },
  router: {
    // basename: '/admin',
  },
}
