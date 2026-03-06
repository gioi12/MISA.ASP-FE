<template>
  <ms-form
    :open="props.open"
    title="Tùy chỉnh giao diện"
    @close="handleClose"
    @store="handleStore"
    :settings-mode="true"
  >
    <template #form-content-body__slot>
      <div class="toolbar">
        <ms-input
          placeholder="Nhập từ khóa tìm kiếm"
          icon="search__icon"
          iconColor="#cccccc"
          v-model="searchText"
          style="width: 200px; margin-left: 10px"
        />
        <span class="toggle-link" @click="toggleExtraColumns">
          Sửa tên cột và hiển thị độ rộng
        </span>
      </div>
      <div class="customizer-body">
        <ms-table :columns="visibleTableColumns" :data="filteredStates">
          <!-- Header checkbox — căn center giống td -->
          <template #visible-header>
            <span class="drag-icon--hidden">⠿</span>
            <ms-checkbox
              :model-value="isAllVisible"
              :indeterminate="isIndeterminate"
              @update:modelValue="toggleAll"
            />
          </template>

          <!-- Cell drag + checkbox — căn center giống header -->
          <template #visible="{ row }">
            <div
              class="flex-center"
              draggable="true"
              @dragstart="onDragStart(realIndex(row))"
              @dragover.prevent="onDragOver(realIndex(row))"
              @drop="onDrop"
              @dragend="onDragEnd"
            >
              <span class="drag-icon">⠿</span>
              <ms-checkbox v-model="row.visible" />
            </div>
          </template>

          <template #definition="{ row }">
            <span class="text-readonly">{{ row.definition }}</span>
          </template>

          <template #title="{ row }">
            <input v-model="row.title" class="cell-input" type="text" />
          </template>

          <template #width="{ row }">
            <input
              v-model.number="row.width"
              class="cell-input cell-input--number"
              type="number"
              min="50"
            />
          </template>

          <template #isLock="{ row }">
            <ms-checkbox v-model="row.isLock" />
          </template>
        </ms-table>
      </div>
    </template>

    <template #form-footer-right__slot>
      <ms-button class="ms-button--ghost mr-10" @click="resetDefault">
        Lấy mẫu ngầm định
      </ms-button>
      <ms-button
        class="ms-button ms-button--primary ms-button-size-default ms-button-radius-false text-white"
        @click="handleStore"
      >
        Cất
      </ms-button>
    </template>
  </ms-form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import MsForm from '@/components/controls/ms-form/MsForm.vue'
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import MsCheckbox from '@/components/controls/ms-checkbox/MsCheckbox.vue'
import MsTable from '@/components/controls/ms-table/MsTable.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  columnStates: { type: Array, required: true },
  defaultStates: { type: Array, required: true },
})

const emit = defineEmits(['close', 'store'])

const BASE_COLUMNS = [
  { key: 'visible', title: '', width: 60, minWidth: 50, type: 'custom' },
  { key: 'definition', title: 'Tên cột dữ liệu', width: 200, minWidth: 120, type: 'custom' },
]
const EXTRA_COLUMNS = [
  { key: 'title', title: 'Tên cột trên giao diện', width: 200, minWidth: 120, type: 'custom' },
  { key: 'width', title: 'Độ rộng', width: 100, minWidth: 80, type: 'custom' },
  { key: 'isLock', title: 'Cố định cột', width: 120, minWidth: 80, type: 'custom' },
]

const showExtraColumns = ref(false)
const searchText = ref('')
const localStates = ref([])

const visibleTableColumns = computed(() =>
  showExtraColumns.value ? [...BASE_COLUMNS, ...EXTRA_COLUMNS] : BASE_COLUMNS,
)

const filteredStates = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return localStates.value
  return localStates.value.filter((c) => c.definition?.toLowerCase().includes(q))
})

// Tìm index thực trong localStates khi data đang bị filter
function realIndex(row) {
  return localStates.value.indexOf(row)
}

function toggleExtraColumns() {
  showExtraColumns.value = !showExtraColumns.value
}

watch(
  () => props.open,
  (val) => {
    if (val) {
      localStates.value = props.columnStates.map((c) => ({ ...c }))
      searchText.value = ''
    }
  },
  { immediate: true },
)

// ---- Checkbox header (tính trên toàn bộ, không chỉ filtered) ----
const isAllVisible = computed(() => localStates.value.every((c) => c.visible))
const isIndeterminate = computed(
  () => localStates.value.some((c) => c.visible) && !isAllVisible.value,
)
function toggleAll(val) {
  localStates.value.forEach((c) => (c.visible = val))
}

// ---- Drag & Drop (trên localStates gốc) ----
let dragIndex = null

function onDragStart(index) {
  dragIndex = index
}
function onDragOver(index) {
  if (dragIndex === null || dragIndex === index) return
  const arr = [...localStates.value]
  const [moved] = arr.splice(dragIndex, 1)
  arr.splice(index, 0, moved)
  localStates.value = arr
  dragIndex = index
}
function onDrop() {}
function onDragEnd() {
  dragIndex = null
}

// ---- Actions ----
function resetDefault() {
  localStates.value = props.defaultStates.map((c, i) => ({ ...c, order: i }))
}
function handleClose() {
  emit('close')
}
function handleStore() {
  emit('store', localStates.value)
}
</script>

<style scoped>
.customizer-body {
  padding: 8px 12px;
  overflow: auto;
  max-height: 500px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.toggle-link {
  font-size: 12px;
  color: #1890ff;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.toggle-link:hover {
  text-decoration: underline;
}

.drag-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: grab;
  user-select: none;
}
.drag-icon {
  font-size: 16px;
  color: #aaa;
}
.drag-icon--hidden {
  visibility: hidden;
}
.text-readonly {
  color: #333;
}

.cell-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: inherit;
  padding: 0;
}
.cell-input:focus {
  border-bottom: 1px solid var(--primary--color, #1890ff);
}
.cell-input--number {
  text-align: right;
}
.mr-10 {
  margin-right: 10px;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
/* css th tỏng table */
:deep(th) {
  top: -10px !important ;
}
</style>
