<template>
  <ms-form
    :open="props.open"
    :title="'Thông tin nhân viên'"
    @close="handleClose"
    @store="handleStore"
    @store-and-add="handleStoreAndAdd"
  >
    <!-- Tiêu đề popup -->
    <template #area-title__slot>
      <div class="layout__title">
        <div>
          <ms-checkbox :class="'px-6'" v-model="localEmployee.isCustomer">Khách hàng</ms-checkbox>
        </div>
        <div>
          <ms-checkbox :class="'px-6'" v-model="localEmployee.isSupplier">Nhà cung cấp</ms-checkbox>
        </div>
      </div>
    </template>
    <!-- Nội dung content popup -->
    <template #form-content-body__slot>
      <div class="layout">
        <!-- thông tin cá nhân -->
        <div class="layout__personal-info">
          <div class="personal-info">
            <div class="flex row-input">
              <div class="w-2/5 p-r-6">
                <ms-editer label="Mã" :required="true" :error="errors.employeeCode">
                  <ms-input v-model="defaultCode" />
                </ms-editer>
              </div>
              <div class="w-3/5">
                <ms-editer label="Tên" :required="true" :error="errors.employeeName">
                  <ms-input v-model="localEmployee.employeeName" />
                </ms-editer>
              </div>
            </div>
            <div class="row-input">
              <ms-editer label="Đơn vị" :required="true" :error="errors.departmentId">
                <ms-combo-box
                  :options="mapOption(masterData?.departments?.data || [], 'department')"
                  mode="combo"
                  :header-titles="{ code: 'Mã đơn vị', name: 'Tên đơn vị' }"
                  v-model="localEmployee.departmentId"
                />
              </ms-editer>
            </div>
            <div class="row-input">
              <ms-editer label="Chức danh">
                <ms-input v-model="localEmployee.position" />
              </ms-editer>
            </div>
            <div class="row-input" v-if="localEmployee.isCustomer || localEmployee.isSupplier">
              <ms-editer label="Nhóm khách hàng,nhà cung cấp">
                <ms-combo-box
                  :options="mapOption(masterData?.partners?.data, 'partner')"
                  mode="combo"
                  :headerTitles="{ code: 'Mã nhóm KH,NCC', name: 'Tên nhóm KH,NCC' }"
                  v-model="localEmployee.partnerId"
                />
              </ms-editer>
            </div>
          </div>
          <div class="personal-info">
            <div>
              <div class="flex row-input">
                <div class="w-1/3 p-r-6">
                  <ms-editer label="Ngày sinh">
                    <ms-datepicker v-model="localEmployee.dob" />
                  </ms-editer>
                </div>
                <div class="w-1/3">
                  <ms-editer label="Giới tính">
                    <div class="flex">
                      <div class="p-r-6">
                        <MsRadio :value="true" v-model="localEmployee.gender"> Nam </MsRadio>
                      </div>
                      <div>
                        <MsRadio :value="false" v-model="localEmployee.gender"> Nữ </MsRadio>
                      </div>
                    </div>
                  </ms-editer>
                </div>
                <div class="w-1/3 ml-10">
                  <ms-editer label="Số hộ chiếu">
                    <ms-input v-model="localEmployee.passport" />
                  </ms-editer>
                </div>
              </div>
              <div class="flex row-input">
                <div class="w-3/5 p-r-6">
                  <ms-editer label="Số CMND/CCCD">
                    <ms-input v-model="localEmployee.identity" />
                  </ms-editer>
                </div>
                <div class="w-2/5">
                  <ms-editer label="Ngày cấp">
                    <ms-datepicker v-model="localEmployee.issueDate" />
                  </ms-editer>
                </div>
              </div>
              <div class="row-input">
                <ms-editer label="Nơi cấp">
                  <ms-input v-model="localEmployee.issuePlace" />
                </ms-editer>
              </div>
              <div class="flex row-input">
                <div class="w-1/3 p-r-6" v-if="localEmployee.isCustomer">
                  <ms-editer label="TK công nợ phải thu">
                    <ms-combo-box
                      :options="
                        mapOption(
                          masterData?.accounts?.data.filter(
                            (acc) => acc.accountType === 'RECEIVABLE',
                          ) || [],
                          'account',
                        )
                      "
                      :header-titles="{ code: 'Mã Tài khoản', name: 'Tên Tài khoản' }"
                      mode="combo"
                      v-model="localEmployee.receivableAccountId"
                    />
                  </ms-editer>
                </div>
                <div class="w-1/3 ml-10">
                  <ms-editer label="TK công nợ phải trả" v-if="localEmployee.isSupplier">
                    <ms-combo-box
                      :options="
                        mapOption(
                          masterData?.accounts?.data.filter(
                            (acc) => acc.accountType === 'PAYABLE',
                          ) || [],
                          'account',
                        )
                      "
                      :header-titles="{ code: 'Mã Tài khoản', name: 'Tên Tài khoản' }"
                      mode="combo"
                      v-model="localEmployee.payableAccountId"
                    />
                  </ms-editer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Thông tin nhân sự -->
        <div class="layout__employee-info">
          <ms-tabs :tabs="tabs">
            <template #salary>
              <div class="personal-info">
                <div class="flex row-input">
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="Lương thỏa thuận">
                      <ms-input type="number" :min="0" v-model="localEmployee.baseSalary" />
                    </ms-editer>
                  </div>
                  <div class="w-1/6 p-r-12">
                    <ms-editer label="Hệ số lương">
                      <ms-input
                        type="number"
                        :min="0"
                        :step="0.01"
                        :decimal="2"
                        v-model="localEmployee.salaryCoefficient"
                      />
                    </ms-editer>
                  </div>
                  <div class="w-1/3 p-r-12">
                    <ms-editer label="Lương đóng bảo hiểm">
                      <ms-input type="number" :min="0" v-model="localEmployee.insuranceSalary" />
                    </ms-editer>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="Mã số thuế">
                      <ms-input v-model="localEmployee.taxCode" />
                    </ms-editer>
                  </div>
                  <div class="w-1/2 p-r-12">
                    <ms-editer label="Loại hợp đồng" :required="true">
                      <ms-combo-box
                        :options="mapOption(masterData?.contracts?.data, 'contract') || []"
                        :selected-index="2"
                        v-model="localEmployee.contractId"
                      />
                    </ms-editer>
                  </div>
                  <div class="w-1/6 p-r-12">
                    <ms-editer label="Số người phụ thuộc">
                      <ms-input
                        :spin="'number-spin'"
                        type="number"
                        :min="0"
                        :step="1"
                        v-model="localEmployee.numberOfDependents"
                      />
                    </ms-editer>
                  </div>
                </div>
              </div>
            </template>

            <template #bank>
              <ms-table :columns="employeeBankcolumns" :data="localEmployee.banks">
                <template #bankCode="{ row }">
                  <ms-input v-model="row.bankCode" />
                </template>
                <template #bankName="{ row }">
                  <ms-input v-model="row.bankName" />
                </template>
                <template #bankAddress="{ row }">
                  <ms-input v-model="row.bankAddress" />
                </template>
                <template #bankBranch="{ row }">
                  <ms-input v-model="row.bankBranch" />
                </template>
                <template #action="{ rowIndex }">
                  <div class="layout__delete" @click="handleRemoveBank(rowIndex)">
                    <div class="delete__icon"></div>
                  </div>
                </template>
              </ms-table>
              <div class="flex p-r-6 gap-10 pt-10">
                <div>
                  <ms-button
                    :class="['ms-button-size-small', 'ms-button-secondary', 'button']"
                    @click="handleAddBank"
                    >Thêm dòng</ms-button
                  >
                </div>
                <div>
                  <ms-button
                    :class="['ms-button-size-small', 'ms-button-secondary', 'button']"
                    @click="handleClearBank"
                    >Xóa hết dòng</ms-button
                  >
                </div>
              </div>
            </template>

            <template #contact>
              <div class="personal-info">
                <div class="flex row-input">
                  <div class="w-1">
                    <ms-editer label="Địa chỉ">
                      <ms-input v-model="localEmployee.address" />
                    </ms-editer>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="ĐT di động">
                      <ms-input v-model="localEmployee.phone" />
                    </ms-editer>
                  </div>
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="ĐT cố định">
                      <ms-input v-model="localEmployee.fixedPhone" />
                    </ms-editer>
                  </div>
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="Email" :error="errors.email">
                      <ms-input v-model="localEmployee.email" />
                    </ms-editer>
                  </div>
                </div>
              </div>
            </template>
          </ms-tabs>
        </div>
      </div>
    </template>
  </ms-form>
