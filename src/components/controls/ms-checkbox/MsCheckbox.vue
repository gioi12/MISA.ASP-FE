<template>
  <label class="ms-component con-ms-checkbox center" :class="{ 'is-disabled': disabled }">
    <!-- Input thật -->
    <input
      type="checkbox"
      class="ms-checkbox--input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- UI custom -->
    <span
      class="ms-checkbox"
      :class="{
        'ms-checkbox-checked': modelValue,
        'ms-checkbox-disabled': disabled,
      }"
    >
      <span class="ms-checkbox--check" :class="{ 'is-checked': modelValue }"> ✓ </span>
    </span>

    <!-- Label -->
    <span class="ms-checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (e) => {
  if (!props.disabled) {
    emit('update:modelValue', e.target.checked)
  }
}
</script>

<style scoped>
.ms-component {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* Ẩn checkbox gốc */
.ms-checkbox--input {
  display: none;
}

/* Khung checkbox */
.ms-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #bbb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

/* Khi checked */
.ms-checkbox-checked {
  background-color: white;
  border-color: var(--primary--color);
}

/* Check icon */
.ms-checkbox--check {
  color: var(--primary--color);
  font-size: 12px;
  transform: scale(0);
  transition: 0.2s;
}

.ms-checkbox--check.is-checked {
  transform: scale(1);
}

/* Disabled */
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
