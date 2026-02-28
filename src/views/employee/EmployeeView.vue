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
            <ms-table :columns="columns" :data="rows"></ms-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'
import MsTable from '@/components/controls/ms-table/MsTable.vue'

const columns = [
  { key: 'employeeCode', title: 'Mã NV', width: 110, minWidth: 80 },
  { key: 'employeeName', title: 'Tên nhân viên', width: 160, minWidth: 120 },
  { key: 'taxCode', title: 'MST', width: 120, minWidth: 90 },
  { key: 'position', title: 'Chức danh', width: 130, minWidth: 100 },
  { key: 'unitCode', title: 'Mã đơn vị', width: 100, minWidth: 80 },
  { key: 'unitName', title: 'Tên đơn vị', width: 140, minWidth: 110 },
  { key: 'bankAccount', title: 'Số TK', width: 130, minWidth: 100 },
  { key: 'bankName', title: 'Ngân hàng', width: 130, minWidth: 100 },
  { key: 'status', title: 'Trạng thái', width: 110, minWidth: 90 },
  { key: 'mobile', title: 'Di động', width: 120, minWidth: 100 },
  { key: 'gender', title: 'GT', width: 70, minWidth: 60 },
  { key: 'dob', title: 'Ngày sinh', width: 110, minWidth: 90 },
  { key: 'passport', title: 'Hộ chiếu', width: 120, minWidth: 90 },
  { key: 'identity', title: 'CCCD/CMND', width: 140, minWidth: 110 },
  { key: 'issueDate', title: 'Ngày cấp', width: 110, minWidth: 90 },
  { key: 'issuePlace', title: 'Nơi cấp', width: 130, minWidth: 100 },
  { key: 'isCustomer', title: 'KH', width: 70, minWidth: 60 },
  { key: 'isSupplier', title: 'NCC', width: 70, minWidth: 60 },
  { key: 'createdDate', title: 'Ngày tạo', width: 110, minWidth: 90 },
  { key: 'createdBy', title: 'Người tạo', width: 110, minWidth: 90 },
  { key: 'modifiedDate', title: 'Ngày sửa', width: 110, minWidth: 90 },
  { key: 'modifiedBy', title: 'Người sửa', width: 110, minWidth: 90 },
  { key: 'action', title: 'Chức năng', width: 100, minWidth: 80 },
]

const rows = [
  {
    employeeCode: 'NV001',
    employeeName: 'Nguyễn Văn An',
    taxCode: '0101111111',
    position: 'Nhân viên kinh doanh',
    unitCode: 'KD01',
    unitName: 'Kinh doanh',
    bankAccount: '100000001',
    bankName: 'Vietcombank',
    status: 'Đang làm việc',
    mobile: '0901000001',
    gender: 'Nam',
    dob: '1995-03-12',
    passport: 'P100001',
    identity: '012345678901',
    issueDate: '2015-06-01',
    issuePlace: 'Hà Nội',
    isCustomer: 'Không',
    isSupplier: 'Không',
    createdDate: '2024-01-01',
    createdBy: 'admin',
    modifiedDate: '2024-02-01',
    modifiedBy: 'admin',
    action: 'Sửa | Xóa',
  },
  {
    employeeCode: 'NV002',
    employeeName: 'Trần Thị Bình',
    taxCode: '0102222222',
    position: 'Kế toán',
    unitCode: 'KT01',
    unitName: 'Kế toán',
    bankAccount: '100000002',
    bankName: 'BIDV',
    status: 'Đang làm việc',
    mobile: '0901000002',
    gender: 'Nữ',
    dob: '1994-07-20',
    passport: 'P100002',
    identity: '012345678902',
    issueDate: '2016-03-10',
    issuePlace: 'TP.HCM',
    isCustomer: 'Có',
    isSupplier: 'Không',
    createdDate: '2024-01-02',
    createdBy: 'admin',
    modifiedDate: '2024-02-02',
    modifiedBy: 'admin',
    action: 'Sửa | Xóa',
  },
  {
    employeeCode: 'NV003',
    employeeName: 'Lê Văn Chi',
    taxCode: '0103333333',
    position: 'IT',
    unitCode: 'IT01',
    unitName: 'Công nghệ',
    bankAccount: '100000003',
    bankName: 'Vietinbank',
    status: 'Đang làm việc',
    mobile: '0901000003',
    gender: 'Nam',
    dob: '1996-01-15',
    passport: 'P100003',
    identity: '012345678903',
    issueDate: '2017-01-01',
    issuePlace: 'Đà Nẵng',
    isCustomer: 'Không',
    isSupplier: 'Có',
    createdDate: '2024-01-03',
    createdBy: 'admin',
    modifiedDate: '2024-02-03',
    modifiedBy: 'admin',
    action: 'Sửa | Xóa',
  },
]
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
  overflow: auto !important;
  flex: 1;
  padding: 0 16px;
  position: relative;
  min-width: 0;
  min-height: 0;
}

.layout__control {
  /* overflow: auto; */
  /* max-width: 1000px; */
  width: 100%;
  min-width: 0;
}
.layout__control-scroller {
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
