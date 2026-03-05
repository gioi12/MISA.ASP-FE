<template>
  <div class="search__item">
    <input
      :type="inputType"
      :placeholder="props.placeholder"
      class="input__search"
      :class="spin"
      v-model="internalValue"
      :min="props.min"
      :step="props.step"
      @blur="formatNumber"
    />

    <div v-if="props.icon" :class="props.icon" :style="{ backgroundColor: props.iconColor }"></div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconColor: { type: String, default: 'black' },

  //  thêm mới
  type: { type: String, default: 'text' }, // text | number
  min: { type: Number, default: undefined },
  step: { type: Number, default: 1 },
  decimal: { type: Number, default: 0 }, // số chữ số thập phân

  spin: { type: String, default: '' },
})

// v-model ngoài
const model = defineModel()

// dùng internal để xử lý format
const internalValue = ref(model.value)

// xác định input type
const inputType = computed(() => {
  if (props.type === 'number' && props.decimal > 0) {
    return 'text'
  }
  return props.type
})

// đồng bộ khi model ngoài thay đổi
watch(
  () => model.value,
  (val) => {
    if (props.type === 'number' && props.decimal > 0) {
      internalValue.value =
        val !== null && val !== undefined ? Number(val).toFixed(props.decimal) : ''
    } else {
      internalValue.value = val
    }
  },
  { immediate: true },
)

// đồng bộ ngược ra ngoài
watch(internalValue, (val) => {
  if (props.type === 'number') {
    model.value = val === '' ? null : Number(val)
  } else {
    model.value = val
  }
})

// format khi blur
const formatNumber = () => {
  if (props.type !== 'number') return
  if (internalValue.value === '' || internalValue.value == null) return

  let num = Number(internalValue.value)

  if (props.min !== undefined && num < props.min) {
    num = props.min
  }

  if (props.decimal > 0) {
    num = num.toFixed(props.decimal)
  }

  internalValue.value = num
}
</script>

<style scoped>
.search__item {
  display: flex;
  align-items: center;
  padding: 0px 10px;
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
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 0;
  -webkit-appearance: hidden;
}
:deep(.number-spin::-webkit-inner-spin-button),
:deep(.number-spin::-webkit-outer-spin-button) {
  opacity: 1 !important;
  -webkit-appearance: auto !important;
}
</style>
