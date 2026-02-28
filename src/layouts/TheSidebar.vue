<template>
  <div class="layout">
    <div class="layout__header">
      <ms-button
        type="add"
        color="black"
        iconColor="var(--primary--color)"
        icon="add__icon"
        positionIcon="left"
      >
        <div style="padding-left: 6px; padding-right: 10px">Thêm nhanh</div>
      </ms-button>
    </div>
    <div class="layout__menu">
      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="dashboard__icon"></div>
          <div class="layout__item-text">Tổng quan</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="cash__icon"></div>
          <div class="layout__item-text">Tiền mặt</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="bank__icon"></div>
          <div class="layout__item-text">Tiền gửi</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="shop__icon"></div>
          <div class="layout__item-text">Mua hàng</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="sales__icon"></div>
          <div class="layout__item-text">Bán hàng</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="invoice__icon"></div>
          <div class="layout__item-text">Quản lý hóa đơn</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="warehouse__icon"></div>
          <div class="layout__item-text">Kho</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="tools__icon"></div>
          <div class="layout__item-text">Công cụ dụng cụ</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="fixed-assets__icon"></div>
          <div class="layout__item-text">Tài sản cố định</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="salary__icon"></div>
          <div class="layout__item-text">Tiền lương</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="tax__icon"></div>
          <div class="layout__item-text">Thuế</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="price__icon"></div>
          <div class="layout__item-text">Giá thành</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="general__icon"></div>
          <div class="layout__item-text">Tổng hợp</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="report__icon"></div>
          <div class="layout__item-text">Báo cáo</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="compare__icon"></div>
          <div class="layout__item-text">Kiểm soát rủi ro</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__line"></div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="category__icon"></div>
          <div class="layout__item-text">Danh mục</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>

      <div class="layout__menu-item">
        <div class="layout__item">
          <div class="opening__icon"></div>
          <div class="layout__item-text">Số dư ban đầu</div>
        </div>
        <div class="arrow-right__icon"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'
</script>
<style scoped>
/* css layout sidebar */
.layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  width: 200px;
  height: 100vh;
  overflow: hidden;
}
.layout__menu {
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: calc(100vh - 48px);
  overflow: auto;
}
.layout__header {
  display: flex;
  justify-content: center;
}
.layout__menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  height: 42px;
}
.layout__item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layout__item-text {
  font-size: 13px;
}
.layout__line {
  height: 1px;
  color: #eceef1;
  border-bottom: 1px solid #eceef1;
  margin: 6px 10px;
}
/*Kết thúc css layout sidebar */
</style>
