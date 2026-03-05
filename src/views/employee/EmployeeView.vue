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
      <div class="flex-gap-10">
        <div class="layout__header-back">
          <div class="arrow-left__icon"></div>
          <a class="back__text">Tất cả danh mục</a>
        </div>
        <div class="flex-gap-10">
          <div v-if="filter.departmentId && isFilter" class="filter-tag">
            <span>
              {{
                masterData?.departments?.data.find((x) => x.departmentId === filter.departmentId)
                  ?.departmentName
              }}
            </span>
            <button class="filter-tag__close" @click="removeFilter('departmentId')">✕</button>
          </div>

          <div v-if="filter.status != null && isFilter" class="filter-tag">
            <span>{{ filter.status === 0 ? 'Sử dụng' : 'Ngừng sử dụng' }}</span>
            <button class="filter-tag__close" @click="removeFilter('status')">✕</button>
          </div>

          <div v-if="filter.gender != null && isFilter" class="filter-tag">
            <span>{{ filter.gender ? 'Nam' : 'Nữ' }}</span>
            <button class="filter-tag__close" @click="removeFilter('gender')">✕</button>
          </div>

          <div v-if="filter.position && isFilter" class="filter-tag">
            <span>{{ filter.position }}</span>
            <button class="filter-tag__close" @click="removeFilter('position')">✕</button>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__body">
      <div class="layout__body-toolbars">
        <div class="layout__toolbars">
          <div class="layout__toolbars-left">
            <div class="arrow-check__icon mr-10"></div>
            <div class="flex-gap-10">
              <ms-button-dropdown>
                <template #button>
                  <ms-button
                    type="add"
                    :color="selectedIds.length === 0 ? '#afafaf' : 'black'"
                    icon="expand-more__icon"
                    :icon-color="selectedIds.length === 0 ? '#afafaf' : 'black'"
                    positionIcon="right"
                  >
                    <div>Thực hiện hàng loạt</div>
                  </ms-button>
                </template>
                <template #default="{ close }">
                  <div>
                    <div
                      class="menu__item"
                      @click="
                        () => {
                          handleDeleteMany()
                          close()
                        }
                      "
                    >
                      Xóa hàng loạt
                    </div>
                    <div
                      class="menu__item"
                      @click="
                        () => {
                          handleUpdateStatusMany(0)
                          close()
                        }
                      "
                    >
                      Sử dụng hàng loạt
                    </div>
                    <div
                      class="menu__item"
                      @click="
                        () => {
                          handleUpdateStatusMany(1)
                          close()
                        }
                      "
                    >
                      Ngừng sử dụng hàng loạt
                    </div>
                  </div>
                </template>
              </ms-button-dropdown>

              <ms-button-dropdown>
                <template #button>
                  <ms-button type="add" color="black" icon="expand-more__icon" positionIcon="right">
                    <div>Lọc</div>
                  </ms-button>
                </template>
                <div>
                  <ms-filter-form @reset="handleResetFilter" @filter="handleApplyFilter">
                    <div class="flex">
                      <div class="w-1/2 p-r-6">
                        <ms-editer label="Đơn vị" :required="true">
                          <ms-combo-box
                            :options="mapOption(masterData?.departments?.data || [], 'department')"
                            mode="combo"
                            :header-titles="{ code: 'Mã đơn vị', name: 'Tên đơn vị' }"
                            v-model="filterDraft.departmentId"
                          />
                        </ms-editer>

                        <ms-editer label="Giới tính">
                          <ms-combo-box
                            :options="[
                              { label: 'Nam', value: true },
                              { label: 'Nữ', value: false },
                            ]"
                            v-model="filterDraft.gender"
                          />
                        </ms-editer>
                      </div>
                      <div class="w-1/2">
                        <ms-editer label="Chức danh">
                          <ms-input v-model="filterDraft.position" />
                        </ms-editer>
                        <ms-editer label="Trạng thái">
                          <ms-combo-box
                            v-model="filterDraft.status"
                            :options="[
                              { label: 'Sử dụng', value: 0 },
                              { label: 'Ngừng sử dụng', value: 1 },
                            ]"
                          />
                        </ms-editer>
                      </div>
                    </div>
                  </ms-filter-form>
                </div>
              </ms-button-dropdown>
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
                <div class="reload__icon pointer" @click="fetchData(searchText)"></div>
                <div class="excel__icon pointer" @click="handleExportExcel"></div>
                <div class="settings__icon pointer" @click="handleOpenSettings"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout__body-content">
        <div class="layout__control">
          <div class="layout__control-scroller">
            <ms-table :columns="visibleColumns" :data="rows" :loading="isLoading">
              <!-- check box -->
              <template #checkbox-header>
                <ms-checkbox
                  :model-value="isAllSelected"
                  :indeterminate="isIndeterminate"
                  @update:modelValue="toggleAll"
                />
              </template>
              <template #checkbox="{ row }">
                <ms-checkbox
                  :model-value="selectedIds.includes(row.employeeId)"
                  @update:modelValue="toggleRow(row)"
                />
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
                <div>
                  <ms-button
                    :class="['ms-button-no-border']"
                    color="#0075c0"
                    @click="handleFixData(row)"
                  >
                    Sửa
                  </ms-button>
                  <ms-button-dropdown>
                    <template #button>
                      <ms-button
                        :class="['ms-button-no-border']"
                        :icon-color="'#0075c0'"
                        :icon="'expand-more__icon'"
                        positionIcon="right"
                      >
                      </ms-button>
                    </template>

                    <template #default="{ close }">
                      <div>
                        <div class="menu__item" @click="(handleDuplicateData(row), close())">
                          Nhân bản
                        </div>

                        <div class="menu__item" @click="(handleDelete(row), close())">Xóa</div>

                        <div class="menu__item" @click="(handleChangeStatus(row), close())">
                          {{ row.status === 'ACTIVE' ? 'Ngừng sử dụng' : 'Sử dụng' }}
                        </div>
                      </div>
                    </template>
                  </ms-button-dropdown>
                </div>
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
    @store="handleStore"
    @store-and-add="handleStoreAndAdd"
  />
  <EmployeeSettings
    :open="openSettings"
    @close="handleCloseSettings"
    @store="onStoreCustomizer"
    :column-states="columnStates"
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
import MsButtonDropdown from '@/components/controls/ms-button/MsButtonDropdown.vue'
import MsFilterForm from '@/components/controls/ms-form/MsFilterForm.vue'
import MsEditer from '@/components/controls/ms-editer/MsEditer.vue'
import MsComboBox from '@/components/controls/ms-combo-box/MsComboBox.vue'

