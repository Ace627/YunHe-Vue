import { request } from '@/utils/request'
import type { DictDataEntity, DictDataQueryParams, DictTypeEntity, DictTypeQueryParams } from '@/types'

export abstract class DictRequest {
  /* -------------------------------------------------------------------------- */
  /*                                  Dict Type                                 */
  /* -------------------------------------------------------------------------- */

  /** 新建字典类型 */
  static createType(data: DictTypeEntity): Promise<string> {
    return request.post('/system/dict/type/create', data)
  }

  /** 根据传入 id 组删除单个或者多个字典类型 */
  static deleteType(params: { ids: string }): Promise<string> {
    return request.delete('/system/dict/type/delete', { params })
  }

  /** 编辑字典类型 */
  static updateType(data: DictTypeEntity): Promise<string> {
    return request.put('/system/dict/type/update', data)
  }

  /** 查询字典类型分页列表 */
  static findTypeList(params: DictTypeQueryParams): PaginationResponse<DictTypeEntity> {
    return request.get('/system/dict/type/list', { params })
  }

  /** 根据字典类型 ID 查找详情 */
  static findTypeDetail(params: { id: string }): Promise<DictTypeEntity> {
    return request.get('/system/dict/type/detail', { params })
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Dict Data                                 */
  /* -------------------------------------------------------------------------- */

  /** 新建字典数据 */
  static createData(data: DictDataEntity): Promise<string> {
    return request.post('/system/dict/data/create', data)
  }

  /** 根据传入 id 组删除单个或者多个字典数据 */
  static deleteData(params: { ids: string }): Promise<string> {
    return request.delete('/system/dict/data/delete', { params })
  }

  /** 编辑字典数据 */
  static updateData(data: DictDataEntity): Promise<string> {
    return request.put('/system/dict/data/update', data)
  }

  /** 查询字典数据分页列表 */
  static findDataList(params: DictDataQueryParams): PaginationResponse<DictDataEntity> {
    return request.get('/system/dict/data/list', { params })
  }

  /** 根据字典数据 ID 查找详情 */
  static findDataDetail(params: { id: string }): Promise<DictDataEntity> {
    return request.get('/system/dict/data/detail', { params })
  }

  /** 根据字典类型编码获取字典下拉数据 */
  static findDataByType(params: { dictType: string }): Promise<DictDataEntity[]> {
    return request.get('/system/dict/data/list/type', { params })
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Other                                   */
  /* -------------------------------------------------------------------------- */

  /** 刷新字典缓存 */
  static clearCache(): Promise<string> {
    return request.delete('/system/dict/clearCahche')
  }
}
