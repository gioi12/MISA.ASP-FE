import * as XLSX from 'xlsx-js-style'

function formatNumber(value, decimal) {
  const num = Number(value)
  if (decimal !== undefined) {
    return num.toLocaleString('de-DE', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    })
  }
  const isFloat = !Number.isInteger(num)
  return num.toLocaleString('de-DE', {
    minimumFractionDigits: isFloat ? 2 : 0,
    maximumFractionDigits: isFloat ? 2 : 0,
  })
}

function formatDate(value) {
  const d = new Date(value)
  if (isNaN(d)) return value
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

function formatDatetime(value) {
  const d = new Date(value)
  if (isNaN(d) || d.getFullYear() <= 1) return ''
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${formatDate(value)} ${hh}:${mi}:${ss}`
}

function getCellValue(col, row) {
  const raw = col.render ? col.render(row[col.key], row) : row[col.key]
  if (raw === null || raw === undefined) return ''
  if (col.dataType === 'number' || typeof raw === 'number') return formatNumber(raw, col.decimal)
  if (col.dataType === 'datetime') return formatDatetime(raw)
  if (col.dataType === 'date' || (typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}/.test(raw)))
    return formatDate(raw)
  if (typeof raw === 'boolean') return raw ? '✓' : ''
  return raw
}

const borderAll = {
  top: { style: 'thin', color: { rgb: 'AAAAAA' } },
  bottom: { style: 'thin', color: { rgb: 'AAAAAA' } },
  left: { style: 'thin', color: { rgb: 'AAAAAA' } },
  right: { style: 'thin', color: { rgb: 'AAAAAA' } },
}

export function exportExcel(
  data,
  columns,
  fileName = 'export.xlsx',
  title = 'DANH SÁCH NHÂN VIÊN',
) {
  const exportColumns = columns.filter((col) => !['checkbox', 'action'].includes(col.key))

  // +1 cho cột STT
  const colCount = exportColumns.length + 1

  const wb = XLSX.utils.book_new()
  const ws = {}

  // ── STYLES ──────────────────────────────────────────────
  const styleTitle = {
    font: { bold: true, sz: 16, name: 'Arial' },
    alignment: { horizontal: 'center', vertical: 'center' },
  }

  const styleHeader = {
    font: { bold: true, sz: 11, name: 'Arial' },
    fill: { fgColor: { rgb: 'D8D8D8' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: borderAll,
  }

  const styleCell = {
    font: { sz: 10, name: 'Arial' },
    alignment: { vertical: 'center' },
    border: borderAll,
  }

  const styleCellNumber = {
    ...styleCell,
    alignment: { horizontal: 'right', vertical: 'center' },
  }

  const styleCellCenter = {
    ...styleCell,
    alignment: { horizontal: 'center', vertical: 'center' },
  }

  // ── ROW 1: TIÊU ĐỀ ──────────────────────────────────────
  ws['A1'] = { v: title, s: styleTitle }
  ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } }]

  // ── ROW 2: TRỐNG ────────────────────────────────────────

  // ── ROW 3: HEADER ───────────────────────────────────────
  // Cột STT
  ws[XLSX.utils.encode_cell({ r: 2, c: 0 })] = { v: 'STT', s: styleHeader }

  exportColumns.forEach((col, ci) => {
    ws[XLSX.utils.encode_cell({ r: 2, c: ci + 1 })] = { v: col.title, s: styleHeader }
  })

  // ── ROW 4+: DỮ LIỆU ─────────────────────────────────────
  data.forEach((row, ri) => {
    // STT
    ws[XLSX.utils.encode_cell({ r: 3 + ri, c: 0 })] = { v: ri + 1, s: styleCellCenter }

    exportColumns.forEach((col, ci) => {
      const value = getCellValue(col, row)
      const raw = col.render ? col.render(row[col.key], row) : row[col.key]
      const isNumber = col.dataType === 'number' || typeof raw === 'number'
      ws[XLSX.utils.encode_cell({ r: 3 + ri, c: ci + 1 })] = {
        v: value,
        s: isNumber ? styleCellNumber : styleCell,
      }
    })
  })

  // ── Column widths ────────────────────────────────────────
  ws['!cols'] = [
    { wch: 6 }, // STT
    ...exportColumns.map((col) => ({ wch: Math.max(15, Math.floor((col.width || 150) / 7)) })),
  ]

  // ── Row heights ──────────────────────────────────────────
  ws['!rows'] = [
    { hpt: 30 }, // Row 1: tiêu đề
    { hpt: 15 }, // Row 2: trống
    { hpt: 22 }, // Row 3: header
  ]

  // ── ref range ────────────────────────────────────────────
  ws['!ref'] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: 3 + data.length - 1, c: colCount - 1 },
  })

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, fileName)
}
