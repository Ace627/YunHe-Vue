import dayjs from 'dayjs'
import stream from 'stream'
import ExcelJS from 'exceljs'
import { Injectable, Type } from '@nestjs/common'
import { ExcelOptionAll } from './excel.interface'
import { BusinessException, DecoratorConstant, ExcelType } from '@/common'
import { DictService } from '@/modules/system/dict/dict.service'

@Injectable()
export class ExcelService {
  constructor(private readonly dictService: DictService) {}

  /* 导入 */
  public async import<TModel extends Type<any>>(model: TModel, file: ExpressMulterFile) {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(file.path)
    const worksheet = workbook.worksheets[0]
    if (!worksheet) throw new BusinessException('文件缺少工作表')
  }

  /* 导出 */
  public async export<Model, TModel extends Type<Model>>(model: TModel, list: Model[]) {
    const passThrough = new stream.PassThrough()
    const exportObjArr = Reflect.getMetadata(DecoratorConstant.EXCEL, model) ?? []
    const { headers, rows } = await this.formatExport(exportObjArr, list)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1', { views: [{ state: 'frozen', ySplit: 1 }] })
    worksheet.columns = headers
    worksheet.addRows(rows)
    for (let i = 1; i <= worksheet.rowCount; i++) {
      const currentRow = worksheet.getRow(i)
      // 设置表头样式（可选）
      if (i === 1) currentRow.font = { bold: true }
      // 每个单元格都水平垂直局中
      currentRow.alignment = { vertical: 'middle', horizontal: 'center' }
    }
    await workbook.xlsx.write(passThrough)
    return passThrough
  }

  /* 导出模板 */
  public async importTemplate<TModel extends Type<any>>(model: TModel) {
    const passThrough = new stream.PassThrough()
    const importObjArr = Reflect.getMetadata(DecoratorConstant.EXCEL, model) ?? []
    const headers = await this.formatImport(importObjArr)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1', { views: [{ state: 'frozen', ySplit: 1 }] })
    for (const header of headers) {
      header['width'] = header.width ?? 15 // 默认列宽（像素）
      header.style = { alignment: { horizontal: 'center', vertical: 'middle' } } // 水平垂直居中每一列
    }
    worksheet.getRow(1).font = { bold: true } // 单独设置表头行加粗（不影响数据行）
    worksheet.columns = headers
    await workbook.xlsx.write(passThrough)
    return passThrough
  }

  /** 整理导入模板 */
  private async formatImport(importObjArr: ExcelOptionAll[]): Promise<Partial<ExcelJS.Column>[]> {
    const filtered = importObjArr.filter((item) => item.type === ExcelType.ALL || item.type === ExcelType.IMPORT)
    const sorted = filtered.sort((obj, obj2) => (obj.order ?? 1) - (obj2.order ?? 1))
    const propertyKeys = sorted.map((item) => item.propertyKey)
    const names = sorted.map((item) => item.name)
    return propertyKeys.map((key, index) => ({ key, header: names[index] }))
  }

  /* 整理导出数据 */
  private async formatExport(exportObjArr: ExcelOptionAll[], list: any[]) {
    const filteredExportObjArr = exportObjArr.filter((item) => item.type === ExcelType.ALL || item.type === ExcelType.EXPORT)
    const sortedExportObjArr = filteredExportObjArr.sort((obj, obj2) => (obj.order ?? 1) - (obj2.order ?? 1))
    const optionPromiseArr = sortedExportObjArr.map(async (item) => {
      if (item.dictType) item.dictDataList = await this.dictService.findDictDataByType(item.dictType)
      return item
    })
    const optionArr: ExcelOptionAll[] = await Promise.all(optionPromiseArr)
    // 构建表头配置
    const headers: Partial<ExcelJS.Column>[] = optionArr.map((item) => {
      const header = { header: item.name, key: item.propertyKey }
      header['width'] = item.width ?? 15 // 默认列宽（像素）
      return header
    })
    const rows: Array<any> = []
    for (let index = 0; index < list.length; index++) {
      const element = list[index]
      const inArr = optionArr.map((option) => {
        let dataItem = element[option.propertyKey]
        if (option.dictType) {
          const dictData = option.dictDataList.find((item) => item.dictValue == dataItem)
          dataItem = dictData ? dictData.dictLabel : ''
        }
        if (option.defaultValue) dataItem = dataItem ?? option.defaultValue
        if (option.dateFormat) dataItem = dayjs(dataItem).format(option.dateFormat)
        return dataItem
      })
      rows.push(inArr) //插入每行数据
    }
    return { headers, rows }
  }
}
