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
              @click="open = true"
            >
              Thêm
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
            <div class="flex-gap-10">
              <ms-button type="add" color="black" icon="expand-more__icon" positionIcon="right">
                <div>Thực hiện hàng loạt</div>
              </ms-button>

              <ms-button type="add" color="black" icon="expand-more__icon" positionIcon="right">
                <div>Lọc</div>
              </ms-button>
            </div>
          </div>
          <div class="layout__toolbars-right">
            <div>
              <ms-input
                placeholder="Tìm theo mã,tên nhân viên"
                icon="search__icon"
                iconColor="black"
                v-model="searchText"
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
                <ms-checkbox></ms-checkbox>
              </template>
              <template #checkbox="{ row }">
                <ms-checkbox @click="console.log(row)"></ms-checkbox>
              </template>
              <!-- khách hàng -->
              <template #isCustomer="{ row }">
                <ms-checkbox v-model="row.isCustomer" :disabled="true"></ms-checkbox>
              </template>
              <!-- nhà cung cấp -->
              <template #isSupplier="{ row }">
                <ms-checkbox v-model="row.isSupplier" :disabled="true"></ms-checkbox>
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
  <EmployeeForm
    :open="open"
    @close="handleCloseForm"
    v-model="employeeModel"
    :masterData="masterData"
  />
</template>
<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'
import MsTable from '@/components/controls/ms-table/MsTable.vue'
import MsPagination from '@/components/controls/ms-pagination/MsPagination.vue'
import employeeAPI from '@/apis/components/employee/employeeAPI'
import EmployeeForm from '@/views/employee/EmployeeForm.vue'
import MsCheckbox from '@/components/controls/ms-checkbox/MsCheckbox.vue'
import { employee } from '@/models/employee'
import { options, columns } from '@/constants/employeeConstants'
import { onMounted, ref, computed, watch } from 'vue'
// định nghĩa state
const rows = ref([])
const size = ref(10)
const page = ref(1)
const total = ref(0)
const searchText = ref('')
const open = ref(false)
// model employee
const employeeModel = ref(employee())
// đặt time cho debounce text
let timer = null
//master data cho form
const masterData = ref({})
/**
 * fetch dữ liệu employee
 */
async function fetchData(search = '') {
  const res = await employeeAPI.filter({ page: page.value, size: size.value, searchText: search })
  rows.value = res.data.data
  total.value = res.data.total
}
/**
 * Gọi dữ liệu master data form
 */
async function fetchMasterData() {
  const res = await employeeAPI.masterDataForm()
  masterData.value = res.data
}
/**
 * Gọi data
 */
onMounted(() => {
  fetchData()
  fetchMasterData()
})
/**
 * theo dõi sự thay đổi của page
 */
watch(page, () => {
  fetchData(searchText.value)
})
/**
 * theo dõi sự thay đổi của size
 */
watch(size, () => {
  page.value = 1
  fetchData(searchText.value)
})
/**
 * bounce cho search text
 */
watch(searchText, (val) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    fetchData(val)
  }, 1000)
})
/**
 * Tính page
 */
const totalPage = computed(() => {
  return Math.ceil(total.value / size.value)
})

function handleCloseForm() {
  open.value = false
}
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
.flex-gap-10 {
  display: flex;
  gap: 10px;
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
