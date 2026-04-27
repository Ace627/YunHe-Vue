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
