import { isString } from 'lodash-es'
import { TipModal } from './tip-modal.util'

/**
 * 复制文本到剪贴板工具函数
 * @param content 需要复制的文本内容
 */
export async function copyText(content: string) {
  try {
    if (!content) {
      return TipModal.msgError('复制内容不能为空')
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(content)
    } else {
      const textarea = document.createElement('textarea')
      textarea.style.cssText = `position: fixed;opacity: 0;z-index: -1;`
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    TipModal.msgSuccess('复制成功')
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : '未知错误'
    TipModal.msgError(`复制失败：${errMsg}`)
  }
}

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
