<template>
  <ms-form :open="props.open" :title="'Thông tin nhân viên'" @close="handleClose">
    <!-- Tiêu đề popup -->
    <template #area-title__slot>
      <div class="layout__title">
        <div><ms-checkbox :class="'px-6'">Khách hàng</ms-checkbox></div>
        <div><ms-checkbox :class="'px-6'">Nhà cung cấp</ms-checkbox></div>
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
                <ms-editer label="Mã" :required="true">
                  <ms-input />
                </ms-editer>
              </div>
              <div class="w-3/5">
                <ms-editer label="Tên" :required="true">
                  <ms-input />
                </ms-editer>
              </div>
            </div>
            <div class="row-input">
              <ms-editer label="Đơn vị" :required="true">
                <ms-combo-box :options="[]" />
              </ms-editer>
            </div>
            <div class="row-input">
              <ms-editer label="Chức danh">
                <ms-input />
              </ms-editer>
            </div>
            <div class="row-input">
              <ms-editer label="Nhóm khách hàng,nhà cung cấp">
                <ms-combo-box :options="[]" />
              </ms-editer>
            </div>
          </div>
          <div class="personal-info">
            <div>
              <div class="flex row-input">
                <div class="w-1/3 p-r-6">
                  <ms-editer label="Ngày sinh">
                    <ms-datepicker />
                  </ms-editer>
                </div>
                <div class="w-1/3">
                  <ms-editer label="Giới tính">
                    <div class="flex">
                      <div class="p-r-6">
                        <MsRadio value="male"> Nam </MsRadio>
                      </div>
                      <div>
                        <MsRadio value="female"> Nữ </MsRadio>
                      </div>
                    </div>
                  </ms-editer>
                </div>
                <div class="w-1/3 ml-10">
                  <ms-editer label="Số hộ chiếu">
                    <ms-input />
                  </ms-editer>
                </div>
              </div>
              <div class="flex row-input">
                <div class="w-3/5 p-r-6">
                  <ms-editer label="Số CMND/CCCD">
                    <ms-input />
                  </ms-editer>
                </div>
                <div class="w-2/5">
                  <ms-editer label="Ngày cấp">
                    <ms-datepicker />
                  </ms-editer>
                </div>
              </div>
              <div class="row-input">
                <ms-editer label="Nơi cấp">
                  <ms-input />
                </ms-editer>
              </div>
              <div class="flex row-input">
                <div class="w-1/3 p-r-6">
                  <ms-editer label="TK công nợ phải thu">
                    <ms-combo-box :options="[]" />
                  </ms-editer>
                </div>
                <div class="w-1/3 ml-10">
                  <ms-editer label="TK công nợ phải trả">
                    <ms-combo-box :options="[]" />
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
                      <ms-input />
                    </ms-editer>
                  </div>
                  <div class="w-1/6 p-r-12">
                    <ms-editer label="Hệ số lương">
                      <ms-input />
                    </ms-editer>
                  </div>
                  <div class="w-1/3 p-r-12">
                    <ms-editer label="Lương đóng bảo hiểm">
                      <ms-input />
                    </ms-editer>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="Mã số thuế">
                      <ms-input />
                    </ms-editer>
                  </div>
                  <div class="w-1/2 p-r-12">
                    <ms-editer label="Loại hợp đồng" :required="true">
                      <ms-combo-box :options="masterData?.contracts?.data || []" />
                    </ms-editer>
                  </div>
                  <div class="w-1/6 p-r-12">
                    <ms-editer label="Số người phụ thuộc">
                      <ms-input icon="expand-more__icon" />
                    </ms-editer>
                  </div>
                </div>
              </div>
            </template>

            <template #bank>
              <ms-table :columns="employeeBankcolumns" :data="rows">
                <template #acountNumber="{ row }">
                  <ms-input />
                </template>
                <template #bankName="{ row }">
                  <ms-input />
                </template>
                <template #address="{ row }">
                  <ms-input />
                </template>
                <template #city="{ row }">
                  <ms-input />
                </template>
                <template #action="{ row }">
                  <div class="delete__icon"></div>
                </template>
              </ms-table>
              <div class="flex p-r-6">
                <div>
                  <ms-button>Thêm dòng</ms-button>
                </div>
                <div>
                  <ms-button>Xóa hết dòng</ms-button>
                </div>
              </div>
            </template>

            <template #contact>
              <div class="personal-info">
                <div class="flex row-input">
                  <div class="w-1">
                    <ms-editer label="Địa chỉ">
                      <ms-input />
                    </ms-editer>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="ĐT di động">
                      <ms-input />
                    </ms-editer>
                  </div>
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="ĐT cố định">
                      <ms-input />
                    </ms-editer>
                  </div>
                  <div class="w-1/4 p-r-12">
                    <ms-editer label="Email">
                      <ms-input />
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
import { employeeBankcolumns } from '@/constants/employeeConstants'
import { bank } from '@/models/bank'
import { watch, ref } from 'vue'
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
// bank model
const rows = ref(bank())
// định nghĩa model employee từ cha
const employee = defineModel()
//clone employee để xử lý
const localEmployee = ref({})

const emit = defineEmits(['close'])

/**
 * theo dõi thay đổi biến employee
 */
watch(
  employee,
  (val) => {
    if (!val) return
    localEmployee.value = JSON.parse(JSON.stringify(val))
  },
  { immediate: true },
)
function handleClose() {
  emit('close')
}
const tabs = [
  { key: 'salary', label: 'Thông tin tiền lương' },
  { key: 'bank', label: 'Tài khoản ngân hàng' },
  { key: 'contact', label: 'Thông tin liên hệ' },
]
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
</style>