</template>

<script setup>
import MsForm from '@/components/controls/ms-form/MsForm.vue'
import MsComboBox from '@/components/controls/ms-combo-box/MsComboBox.vue'
import MsRadio from '@/components/controls/ms-radio/MsRadio.vue'
import MsDatepicker from '@/components/controls/ms-datepicker/MsDatepicker.vue'
import MsCheckbox from '@/components/controls/ms-checkbox/MsCheckbox.vue'
import MsEditer from '@/components/controls/ms-editer/MsEditer.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'
import MsTabs from '@/components/controls/ms-tabs/MsTabs.vue'
import MsTable from '@/components/controls/ms-table/MsTable.vue'
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import codeCounterAPI from '@/apis/components/employee/codeCounterAPI'
import employeeAPI from '@/apis/components/employee/employeeAPI'
import { useToast } from '@/utils/useToast'
import { generateNextCode } from '@/utils/codeGeneration'
import { mapOption } from '@/utils/mappingHelper'
import { employeeBankcolumns } from '@/constants/employeeConstants'
import { bank } from '@/models/bank'
import { watch, ref, toRaw, reactive } from 'vue'
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  masterData: {
    type: Object,
    required: true,
  },
})
const { error } = useToast()

// bank model
// định nghĩa model employee từ cha
const employee = defineModel()
//clone employee để xử lý
const localEmployee = ref({})

