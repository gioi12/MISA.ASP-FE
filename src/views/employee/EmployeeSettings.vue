<!-- EmployeeSettings.vue -->
<template>
  <ms-form
    :open="props.open"
    title="Tùy chỉnh giao diện"
    @close="handleClose"
    @store="handleStore"
    :settings-mode="true"
  >
    <template #form-content-body__slot>
      <div class="customizer-body">
        <!-- Bảng drag-drop -->
        <ms-table :columns="tableColumns" :data="localStates">
          <!-- Header: checkbox chọn tất cả + label -->
          <template #visible-header>
            <div class="visible-header">
              <ms-checkbox
                :model-value="isAllVisible"
                :indeterminate="isIndeterminate"
                @update:modelValue="toggleAll"
              />
            </div>
          </template>

          <!-- Cell: drag handle + số thứ tự + checkbox -->
          <template #visible="{ row, rowIndex }">
            <div
              class="drag-row"
              draggable="true"
              @dragstart="onDragStart(rowIndex)"
              @dragover.prevent="onDragOver(rowIndex)"
              @drop="onDrop(rowIndex)"
              @dragend="onDragEnd"
            >
              <span class="drag-icon">⠿</span>
              <ms-checkbox v-model="row.visible" />
            </div>
          </template>

          <!-- Tên cột -->
          <template #title-header>
            <span>Tên cột</span>
          </template>
          <template #title="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </ms-table>
      </div>
    </template>

    <template #form-footer-right__slot>
      <ms-button class="ms-button--ghost" @click="resetDefault"> Lấy mẫu ngầm định </ms-button>
      <ms-button
        class="ms-button ms-button--primary ms-button-size-default ms-button-radius-false ms-button-dialog text-white"
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

const props = defineProps({
  open: { type: Boolean, default: false },
  columnStates: { type: Array, required: true },
})

const emit = defineEmits(['close', 'store'])

const tableColumns = [
  { key: 'visible', title: '', width: 60, minWidth: 50, type: 'custom' },
  { key: 'title', title: 'Tên cột dữ liệu', width: 200, minWidth: 120, type: 'custom' },
]

const localStates = ref([])

watch(
  () => props.open,
  (val) => {
    if (val) localStates.value = props.columnStates.map((c) => ({ ...c }))
  },
  { immediate: true },
)

// ---- Checkbox header ----
const isAllVisible = computed(() => localStates.value.every((c) => c.visible))
const isIndeterminate = computed(
  () => localStates.value.some((c) => c.visible) && !isAllVisible.value,
)

function toggleAll(val) {
  localStates.value.forEach((c) => (c.visible = val))
}

// ---- Drag & Drop ----
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
  localStates.value = props.columnStates.map((c, i) => ({ ...c, visible: true, order: i }))
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
}

.visible-header {
  display: flex;
  align-items: center;
  gap: 8px;
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

.order-num {
  font-size: 12px;
  color: #555;
  min-width: 16px;
}
</style>
