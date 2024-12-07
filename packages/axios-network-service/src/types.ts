import { AfterResponseHook, BeforeRequestHook } from 'ky'

export type UnauthorizedHandler = {
  refreshToken: string
  refreshTokenUrl: string
  setTokenCallback: (token: string) => void
  setRefreshTokenCallback: (token: string) => void
}

export type CustomHook = {
  key: string,
  hook: BeforeRequestHook | AfterResponseHook
}