<template>
  <a-config-provider :locale="viVN">
    <a-date-picker
      v-model:value="model"
      format="DD/MM/YYYY"
      placeholder="DD/MM/YYYY"
      class="ms-datepicker"
      popupClassName="ms-datepicker-dropdown"
    />
  </a-config-provider>
</template>

<script setup>
import viVN from 'ant-design-vue/es/locale/vi_VN'
import dayjs from 'dayjs'
const model = defineModel({
  get(value) {
    return value ? dayjs(value) : null
  },
  set(value) {
    return value ? value.format('YYYY-MM-DD') : null
  },
})
</script>

<style scoped>
.ant-picker-focused {
  border-color: var(--primary--color) !important;
}

.ant-picker:hover {
  outline: 1px solid #e2e2e2 !important;
  border: 1px solid #babec5;
}
.ant-picker {
  padding: 1px 11px 1px !important;
  border-radius: 0px !important;
  font-size: 13px !important;
}
.ant-picker-today-btn {
  color: var(--primary--color) !important;
}
.ant-picker-today-btn:hover {
  color: var(--primary--color) !important;
}
</style>