import { dialog } from '@/utils/useDialog'
import { useToast } from '@/utils/useToast'
import { exportExcel } from '@/utils/exportExcel'
import { mapOption } from '@/utils/mappingHelper'
import { employee } from '@/models/employee'
import { options, columns } from '@/constants/employeeConstants'
import { onMounted, ref, computed, watch, toRaw } from 'vue'

// settings column
import { useColumnCustomizer } from '@/utils/useColumnCustomizer'
import EmployeeSettings from './EmployeeSettings.vue'
// khởi tạo toast
const { error, success } = useToast()
// Khởi tạo composable
const { columnStates, visibleColumns, applyAndSave } = useColumnCustomizer(columns)

function onStoreCustomizer(newStates) {
  applyAndSave(newStates)
  openSettings.value = false
}
// định nghĩa state
const rows = ref([])
const size = ref(10)
const page = ref(1)
const total = ref(0)
// loading data
const isLoading = ref(false)
const searchText = ref('')
const isFilter = ref(false)
const open = ref(false)
//open settings
const openSettings = ref(false)

// model employee
const employeeModel = ref(employee())

// đặt time cho debounce text
let timer = null
//master data cho form
const masterData = ref({})

const selectedIds = ref([])

const filter = ref({
  departmentId: null,
  gender: null,
  position: '',
  status: null,
})
// filter nháp để không bị cập nhật real time
const filterDraft = ref({ ...filter.value })
/**
 * fetch dữ liệu employee
 */
