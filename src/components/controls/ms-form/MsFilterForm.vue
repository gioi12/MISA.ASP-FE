<template>
  <div class="flex-column">
    <div>
      <slot></slot>
    </div>

    <div class="divide"></div>

    <div class="flex-between">
      <div>
        <ms-button :class="['ms-button-secondary', 'button']" @click="handleReset">
          Đặt lại
        </ms-button>
      </div>

      <div>
        <ms-button :class="['button']" type="primary" color="white" @click="handleFilter">
          Lọc
        </ms-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'

const emit = defineEmits(['reset', 'filter'])

function handleReset() {
  emit('reset')
}

function handleFilter() {
  emit('filter')
}
</script>
<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.w-2\/5 {
  width: 40%;
}
.w-3\/5 {
  width: 60%;
}
.p-r-6 {
  padding-right: 6px;
}
.ml-10 {
  margin-left: 2.5 rem !important;
}
.w-1\/3 {
  width: 33.33% !important;
}
.w-1\/2 {
  width: 50% !important;
}
.w-1\/6 {
  width: 16.66667% !important;
}
.w-1\/4 {
  width: 25% !important;
}
.w-1 {
  width: 100% !important;
}
.row-input {
  padding-bottom: 12px;
}
.px-6 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
.p-r-12 {
  padding-right: 12px;
}
.divide {
  background: #e0e0e0;
  width: 100%;
  margin: 20px 0;
  height: 1px;
}
</style>
