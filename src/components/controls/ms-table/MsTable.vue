<template>
  <table>
    <!-- 
        colgroup giúp kiểm soát width chuẩn nhất.
        Khi resize, chỉ cần đổi width ở đây
        header và body sẽ tự sync theo.
      -->
    <colgroup>
      <col v-for="col in internalColumns" :key="col.key" :style="{ width: col.width + 'px' }" />
    </colgroup>

    <thead>
      <tr>
        <th v-for="(col, index) in internalColumns" :key="col.key">
          <div class="th-content">
            {{ col.title }}

            <!-- Thanh kéo resize -->
            <div class="resize-handle" @mousedown="startResize($event, index)" />
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="col in internalColumns" :key="col.key">
          {{ row[col.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive } from 'vue'

/*
  Props:
  - columns: cấu hình cột
  - data: dữ liệu table
*/
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})

/*
  internalColumns:
  Clone từ props.columns để có thể chỉnh width
*/
const internalColumns = reactive(
  props.columns.map((col) => ({
    ...col,
    width: col.width || 150,
    minWidth: col.minWidth || 80,
  })),
)

/*
  Biến dùng khi resize
*/
let startX = 0 // vị trí chuột ban đầu
let startWidth = 0 // width ban đầu của cột
let resizingIndex = null // đang resize cột nào
let sensitivity = 0.5 // độ nhậy
/*
  Khi bắt đầu resize (mousedown)
*/
const startResize = (event, index) => {
  resizingIndex = index
  startX = event.clientX
  startWidth = internalColumns[index].width

  // lắng nghe mousemove trên document
  document.addEventListener('mousemove', onResizing)
  document.addEventListener('mouseup', stopResize)
}

/*
  Khi đang kéo chuột
*/
const onResizing = (event) => {
  if (resizingIndex === null) return

  const diff = (event.clientX - startX) * sensitivity

  const newWidth = startWidth + diff

  // không cho nhỏ hơn minWidth
  internalColumns[resizingIndex].width = Math.max(newWidth, internalColumns[resizingIndex].minWidth)
}

/*
  Khi thả chuột
*/
const stopResize = () => {
  resizingIndex = null
  document.removeEventListener('mousemove', onResizing)
  document.removeEventListener('mouseup', stopResize)
}
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
  text-align: left;
  overflow: normal;
  overflow-wrap: break-word;
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: var(--grid-header-height);
  height: var(--grid-header-height);
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: #eef1f5;
  vertical-align: middle;
}
td {
  border: 1px solid #ddd;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: var(--grid-body-line-height);
  padding: 0 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
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
</style>