async function fetchData(search = '') {
  isLoading.value = true
  try {
    const res = await employeeAPI.filter({
      page: page.value,
      size: size.value,
      searchText: search,
      ...filter.value,
    })
    rows.value = res.data.data
    total.value = res.data.total
  } finally {
    isLoading.value = false
  }
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
  fetchData(searchText.value)
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
/**
 * func sửa
 * @param employee
 */
function handleFixData(employee) {
  open.value = true
  employeeModel.value = structuredClone(toRaw(employee))
}
/**
 * Nhân bản
 */
function handleDuplicateData(employee) {
  if (!employee) return

  const cloned = structuredClone(toRaw(employee))
  cloned.employeeCode = ''
  cloned.employeeId = null
  employeeModel.value = cloned

  open.value = true
}
async function handleDelete(employee) {
  if (!employee) return

  const ok = await dialog.warning({
    message: `Bạn có thực sự muốn xóa nhân viên  <${employee.employeeCode}> không?`,
  })
  if (!ok) return

  employeeAPI.deleteMany([employee.employeeId])
  rows.value = rows.value.filter((r) => r.employeeId !== employee.employeeId)
  success(`Xóa nhân viên <${employee.employeeCode}> thành công`)
}

function handleChangeStatus(employee) {
  if (!employee) return
  employeeAPI.updateStatus({
    ids: [employee.employeeId],
    status: employee.status === 'ACTIVE' ? 1 : 0,
  })

  employee.status = employee.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

  success(
    `Cập nhật trạng thái <${employee.status === 'ACTIVE' ? 'Sử dụng' : 'Ngừng sử dụng'}>  cho nhân viên <${employee.employeeCode}>`,
  )
}
/**
 * hàm xử lý chọn 1
 * @param row
 */
function toggleRow(row) {
  const id = row.employeeId

  const index = selectedIds.value.indexOf(id)

  if (index === -1) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value.splice(index, 1)
  }
}
/**
 * Kiểm tra đã chọn hết tất cả các dòng trong table chưa
 */
const isAllSelected = computed(() => {
  return rows.value.length > 0 && selectedIds.value.length === rows.value.length
})

/**
 * Kiểm tra trạng thái chọn một phần (indeterminate)
 */
const isIndeterminate = computed(() => {
  return selectedIds.value.length > 0 && selectedIds.value.length < rows.value.length
})

/**
 * Xử lý khi click checkbox header (chọn tất cả / bỏ chọn tất cả)
 */
function toggleAll(val) {
  if (val) {
    selectedIds.value = rows.value.map((r) => r.employeeId)
  } else {
    selectedIds.value = []
  }
}

function handleCloseForm() {
  employeeModel.value = employee()
  open.value = false
}
async function handleStore() {
  try {
    const isUpdate = !!employeeModel.value.employeeId

    if (isUpdate) {
      const res = await employeeAPI.updateEmployeeForm(employeeModel.value)
      // cập nhật lại row trong bảng
      const index = rows.value.findIndex((r) => r.employeeId === res.data.employeeId)
      if (index !== -1) rows.value[index] = res.data
      success(`Cập nhật nhân viên <${res.data.employeeCode}> thành công`)
    } else {
      const res = await employeeAPI.addEmployeeForm(employeeModel.value)
      rows.value.unshift(res.data)
      if (rows.value.length > size.value) rows.value.pop()
      success(`Thêm mới nhân viên <${res.data.employeeCode}> thành công`)
    }

    employeeModel.value = employee()
    open.value = false
  } catch {
    error(`Lưu nhân viên <${employeeModel.value.employeeCode}> thất bại`)
  }
}
async function handleStoreAndAdd() {
  try {
    if (employeeModel.value.employeeId) {
      // Update
      const res = await employeeAPI.updateEmployeeForm(employeeModel.value)
      const index = rows.value.findIndex((r) => r.employeeId === res.data.employeeId)
      if (index !== -1) rows.value[index] = res.data
      success(`Cập nhật nhân viên <${res.data.employeeCode}> thành công`)
    } else {
      // Insert
      const res = await employeeAPI.addEmployeeForm(employeeModel.value)
      rows.value.unshift(res.data)
      if (rows.value.length > size.value) rows.value.pop()
      success(`Thêm mới nhân viên <${res.data.employeeCode}> thành công`)
    }

    // Reset về thêm mới, không đóng form
    employeeModel.value = employee()
  } catch {
    error(`Lưu nhân viên <${employeeModel.value.employeeCode}> thất bại`)
  }
}
async function handleDeleteMany() {
  if (!selectedIds.value.length) return

  const ok = await dialog.warning({
    message: `Bạn có chắc muốn xóa <${selectedIds.value.length} nhân viên> không?`,
  })
  if (!ok) return
  try {
    await employeeAPI.deleteMany(selectedIds.value)
  } catch {
    error(`Xóa <${selectedIds.value.length} nhân viên> thất bại`)
  }
  success(`Xóa <${selectedIds.value.length} nhân viên> thành công`)

  selectedIds.value = []
  fetchData(searchText.value)
}

