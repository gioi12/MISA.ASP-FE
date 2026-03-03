<template>
  <div class="ms-form-control">
    <!-- Label -->
    <div v-if="label" class="ms-form-label">
      <span>{{ label }}</span>
      <span v-if="required" class="ms-form-required">*</span>
    </div>

    <!-- Control -->
    <div class="ms-form-control-wrap">
      <slot />
    </div>

    <!-- Error -->
    <div v-if="error" class="ms-form-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  required: Boolean,
  error: String,
})
</script>

<style scoped>
.ms-form-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ms-form-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  white-space: nowrap;
}

.ms-form-required {
  color: red;
  margin-left: 4px;
}

.ms-form-error {
  font-size: 12px;
  color: red;
}
</style>
