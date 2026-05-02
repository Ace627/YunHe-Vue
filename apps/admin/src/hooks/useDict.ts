import { DictRequest } from '@/api/system/dict.request'
import type { DictDataEntity, DictSelectItem } from '@/types'

// 全局字典缓存
const dictCache: Record<string, DictSelectItem[]> = {}
// 进行中的请求，用于复用 Promise
const pendingRequests: Record<string, Promise<DictDataEntity[]> | undefined> = {}

// 格式化字典项：保留原有字段，新增 label/value
function formatDictItem(item: DictDataEntity): DictSelectItem {
  return { ...item, label: item.dictLabel, value: item.dictValue }
}

// 多字典加载钩子
export function useDict<T extends string[]>(...dictTypes: T) {
  const dictData = reactive<Record<string, DictSelectItem[]>>({})

  // 初始化时，直接从缓存赋值，避免空数组覆盖
  for (const dictType of dictTypes) dictData[dictType] = dictCache[dictType] ?? []

  async function getDictData(dictType: string) {
    try {
      // 已有缓存：直接返回
      if (dictCache[dictType]) return
      // 正在请求中：复用已有 Promise
      if (pendingRequests[dictType]) return pendingRequests[dictType]
      // 新请求：创建并存储 Promise
      pendingRequests[dictType] = DictRequest.findDataByType({ dictType })
      const rawList = await pendingRequests[dictType]
      const formattedList = rawList.map(formatDictItem)
      // 同时更新缓存和当前组件的 dictData
      dictData[dictType] = formattedList
      dictCache[dictType] = formattedList
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : '未知错误'
      console.error(`加载字典数据失败：${dictType}`, errorMsg)
      dictData[dictType] = []
    } finally {
      delete pendingRequests[dictType]
    }
  }

  async function getList() {
    await Promise.allSettled(dictTypes.map((type) => getDictData(type)))
  }

  getList()

  return toRefs(dictData) as { [K in T[number]]: Ref<DictSelectItem[]> }
}
