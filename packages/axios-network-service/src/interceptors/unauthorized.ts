import ky, { KyResponse } from 'ky'
import { UnauthorizedHandler } from '../types'

export const unauthorizedInterceptor = async (config: UnauthorizedHandler, response: KyResponse) => {
  const { access_token, refresh_token } = await ky
    .post(config.refreshTokenUrl, {
      headers: {
        'Refresh-token': `Bearer ${config.refreshToken}`,
      },
    })
    .json()

  config.setTokenCallback(access_token)
  config.setRefreshTokenCallback(refresh_token)

  const retryResponse = await ky(response.url, {
    method: response.type,
    headers: {
      ...response.headers,
      Authorization: `Bearer ${access_token}`,
    },
  })

  return retryResponse
}
