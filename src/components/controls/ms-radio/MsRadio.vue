<template>
  <label class="ms-radio-wrapper">
    <!-- input thật (ẩn đi) -->
    <input
      type="radio"
      class="ms-radio--input"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- UI custom -->
    <span
      class="ms-radio-border"
      :class="{
        'ms-radio-border-checked': modelValue === value,
        'ms-radio-border-disabled': disabled,
      }"
    >
      <span
        class="ms-radio-circle"
        :class="{
          'ms-radio-circle-checked': modelValue === value,
        }"
      ></span>
    </span>

    <!-- label -->
    <span class="ms-radio--label">
      <slot />
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number, Boolean],
  value: [String, Number, Boolean],
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}
</script>

<style scoped>
.ms-radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
}

/* Ẩn radio gốc */
.ms-radio--input {
  position: absolute;
  opacity: 0;
}

/* Vòng ngoài */
.ms-radio-border {
  width: 20px;
  height: 20px;
  border: 2px solid #bbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

/* Khi checked */
.ms-radio-border-checked {
  border-color: var(--primary--color);
}

/* Disabled */
.ms-radio-border-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Chấm bên trong */
.ms-radio-circle {
  width: 10px;
  height: 10px;
  background: var(--primary--color);
  border-radius: 50%;
  transform: scale(0);
  transition: 0.2s;
}

.ms-radio-circle-checked {
  transform: scale(1);
}
</style>
