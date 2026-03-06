<template>
  <table>
    <colgroup>
      <col v-for="col in internalColumns" :key="col.key" :style="{ width: col.width + 'px' }" />
    </colgroup>

    <thead>
      <tr>
        <th
          v-for="(col, index) in internalColumns"
          :key="col.key"
          :style="{ ...(stickyHeader ? stickyHeaderStyle : {}), ...getStickyStyle(col, true) }"
        >
          <div class="th-content" :style="getAlignStyle(col)">
            <template v-if="col.type === 'custom'">
              <slot :name="col.key + '-header'" :field="col">
                {{ col.title }}
              </slot>
            </template>
            <template v-else>
              {{ col.title }}
            </template>
            <div class="resize-handle" @mousedown="startResize($event, index)" />
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-if="loading">
        <tr v-for="i in skeletonRows" :key="'skeleton-' + i">
          <td v-for="col in internalColumns" :key="col.key">
            <a-skeleton-input :active="true" size="small" style="width: 80%; height: 16px" />
          </td>
        </tr>
      </template>
      <template v-else>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="{ 'row-selected': selectedRow === rowIndex }"
          @click="selectedRow = rowIndex"
        >
          <td
            v-for="col in internalColumns"
            :key="col.key"
            :style="{ ...getStickyStyle(col, false), ...getAlignStyle(col) }"
          >
            <template v-if="col.type === 'custom'">
              <slot
                :name="col.key"
                :row="row"
                :field="col"
                :value="row[col.key]"
                :rowIndex="rowIndex"
              />
            </template>
            <template v-else>
              {{ formatCell(col, row) }}
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { SkeletonInput as ASkeletonInput } from 'ant-design-vue'
const props = defineProps({
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  skeletonRows: { type: Number, default: 10 },
  stickyHeader: { type: Boolean, default: true },
})
// define model select row
const selectedRow = defineModel('selectedRow', { default: -1 })
// -------------------------------------------------------
// Căn lề theo type
// -------------------------------------------------------
function getAlignStyle(col) {
  const type = getColType(col)
  switch (type) {
    case 'number':
      return { textAlign: 'right', justifyContent: 'flex-end' }
    case 'date':
      return { textAlign: 'center', justifyContent: 'center' }
    case 'datetime':
      return { textAlign: 'center', justifyContent: 'center' }
    case 'checkbox':
      return { textAlign: 'center', justifyContent: 'center' }
    default:
      return { textAlign: 'left', justifyContent: 'flex-start' }
  }
}

// -------------------------------------------------------
// Xác định type của cột
// col.dataType có thể khai báo tường minh: 'number' | 'date' | 'checkbox' | 'text'
// Nếu không khai báo thì tự detect từ giá trị đầu tiên trong data
// -------------------------------------------------------
function getColType(col) {
  if (col.dataType) return col.dataType

  // Tự detect từ giá trị đầu tiên
  const firstRow = props.data?.[0]
  if (!firstRow) return 'text'

  const value = col.render ? col.render(firstRow[col.key], firstRow) : firstRow[col.key]

  if (typeof value === 'boolean') return 'checkbox'
  if (typeof value === 'number') return 'number'
  if (value instanceof Date) return 'date'
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return 'date'

  return 'text'
}

// -------------------------------------------------------
// Format giá trị cell
// -------------------------------------------------------
function formatCell(col, row) {
  const value = col.render ? col.render(row[col.key], row) : row[col.key]
  const type = getColType(col)

  if (value === null || value === undefined) return ''

  switch (type) {
    case 'number':
      return formatNumber(value, col.decimal)
    case 'date':
      return formatDate(value)
    case 'datetime':
      return formatDatetime(value)
    default:
      return value
  }
}

