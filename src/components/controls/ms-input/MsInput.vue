<template>
  <div class="search__item">
    <input
      :type="'text'"
      :placeholder="props.placeholder"
      class="input__search"
      :class="[spin, { 'input--number': props.type === 'number' }]"
      v-model="displayValue"
      :min="props.min"
      :step="props.step"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @keypress="onKeypress"
    />

    <div v-if="props.icon" :class="props.icon" :style="{ backgroundColor: props.iconColor }"></div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconColor: { type: String, default: 'black' },
  type: { type: String, default: 'text' },
  min: { type: Number, default: undefined },
  max: { type: Number, default: undefined },
  step: { type: Number, default: 1 },
  decimal: { type: Number, default: 0 },
  spin: { type: String, default: '' },
})

const model = defineModel()

// Giá trị hiển thị (đã format)
const displayValue = ref('')
const isFocused = ref(false)

// Format số theo kiểu VN: phần nghìn dùng dấu chấm, thập phân dùng dấu phẩy
const formatVN = (num, decimalPlaces) => {
  if (num === null || num === undefined || num === '') return ''
  const number = Number(num)
  if (isNaN(number)) return ''

  if (decimalPlaces > 0) {
    // Tách phần nguyên và thập phân
    const fixed = number.toFixed(decimalPlaces)
    const [intPart, decPart] = fixed.split('.')
    const formattedInt = Number(intPart).toLocaleString('de-DE') // dùng de-DE để có dấu chấm nghìn
    return `${formattedInt},${decPart}`
  } else {
    return number.toLocaleString('de-DE')
  }
}

// Parse chuỗi VN về số thực
const parseVN = (str) => {
  if (str === '' || str === null || str === undefined) return null
  // Xóa dấu chấm (phân cách nghìn), đổi dấu phẩy thập phân thành dấu chấm
  const normalized = str.replace(/\./g, '').replace(',', '.')
  const num = Number(normalized)
  return isNaN(num) ? null : num
}

// Khởi tạo và đồng bộ từ model ngoài vào
watch(
  () => model.value,
  (val) => {
    if (props.type !== 'number') {
      displayValue.value = val ?? ''
      return
    }
    if (!isFocused.value) {
      displayValue.value = val !== null && val !== undefined ? formatVN(val, props.decimal) : ''
    }
  },
  { immediate: true },
)

// Xử lý khi nhập liệu (realtime format)
const onInput = (e) => {
  if (props.type !== 'number') {
    model.value = e.target.value
    return
  }

  let raw = e.target.value

  // Cho phép nhập dấu trừ ở đầu
  const isNegative = raw.startsWith('-')

  // Chỉ giữ lại số, dấu phẩy (thập phân), dấu chấm (nghìn)
  // Xóa tất cả ký tự không hợp lệ
  let digits = raw.replace(/[^\d,]/g, '')

  // Chỉ cho phép 1 dấu phẩy
  const commaIndex = digits.indexOf(',')
  if (commaIndex !== -1) {
    digits = digits.slice(0, commaIndex + 1) + digits.slice(commaIndex + 1).replace(/,/g, '')
  }

  // Tách phần nguyên và thập phân
  const parts = digits.split(',')
  let intPart = parts[0].replace(/\./g, '') // xóa dấu chấm cũ
  const decPart = parts[1]

  // Format phần nguyên với dấu chấm nghìn
  if (intPart !== '') {
    intPart = Number(intPart).toLocaleString('de-DE')
  }

  // Ghép lại
  let formatted = isNegative ? '-' : ''
  if (decPart !== undefined) {
    formatted += `${intPart},${decPart}`
  } else {
    formatted += intPart
  }

  // Cập nhật display
  const cursorPos = e.target.selectionStart
  const oldLen = e.target.value.length
  displayValue.value = formatted

  // Giữ vị trí con trỏ sau format
  const newLen = formatted.length
  const nextCursor = cursorPos + (newLen - oldLen)
  setTimeout(() => {
    e.target.setSelectionRange(nextCursor, nextCursor)
  }, 0)

  // Cập nhật model value (số thực)
  const numericValue = parseVN(formatted)
  model.value = numericValue
}

// Khi focus: hiển thị giá trị đang nhập (giữ nguyên)
const onFocus = () => {
  isFocused.value = true
}

// Khi blur: clamp min/max rồi format lại
const onBlur = () => {
  isFocused.value = false

  if (props.type !== 'number') return

  let num = parseVN(displayValue.value)
  if (num === null) {
    displayValue.value = ''
    model.value = null
    return
  }

  if (props.min !== undefined && num < props.min) num = props.min
  if (props.max !== undefined && num > props.max) num = props.max

  model.value = num
  displayValue.value = formatVN(num, props.decimal)
}

// Chặn ký tự không hợp lệ khi nhấn phím
const onKeypress = (e) => {
  if (props.type !== 'number') return

  const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (props.decimal > 0) allowed.push(',')
  if (props.min === undefined || props.min < 0) allowed.push('-')

  if (!allowed.includes(e.key)) {
    e.preventDefault()
  }
}
</script>

<style scoped>
.search__item {
  display: flex;
  align-items: center;
  border: 1px solid #babec5;
  border-radius: 2px;
}
.search__item:hover {
  outline: 1px solid #e2e2e2;
}

.input__search {
  font-size: 13px;
  height: var(--input-height);
  color: inherit;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  border: none;
}

.input__search::placeholder {
  font-style: italic;
}
.input__search:focus {
  border: none;
  outline: none;
}
.search__item:focus-within {
  border: 1px solid var(--primary--color);
}

.input--number {
  text-align: right;
}
</style>
