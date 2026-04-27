import { isString } from 'lodash-es'

export * from './cache/token.cache'
export * from './cache/tags-view.cache'
export * from './cache/system-setting.cache'
export * from './cache/component-size.cache'
export * from './cache/sidebar-status.cache'

export * from './tree.util'
export * from './time.util'
export * from './common.util'
export * from './tip-modal.util'

export * from './validate'

/**
 * 基础 sleep 方法（延迟执行）
 * @param {number} delay 延迟毫秒数
 * @returns Promise<void> 可通过 await 等待
 */
export function sleep(delay: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), delay))
}

/** 一个利用 a 标签下载文件的函数 */
export function linkDownload(fileURL: string | Blob | File, fileName?: string): void {
  let href: string = isString(fileURL) ? fileURL : URL.createObjectURL(fileURL)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = href
  a.download = fileName || Date.now().toString()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  if (typeof fileURL !== 'string') URL.revokeObjectURL(href)
}
