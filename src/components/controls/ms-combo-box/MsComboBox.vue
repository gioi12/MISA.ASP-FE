<template>
  <div class="combo-box__content" ref="comboRef">
    <div class="selected__option">
      <input
        class="combo__input"
        type="text"
        v-model="searchText"
        @input="onInput"
        @focus="onFocus"
        :placeholder="placeholder"
        :readonly="isRead"
      />
    </div>
    <div class="combo-actions">
      <div class="expand-more__icon" @click="toggleDropdown"></div>
      <div v-if="isOpen" class="combo__dropdown" :class="dropdownPosition">
        <!-- Header chỉ hiển thị khi mode combo -->
        <div v-if="props.mode === 'combo'" class="combo__header">
          <span class="combo__code">
            {{ props.headerTitles.code }}
          </span>
          <span class="combo__name">
            {{ props.headerTitles.name }}
          </span>
        </div>

        <!-- Danh sách -->
        <div
          v-for="item in filteredOptions"
          :key="item.value"
          class="combo__item"
          @click="selectItem(item)"
        >
          <template v-if="props.mode === 'combo'">
            <div class="combo__row">
              <span class="combo__code">{{ item.code }}</span>
              <span class="combo__name">{{ item.label }}</span>
            </div>
          </template>

          <template v-else>
            {{ item.label }}
          </template>
        </div>

        <div v-if="filteredOptions.length === 0" class="combo__empty">Không có dữ liệu</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// định nghĩa props
// gioidm
const props = defineProps({
  isRead: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: -1,
  },
  mode: {
    type: String,
    default: 'select', // 'select' | 'combo'
  },
  headerTitles: {
    type: Object,
    default: () => ({
      code: 'Mã',
      name: 'Tên',
    }),
  },
  displayBy: {
    type: String,
    default: 'label',
  },
})
const model = defineModel()

// định nghĩa state
// gioidm
const isOpen = ref(false)
const comboRef = ref(null)
const searchText = ref('')
const dropdownPosition = ref('bottom')

/**
 * Hàm tính height dropdown trên hay dưới
 */
function calcDropdownPosition() {
  if (!comboRef.value) return
  const rect = comboRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const dropdownHeight = 200 // max-height của dropdown

  dropdownPosition.value = spaceBelow < dropdownHeight ? 'top' : 'bottom'
}
//đóng mở  dropdown
//gioi dm
function toggleDropdown() {
  calcDropdownPosition()
  isOpen.value = !isOpen.value
}

// mở dropdown khi nhập vào input
function onInput() {
  calcDropdownPosition()
  isOpen.value = true
  if (!searchText.value) {
    model.value = null
  }
}

// Thêm vào @focus input
function onFocus() {
  calcDropdownPosition()
  isOpen.value = true
}
/**
 * Xử lí khi filterd options
 */
const filteredOptions = computed(() => {
  if (!searchText.value || props.isRead) return props.options

  const search = searchText.value.toLowerCase()

  return props.options.filter((opt) => {
    // mode là combo và code thì tìm theo cả code và name
    if (props.mode === 'combo' || props.displayBy === 'code') {
      return opt.code?.toLowerCase().includes(search) || opt.label?.toLowerCase().includes(search)
    }
    return opt.label?.toLowerCase().includes(search)
  })
})

/**
 * Chọn item
 */
function selectItem(item) {
  searchText.value = props.displayBy === 'code' ? item.code : item.label
  model.value = item.value
  isOpen.value = false
}

/**
 * Khi modelValue thay đổi từ ngoài
 */
watch(
  model,
  (val) => {
    const found = props.options.find((o) => o.value === val)
    if (found) {
      searchText.value = props.displayBy === 'code' ? found.code : found.label
    } else {
      searchText.value = ''
    }
  },
  { immediate: true },
)
/**
 * Khi selectedIndex thay đổi từ ngoài
 */
watch(
  () => props.options,
  (options) => {
    if (model.value != null) return
    const index = props.selectedIndex
    if (index >= 0 && index < options.length) {
      const item = options[index]
      searchText.value = props.displayBy === 'code' ? item.code : item.label
      model.value = item.value
    }
  },
  { immediate: true },
)
/**
 * Click ngoài để đóng dropdown
 */
const handleClickOutside = (e) => {
  if (!comboRef.value?.contains(e.target)) {
    isOpen.value = false
  }
}
/**
 * Đăng ký sự kiện click ngoài
 */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<style scoped>
.combo-box__content {
  position: relative;
  display: flex;
  height: var(--combobox-multi-item-height);
  min-height: var(--combobox-multi-item-height);
  border: 1px solid #babec5;
  border-radius: 2px;
  background-color: #fff;
}
.selected__option {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  width: calc(100% - 32px);
  align-items: center;
  padding: 0 0 0 10px;
}
.combo__input {
  border: none;
  font-size: 13px;
  padding-right: unset;
  text-overflow: ellipsis;
  background-color: transparent;
  display: flex;
  flex-grow: 1;
  width: 100%;
}
.combo__input:focus {
  outline: none;
}
.combo-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.combo__dropdown {
  position: absolute;
  right: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}
.combo__dropdown.bottom {
  top: calc(100% + 2px);
}

.combo__dropdown.top {
  bottom: calc(100% + 2px);
}
.combo__item {
  padding: 6px 8px;
  cursor: pointer;
}

.combo__item:hover {
  background: #f0f0f0;
}

.combo__empty {
  padding: 6px 8px;
  color: #999;
}

.combo__row {
  display: flex;
  justify-content: space-between;
}

.combo__code {
  width: 80px;
  font-weight: 600;
}

.combo__name {
  flex: 1;
}

.combo__header {
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  font-weight: 600;
  background-color: #f4f5f8;
  border-bottom: 1px solid #ddd;
}
</style>
