<template>
  <div class="ms-pagination">
    <div class="layout">
      <div class="layout__left">
        <div class="layout__left-pagination">
          <span class="mr-2">Tổng số:</span>
          <b>{{ props.total }}</b>
          <span class="ml-2">bản ghi</span>
        </div>
      </div>
      <div class="layout__right">
        <div class="layout__select">
          <MsComboBox :options="options" :is-read="true" :selected-index="0" v-model="pageSize" />
        </div>
        <div class="pagination-controls">
          <div
            class="cursor-pointer mr-4 unselect"
            :class="page === 1 && 'disableText'"
            @click="currentPage > 1 && (currentPage = currentPage - 1)"
          >
            Trước
          </div>
          <div class="page__index">
            <div
              class="cursor-pointer pl-2 pr-2"
              @click="currentPage = i"
              :class="currentPage === i && 'pageSelected'"
              v-for="i in props.totalPage"
              :key="i"
            >
              {{ i }}
            </div>
          </div>
          <div
            class="cursor-pointer ml-4 unselect"
            :class="currentPage === props.totalPage && 'disableText'"
            @click="currentPage < props.totalPage && (currentPage = currentPage + 1)"
          >
            Sau
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsComboBox from '../ms-combo-box/MsComboBox.vue'
import { computed } from 'vue'
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
// khai báo emit trả cho cha
const emit = defineEmits(['update:page', 'update:size'])
/**
 * emit page
 */
const currentPage = computed({
  get: () => props.page,
  set: (val) => emit('update:page', val),
})
/**
 * emit size
 */
const pageSize = computed({
  get: () => props.size,
  set: (val) => emit('update:size', val),
})
</script>
<style scoped>
.ms-pagination {
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
  display: flex;
}
.layout {
  padding: var(--grid-footer-padding-y);
  width: 100% !important;
  justify-content: space-between !important;
  align-items: center !important;
  display: flex;
}
.layout__left {
  position: sticky;
  left: 20px;
  white-space: nowrap;
  min-width: 10px;
  display: flex;
}
.layout__left-pagination {
  display: flex;
}
.layout__select {
  margin: 0 16px;
}
.layout__select:focus-within {
  outline: 1px solid var(--primary--color);
}
.layout__right {
  position: sticky;
  right: 60px;
  justify-content: center;
  align-items: center;
  display: flex !important;
}
.pagination-controls {
  display: flex;
  align-items: center;
}
.page__index {
  display: flex;
}
.cursor-pointer {
  cursor: pointer !important;
}
.pl-2 {
  padding-left: 0.5rem !important;
}
.pr-2 {
  padding-right: 0.5rem !important;
}
.pageSelected {
  border: 1px solid #e0e0e0;
  font-weight: 700;
}
.disableText {
  cursor: default !important;
  color: #9e9e9e;
}
.unselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.mr-4 {
  margin-right: 1rem !important;
}
.ml-4 {
  margin-left: 1rem !important;
}
.mr-2 {
  margin-right: 0.5rem !important;
}
.ml-2 {
  margin-left: 0.5rem !important;
}
</style>
