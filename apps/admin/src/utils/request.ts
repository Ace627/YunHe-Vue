import axios from 'axios'
import { getAccessToken, sleep } from '.'
import { TipModal } from './tip-modal.util'
import { CommonConstant } from '@/common'

const NProgress = useProgress({ show: import.meta.env.VITE_REQUEST_NPROGRESS !== 'false' })

const instance = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: import.meta.env.VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '0') * 1000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    NProgress.start()
    const accessToken = getAccessToken()
    if (accessToken) config.headers[CommonConstant.AUTHORIZATION] = `${CommonConstant.TOKEN_PREFIX} ${accessToken}`
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  async (response) => {
    NProgress.done()
    // console.log('response: ', response)
    const responseType = response.config.responseType || ''

    let code = response.data.code || 200
    let message = response.data.message

    console.log('code: ', code, message)
    console.log('responseType: ', responseType)

    // 处理二进制返回出现的 JSON 字符串情况
    if (response.data instanceof Blob && response.data.type.includes('application/json')) {
      const info = await new Response(response.data).json()
      code = info.code
      message = info.message
    }

    if (code === 401) {
      await useUserStore().logout()
      TipModal.msgError(`会话已过期，即将重新登录`)
      await sleep(1000)
      location.href = '/'
      return Promise.reject(new Error(message))
    }

    // 处理异常响应
    if (code !== 200) {
      TipModal.msgError(message)
      return Promise.reject(new Error(message))
    }

    // 处理二进制响应
    if (['arraybuffer', 'blob'].includes(responseType)) {
      return response
    }

    // 处理流式响应
    if (responseType === 'stream') {
      return response.data
    }

    // 处理普通响应
    if (code === 200) {
      return response.data.data
    }

    return response
  },
  (error) => {
    NProgress.done()
    console.log(error)
    let { message } = error

    if (error?.response?.data?.message) message = error.response.data.message

    TipModal.msgError(message)

    return Promise.reject(error)
  },
)

export const request = instance
