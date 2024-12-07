import ky, { AfterResponseHook, BeforeRequestHook, KyInstance } from 'ky'
import { CustomHook, UnauthorizedHandler } from './types'
import { KyHeadersInit } from 'ky/distribution/types/options'
import { HttpStatus } from './HttpStatus'
import { unauthorizedInterceptor } from './interceptors/unauthorized'

interface NetworkServiceConfig {
  baseURL: string
  timeout: number
  defaultHeaders: KyHeadersInit
  defaultUnauthorizedHandler?: UnauthorizedHandler
}

const defaultBeforeRequestHook: Map<string, BeforeRequestHook> = new Map<string, BeforeRequestHook>()
const defaultAfterRequestHook: Map<string, AfterResponseHook> = new Map<string, AfterResponseHook>()

class NetworkService {
  private readonly kyInstance: KyInstance
  private readonly beforeRequestHooks: Map<string, BeforeRequestHook> = defaultBeforeRequestHook
  private readonly afterResponseHooks: Map<string, AfterResponseHook> = defaultAfterRequestHook

  constructor(config: NetworkServiceConfig) {
    const unauthorizedHook: AfterResponseHook = async (_request, _options, response) => {
      if (response.status === HttpStatus.UNAUTHORIZED && config.defaultUnauthorizedHandler) {
        return unauthorizedInterceptor(config.defaultUnauthorizedHandler, response)
      }
      return response
    }
    this.afterResponseHooks.set('unauthorized', unauthorizedHook)

    this.kyInstance = ky.create({
      prefixUrl: config.baseURL,
      timeout: config.timeout,
      headers: config.defaultHeaders,
      hooks: {
        beforeRequest: Array.from(this.beforeRequestHooks.values()),
        afterResponse: Array.from(this.afterResponseHooks.values()),
      },
    })
  }

  get = async <T>(url: string): Promise<T> => {
    return this.kyInstance.get(url).json<T>()
  }

  post = async <T>(url: string, data?: unknown): Promise<T> => {
    return this.kyInstance.post(url, { json: data }).json<T>()
  }

  put = async <T>(url: string, data?: unknown): Promise<T> => {
    return this.kyInstance.put(url, { json: data }).json<T>()
  }

  delete = async <T>(url: string): Promise<T> => {
    return this.kyInstance.delete(url).json<T>()
  }

  addCustomBeforeRequestHooks = (customHooks: CustomHook | CustomHook[]) => {
    this.addHooks(this.beforeRequestHooks, customHooks)
  }

  addCustomAfterResponseHooks = (customHooks: CustomHook | CustomHook[]) => {
    this.addHooks(this.afterResponseHooks, customHooks)
  }

  removeCustomBeforeRequestHooks = (customHooks: CustomHook | CustomHook[]) => {
    this.removeHooks(this.beforeRequestHooks, customHooks)
  }

  removeCustomAfterResponseHooks = (customHooks: CustomHook | CustomHook[]) => {
    this.removeHooks(this.afterResponseHooks, customHooks)
  }

  private readonly addHooks = <T extends BeforeRequestHook | AfterResponseHook>(hookMap: Map<string, T>, customHooks: CustomHook | CustomHook[]) => {
    const hooksArray = Array.isArray(customHooks) ? customHooks : [customHooks]
    hooksArray.forEach((item) => hookMap.set(item.key, item.hook as T))
    this.extendKyInstanceHooks()
  }

  private readonly removeHooks = <T extends BeforeRequestHook | AfterResponseHook>(
    hookMap: Map<string, T>,
    customHooks: CustomHook | CustomHook[],
  ) => {
    const hooksArray = Array.isArray(customHooks) ? customHooks : [customHooks]
    hooksArray.forEach((item) => hookMap.delete(item.key))
    this.extendKyInstanceHooks()
  }

  private readonly extendKyInstanceHooks = () => {
    this.kyInstance.extend({
      hooks: {
        beforeRequest: Array.from(this.beforeRequestHooks.values()),
        afterResponse: Array.from(this.afterResponseHooks.values()),
      },
    })
  }
}

export default NetworkService
