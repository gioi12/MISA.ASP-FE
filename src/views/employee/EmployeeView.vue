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
          <div class="arrow-check__icon"></div>
          <div>
            <ms-button type="add" color="black" icon="expand-more__icon" positionIcon="right">
              <div>Thực hiện hàng loạt</div>
            </ms-button>
          </div>
          <div>
            <ms-input placeholder="Tìm kiếm nhân viên" icon="search__icon" />
          </div>
          <div></div>
        </div>
      </div>
      <div class="layout__body-content"></div>
    </div>
  </div>
</template>
<script setup>
import MsButton from '@/components/controls/ms-button/MsButton.vue'
import MsInput from '@/components/controls/ms-input/MsInput.vue'
</script>
<style scoped>
.layout {
  height: 100vh;
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
  overflow: auto;
  scroll-behavior: smooth;
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.layout__body-toolbars {
  background: #fff;
  padding: 12px 0 12px 16px;
  position: relative;
}
.layout__body-content {
  background: #fff;
  overflow: auto !important;
  flex: 1;
  padding: 0 16px;
}
.layout__toolbars {
  display: flex;
  align-items: center;
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
