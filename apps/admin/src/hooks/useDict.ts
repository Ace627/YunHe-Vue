import { ref, onMounted, toRefs } from 'vue'
import type { DictDataEntity, DictSelectItem } from '@/types'
import { DictRequest } from '@/api/system/dict.request'

// 全局字典缓存
const dictCache: Record<string, DictSelectItem[]> = {}

// 请求锁：防止重复请求
const requestLock: Record<string, boolean> = {}

// 格式化字典项：保留原有字段，新增 label/value
function formatDictItem(item: DictDataEntity): DictSelectItem {
  return { ...item, label: item.dictLabel, value: item.dictValue }
}

// 多字典加载钩子
export function useDict<T extends string[]>(...dictTypes: T) {
  const dictData = ref<Record<string, DictSelectItem[]>>({})

  // 初始化空数组
  for (const typeName of dictTypes) dictData.value[typeName] = []

  // 加载数据
  const loadDictData = async () => {
    for (const typeName of dictTypes) {
      // 有缓存直接使用
      if (dictCache[typeName]) {
        dictData.value[typeName] = dictCache[typeName]
        continue
      }
      // 已加锁直接跳过
      if (requestLock[typeName]) continue

      try {
        requestLock[typeName] = true
        const rawList = await DictRequest.findDataByType({ dictType: typeName })
        const formattedList = rawList.map(formatDictItem)

        dictCache[typeName] = formattedList
        dictData.value[typeName] = formattedList
      } finally {
        delete requestLock[typeName]
      }
    }
  }

  onMounted(loadDictData)

  return toRefs(dictData.value) as { [K in T[number]]: Ref<DictSelectItem[]> }
}