// 999.999,99
function formatNumber(value, decimal) {
  const num = Number(value)

  // Nếu col có khai báo decimal tường minh → dùng luôn
  if (decimal !== undefined) {
    return num.toLocaleString('de-DE', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    })
  }

  // Tự detect: nếu có phần thập phân thực sự (1.5, 1.00 từ server) thì giữ 2 số
  // Nếu là số nguyên (10000, 5) thì không hiện dấu phẩy
  const isFloat = !Number.isInteger(num)

  return num.toLocaleString('de-DE', {
    minimumFractionDigits: isFloat ? 2 : 0,
    maximumFractionDigits: isFloat ? 2 : 0,
  })
}

// dd/MM/yyyy
function formatDate(value) {
  const d = new Date(value)
  if (isNaN(d)) return value
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}
function formatDatetime(value) {
  const d = new Date(value)
  if (isNaN(d) || d.getFullYear() <= 1) return ''
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`
}
// -------------------------------------------------------
// Sticky
// -------------------------------------------------------
function getStickyStyle(col, isHeader) {
  if (!col.sticky) return {}

  // Tính offset = tổng width các cột cùng phía sticky đứng trước nó
  let offset = 0

  if (col.sticky === 'left') {
    for (const c of internalColumns) {
      if (c.key === col.key) break
      if (c.sticky === 'left') offset += c.width
    }
  } else if (col.sticky === 'right') {
    // Duyệt ngược
    for (let i = internalColumns.length - 1; i >= 0; i--) {
      const c = internalColumns[i]
      if (c.key === col.key) break
      if (c.sticky === 'right') offset += c.width
    }
  }

  return {
    position: 'sticky',
    [col.sticky]: `calc(${offset}px - 1px)`,
    zIndex: isHeader ? 20 : 2,
    borderLeft: 'none',
  }
}
const stickyHeaderStyle = {
  position: 'sticky',
  top: '-1px',
  zIndex: 10,
}
// -------------------------------------------------------
// Resize
// -------------------------------------------------------
const internalColumns = reactive(
  props.columns.map((col) => ({
    ...col,
    width: col.width || 150,
    minWidth: col.minWidth || 80,
  })),
)

let startX = 0,
  startWidth = 0,
  resizingIndex = null
const sensitivity = 0.5

const startResize = (event, index) => {
  resizingIndex = index
  startX = event.clientX
  startWidth = internalColumns[index].width
  document.addEventListener('mousemove', onResizing)
  document.addEventListener('mouseup', stopResize)
}

const onResizing = (event) => {
  if (resizingIndex === null) return
  const newWidth = startWidth + (event.clientX - startX) * sensitivity
  internalColumns[resizingIndex].width = Math.max(newWidth, internalColumns[resizingIndex].minWidth)
}

const stopResize = () => {
  resizingIndex = null
  document.removeEventListener('mousemove', onResizing)
  document.removeEventListener('mouseup', stopResize)
}

// watch để sync khi columns prop thay đổi
watch(
  () => props.columns,
  (newCols) => {
    internalColumns.splice(
      0,
      internalColumns.length,
      ...newCols.map((col) => ({
        ...col,
        width: col.width || 150,
        minWidth: col.minWidth || 80,
      })),
    )
  },
  { deep: false },
)
</script>

<style scoped>
/*
  table-layout: fixed cực kỳ quan trọng.
  Nếu không có nó, width sẽ bị nội dung ảnh hưởng.
*/
table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th {
  border: 1px solid #ddd;
  /* bỏ border top đi k lộ cạnh viền */
  border-top: none;
  text-align: left;
  overflow: normal;
  overflow-wrap: break-word;
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: var(--grid-header-height);
  height: var(--grid-header-height);
  background-color: #eef1f5;
  vertical-align: middle;
}
td {
  border: 1px solid #ddd;
  border-top: none;

  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: var(--grid-body-line-height);
  padding: 0 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  background-color: #fff;
}

/*
  Header content phải position relative
  để đặt resize handle
*/
.th-content {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 0px 8px 8px;
}

/*
  Thanh resize
*/
.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  user-select: none;
}
/*
  hover
*/
tr:hover td {
  background: #f2f9ff !important;
}

tr.row-selected td {
  background: #e5f3ff !important;
}
</style>