//default code
const defaultCode = ref('')
const errors = reactive({})
const emit = defineEmits(['close', 'store', 'storeAndAdd'])

/**
 * theo dõi thay đổi biến employee
 */
watch(
  employee,
  (val) => {
    if (!val) return
    const raw = toRaw(val)
    localEmployee.value = structuredClone(raw)

    // Chỉ fetch code mới nếu là thêm mới (không có employeeId)
    if (!raw.employeeId) {
      fetchCode()
    } else {
      defaultCode.value = raw.employeeCode
    }
  },
  { immediate: true },
)
/**
 * fetch code
 */
async function fetchCode() {
  const res = await codeCounterAPI.getCurrenCode()
  defaultCode.value = generateNextCode(res.data)
}
/**
 * Theo dõi khi mở form
 */
watch(
  () => props.open,
  async (val) => {
    if (!val) return
    // lỗi
    const code = employee.value?.employeeCode
    // update
    if (code) {
      defaultCode.value = code
      return
    }
    // thêm mới
    fetchCode()
  },
)
function handleClose() {
  localEmployee.value = {}

  Object.keys(errors).forEach((key) => delete errors[key])

  emit('close')
}
async function handleStore() {
  if (!validate()) return
  if (!localEmployee.value.employeeId) {
    const res = await employeeAPI.checkExist(defaultCode.value)
    if (res.data) {
      error('Mã đã tồn tại!')
      return
    }
  }
  localEmployee.value.employeeCode = defaultCode.value
  employee.value = structuredClone(toRaw(localEmployee.value))
  emit('store')
  emit('close')
}
async function handleStoreAndAdd() {
  if (!validate()) return
  if (!localEmployee.value.employeeId) {
    const res = await employeeAPI.checkExist(defaultCode.value)
    if (res.data) {
      errors.employeeCode = 'Mã nhân viên này đã tồn tại'
      return
    }
  }
  localEmployee.value.employeeCode = defaultCode.value
  employee.value = structuredClone(toRaw(localEmployee.value))

  emit('store-and-add')
  Object.keys(errors).forEach((key) => delete errors[key])
}
const tabs = [
  { key: 'salary', label: 'Thông tin tiền lương' },
  { key: 'bank', label: 'Tài khoản ngân hàng' },
  { key: 'contact', label: 'Thông tin liên hệ' },
]
function handleAddBank() {
  localEmployee.value.banks.push(bank())
}
function handleClearBank() {
  localEmployee.value.banks = [bank()]
}
function handleRemoveBank(index) {
  localEmployee.value.banks.splice(index, 1)
}
/**
 * validate
 */
function validate() {
  // Xóa từng key thay vì gán lại object mới
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!defaultCode.value?.trim()) {
    errors.employeeCode = 'Mã nhân viên không được để trống'
  }
  if (!localEmployee.value.employeeName?.trim()) {
    errors.employeeName = 'Tên nhân viên không được để trống'
  }
  if (!localEmployee.value.departmentId) {
    errors.departmentId = 'Đơn vị không được để trống'
  }
  if (localEmployee.value.email?.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(localEmployee.value.email.trim())) {
      errors.email = 'Email không đúng định dạng'
    }
  }

  return Object.keys(errors).length === 0
}
</script>
<style scoped>
.layout__personal-info {
  display: flex;
  gap: 26px;
  padding-bottom: 12px;
}
.personal-info {
  display: flex;
  flex-direction: column;
}
.flex {
  display: flex;
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
.layout__title {
  justify-content: flex-start;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.layout__delete {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.gap-10 {
  gap: 10px;
}
.pt-10 {
  padding-top: 10px;
}
</style>
