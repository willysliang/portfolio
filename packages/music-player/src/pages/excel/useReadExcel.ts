/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-16 15:36:23
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-17 10:04:30
 * @ Description: 解析 Excel 文件的工具类
 */

import * as XLSX from 'xlsx'

/**
 * @description 读取表头信息
 */
export const useReadExcelHead = (sheet: XLSX.WorkSheet) => {
  const headers: any = []
  let range
  if (sheet['!ref']) {
    range = XLSX.utils.decode_range(sheet['!ref'])
  }
  const rowNum = range.s.r
  for (let colNum = range.s.c; colNum <= range.e.c; ++colNum) {
    const nextCell = sheet[XLSX.utils.encode_cell({ c: colNum, r: rowNum })]
    let cellText = `void${colNum}`
    if (nextCell && nextCell.t) cellText = XLSX.utils.format_cell(nextCell)
    headers.push(cellText)
  }
  return headers
}

/** *
 * @description 读取excel原数据
 *
 */
export const useReadRawData = (rawFile: any) =>
  new Promise<{ header: string[]; excelData: any[] }>((resolve) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e?.target?.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]

      const excelData = XLSX.utils.sheet_to_json(worksheet)
      const header = useReadExcelHead(worksheet)
      resolve({ header, excelData })
    }
    reader.readAsArrayBuffer(rawFile)
  })
