import * as XLSX from 'xlsx'

/**
 * Xuất Excel từ data và columns
 * @param {Array} data - danh sách bản ghi
 * @param {Array} columns - cấu hình cột (từ employeeConstants)
 * @param {String} fileName - tên file xuất
 */
export function exportExcel(data, columns, fileName = 'export.xlsx') {
  // Bỏ checkbox và action
  const exportColumns = columns.filter((col) => !['checkbox', 'action'].includes(col.key))

  const exportData = data.map((row) => {
    const obj = {}
    exportColumns.forEach((col) => {
      obj[col.title] = col.render ? col.render(row[col.key], row) : (row[col.key] ?? '')
    })
    return obj
  })

  const ws = XLSX.utils.json_to_sheet(exportData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, fileName)
}
