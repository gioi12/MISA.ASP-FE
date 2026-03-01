<template>
  <div class="layout">
    <div class="layout__header">
      <div class="layout__header-label">
        <div class="layout__header-text">Nhân viên</div>
        <div class="layout__header-button">
          <div class="layout__button">
            <ms-button
              type="primary"
              color="white"
              :class="['ms-radius-true', 'ms-dropdown-style-default']"
            >
              <div>Thêm</div>
            </ms-button>
            <div class="line"></div>
            <ms-button
              type="primary"
              color="white"
              iconColor="white"
              icon="expand-more__icon"
              positionIcon="left"
              :class="[
                'ms-con-dropdown-radius-false-true',
                'ms-padding-is-single-false-size-default',
              ]"
            >
            </ms-button>
          </div>
        </div>
      </div>
      <div class="layout__header-back">
        <div class="arrow-left__icon"></div>
        <a class="back__text">Tất cả danh mục</a>
      </div>
    </div>
    <div class="layout__body">
      <div class="layout__body-toolbars">
        <div class="layout__toolbars">
          <div class="layout__toolbars-left">
            <div class="arrow-check__icon"></div>
            <div>
              <ms-button type="add" color="black" icon="expand-more__icon" positionIcon="right">
                <div>Thực hiện hàng loạt</div>
              </ms-button>
            </div>
          </div>
          <div class="layout__toolbars-right">
            <div>
              <ms-input
                placeholder="Tìm theo mã,tên nhân viên"
                icon="search__icon"
                iconColor="black"
              />
            </div>
            <div>
              <div class="toolbars__right">
                <div class="reload__icon"></div>
                <div class="excel__icon"></div>
                <div class="settings__icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout__body-content">
        <div class="layout__control">
          <div class="layout__control-scroller">
            <ms-table :columns="columns" :data="rows">
              <!-- check box -->
              <template #checkbox-header>
                <input type="checkbox" />
              </template>
              <template #checkbox="{ row }">
                <input type="checkbox" @click="console.log(row)" />
              </template>
              <!-- khách hàng -->
              <template #isCustomer="{ row }">
                <input type="checkbox" :checked="row.isCustomer" />
              </template>
              <!-- nhà cung cấp -->
              <template #isSupplier="{ row }">
                <input type="checkbox" :checked="row.isSupplier" />
              </template>
              <!-- action -->
              <template #action-header>
                <div>Chức năng</div>
              </template>
              <template #action="{ row }">
                <div class="cursor-pointer" @click="console.log(row)">Sửa</div>
              </template>
            </ms-table>
          </div>
          <ms-pagination
            :total="total"
            :totalPage="totalPage"
            :options="options"
            v-model:size="size"
            v-model:page="page"
          ></ms-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'
import MsTable from '@/components/controls/ms-table/MsTable.vue'
import MsPagination from '@/components/controls/ms-pagination/MsPagination.vue'
import employeeAPI from '@/apis/components/employee/employeeAPI'
import { options, columns } from '@/constants/employeeConstants'
import { onMounted, ref, computed, watch } from 'vue'
// định nghĩa state
const rows = ref([])
const size = ref(10)
const page = ref(1)
const total = ref(0)
/**
 * fetch dữ liệu employee
 */
async function fetchData() {
  const res = await employeeAPI.paging({ page: page.value, size: size.value })
  rows.value = res.data.data
  total.value = res.data.total
}
/**
 * Gọi data
 */
onMounted(() => {
  fetchData()
})
/**
 * theo dõi sự thay đổi của page va size
 */
watch([page, size], () => {
  fetchData()
})
/**
 * Tính page
 */
const totalPage = computed(() => {
  return Math.ceil(total.value / size.value)
})
</script>
<style scoped>
.layout {
  height: 100%;
}
/* css cho header */
.layout__header {
  display: flex;
  flex-direction: column;
  padding: var(--title-list-padding-top) 30px calc(var(--title-list-padding-bottom) - 20px) 0px;
  transition: top 0.25s;
}
.layout__header-label {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.layout__header-text {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}
.layout__header-back {
  display: flex;
  justify-content: flex-start;
}
.back__text {
  color: #0075c0;
  cursor: pointer;
}
/* kết thúc css cho header */

/* css cho body */
.layout__body {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: calc(100% - 69px);
}
.layout__body-toolbars {
  background: #fff;
  padding: 12px 0 12px 16px;
  position: relative;
}
.layout__toolbars {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout__toolbars-left {
  display: flex;
  align-items: center;
}
.layout__toolbars-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.toolbars__right {
  display: flex;
  gap: 10px;
  padding-right: 10px;
}
.layout__body-content {
  background: #fff;
  flex: 1;
  padding: 0 16px;
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.layout__control {
  overflow: auto;
  width: 100%;
  min-width: 0;
  flex: 1;
  min-height: 0;
}

.sticky {
  position: sticky !important;
}
/* kết thúc css cho body */

/* css cho component  */
.layout__button {
  display: flex;
  align-items: center;
}

.line {
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}
/* kết thúc css cho component */
</style>
