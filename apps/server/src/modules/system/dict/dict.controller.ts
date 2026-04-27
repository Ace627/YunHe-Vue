import { DictService } from './dict.service'
import { OperLog, BusinessType, PaginationPipe, RequirePermissions } from '@/common'
import { Controller, Get, Post, Put, Delete, Body, ParseArrayPipe, Query } from '@nestjs/common'
import { CreateDictDataDto, CreateDictTypeDto, QueryDictDataDto, QueryDictTypeDto, UpdateDictDataDto, UpdateDictTypeDto } from './dict.dto'

@Controller('system/dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Dict Type                                 */
  /* -------------------------------------------------------------------------- */

  /** 新建字典类型 */
  @Post('type/create')
  @RequirePermissions(['system:dict:create'])
  @OperLog({ title: '字典管理', businessType: BusinessType.INSERT })
  createType(@Body() createDto: CreateDictTypeDto) {
    return this.dictService.createDictType(createDto)
  }

  /** 根据传入 id 组删除单个或者多个字典类型 */
  @Delete('type/delete')
  @RequirePermissions(['system:dict:delete'])
  @OperLog({ title: '字典管理', businessType: BusinessType.DELETE })
  public deleteType(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.dictService.deleteDictType(ids)
  }

  /** 编辑字典类型 */
  @Put('type/update')
  @RequirePermissions(['system:dict:update'])
  @OperLog({ title: '字典管理', businessType: BusinessType.UPDATE })
  updateType(@Body() updateDto: UpdateDictTypeDto) {
    return this.dictService.updateDictType(updateDto)
  }

  /** 查询字典类型分页列表 */
  @Get('type/list')
  @RequirePermissions(['system:dict:query'])
  public findTypeList(@Query(PaginationPipe) queryParams: QueryDictTypeDto) {
    return this.dictService.findDictTypeList(queryParams)
  }

  /** 根据字典类型 ID 查找详情 */
  @Get('type/detail')
  @RequirePermissions(['system:dict:query'])
  public findTypeDetail(@Query('id') id: string) {
    return this.dictService.findDictTypeDetail(id)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Dict Data                                 */
  /* -------------------------------------------------------------------------- */

  /** 新建字典数据 */
  @Post('data/create')
  @RequirePermissions(['system:dict:create'])
  @OperLog({ title: '字典管理', businessType: BusinessType.INSERT })
  createData(@Body() createDto: CreateDictDataDto) {
    return this.dictService.createDictData(createDto)
  }

  /** 根据传入 id 组删除单个或者多个字典数据 */
  @Delete('data/delete')
  @RequirePermissions(['system:dict:delete'])
  @OperLog({ title: '字典管理', businessType: BusinessType.DELETE })
  public deleteData(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.dictService.deleteDictData(ids)
  }

  /** 编辑字典数据 */
  @Put('data/update')
  @RequirePermissions(['system:dict:update'])
  @OperLog({ title: '字典管理', businessType: BusinessType.UPDATE })
  updateData(@Body() updateDto: UpdateDictDataDto) {
    return this.dictService.updateDictData(updateDto)
  }

  /** 查询字典数据分页列表 */
  @Get('data/list')
  @RequirePermissions(['system:dict:query'])
  public findDataList(@Query(PaginationPipe) queryParams: QueryDictDataDto) {
    return this.dictService.findDictDataList(queryParams)
  }

  /** 根据字典数据 ID 查找详情 */
  @Get('data/detail')
  @RequirePermissions(['system:dict:query'])
  public findDataDetail(@Query('id') id: string) {
    return this.dictService.findDictDataDetail(id)
  }

  /** 根据字典类型编码获取字典下拉数据 */
  @Get('data/list/type')
  @RequirePermissions(['system:dict:query'])
  public findDataByType(@Query('dictType') dictType: string) {
    return this.dictService.findDictDataByType(dictType)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Other                                   */
  /* -------------------------------------------------------------------------- */

  /** 清空字典类型的缓存 */
  @Delete('clearCahche')
  public clearDictTypeCache() {
    return this.dictService.clearDictCache()
  }
}