/**
 * Cập nhật trạng thái sử dụng / không sử dụng cho nhiều employee
 *
 * @param {String} status -  0 'ACTIVE' |1 'INACTIVE'
 */
async function handleUpdateStatusMany(status) {
  if (!selectedIds.value.length) {
    return
  }
  try {
    await employeeAPI.updateStatus({
      ids: selectedIds.value,
      status: status,
    })
    success(
      `${status === 0 ? 'Sử dụng' : 'Ngừng sử dụng'} cho <${selectedIds.value.length} nhân viên> thành công`,
    )
    selectedIds.value = []

    await fetchData(searchText.value)
  } catch {
    error(
      `${status === 0 ? 'Sử dụng' : 'Ngừng sử dụng'} cho <${selectedIds.value.length} nhân viên> thất bại`,
    )
  }
}
/**
 * áp dụng lọc
 */
function handleApplyFilter(fromDraft = true) {
  // đẩy nháp thành filter
  if (fromDraft) filter.value = { ...filterDraft.value }
  page.value = 1
  isFilter.value = true
  fetchData(searchText.value)
}
/**
 * Hàm reset lọc
 */
function handleResetFilter() {
  //xóa nháp và filter
  const empty = { departmentId: null, gender: null, position: '', status: null }
  filter.value = { ...empty }
  filterDraft.value = { ...empty }
  isFilter.value = false

  page.value = 1
  fetchData(searchText.value)
}
/**
 * remove filter
 * @param key
 */
function removeFilter(key) {
  filter.value[key] = null
  filterDraft.value[key] = null
  handleApplyFilter(false)
}
/**
 * xuất excel
 */
async function handleExportExcel() {
  try {
    const res = await employeeAPI.filter({
      page: 1,
      size: total.value,
      searchText: searchText.value,
      ...filter.value,
    })

    exportExcel(res.data.data, columns, 'danh_sach_nhan_vien.xlsx')
  } catch (error) {
    console.error('Xuất Excel thất bại:', error)
  }
}

function handleOpenSettings() {
  openSettings.value = true
}
function handleCloseSettings() {
  openSettings.value = false
}
</script>
<style scoped>
.mr-10 {
  margin-right: 10px;
}
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
  align-items: center;
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
.menu__item {
  cursor: pointer;
  padding: 5px 10px;
}
.menu__item:hover {
  background-color: #f5f5f5;
  color: var(--primary--color);
}
.flex {
  display: flex;
}
.pointer {
  cursor: pointer;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  border-radius: 20px;
  background-color: #e6f4ff;
  border: 1px solid #91caff;
  color: #0075c0;
  font-size: 13px;
}

.filter-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #0075c0;
  cursor: pointer;
  font-size: 11px;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
}

.filter-tag__close:hover {
  opacity: 1;
}
/* kết thúc css cho component */
</style>
