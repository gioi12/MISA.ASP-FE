<template>
  <div class="layout">
    <div class="layout__left">
      <div class="layout__left-container">
        <div class="option__icon layout__padding"></div>
        <div class="misa-asp__icon"></div>
      </div>
    </div>
    <div class="layout__right">
      <div class="layout__right-container">
        <div class="layout__right-info">
          <div class="three-stripes__icon"></div>
          <div class="brand__name">Fresher ASP - ASP Test</div>
          <div class="licene__item">
            <div class="licene__icon"></div>
            <div class="licene__text">LH159FSASP - ASP Test</div>
          </div>
        </div>
        <div class="layout__right-toolbars">
          <div class="search__item">
            <input type="text" placeholder="Nhập từ khóa tìm kiếm" class="input__search" />
            <div class="search__icon"></div>
          </div>
          <div class="install__icon"></div>
          <div class="settings__icon"></div>
          <div class="notice__icon"></div>
          <div class="question__icon"></div>
          <div class="knowledge__icon"></div>
          <div class="avatar">G</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* layout header */
.layout {
  display: flex;
}

/* css layout left */
.layout__left {
  width: auto;
  background-color: var(--primary--color);
  height: var(--nav-bar-height);
}

.layout__left-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 10px;
  width: 200px;
}

.licene__item {
  display: flex;
  align-items: center;
  background: rgba(239, 239, 239, 0.2);
  padding: 0 12px;
  border-radius: 40px;
  margin-left: 20px;
  font-size: 13px;
  cursor: pointer;
  height: 30px;
}

.licene__icon {
  width: 8px;
  height: 8px;
  background-color: var(--active--color);
  border-radius: 50%;
}
.licene__text {
  color: white;
  margin-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all ease 0.2s;
  max-width: 200px;
  padding-left: 7px;
}
.brand__name {
  padding-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  max-width: 450px;
  text-overflow: ellipsis;
  transition: all ease 0.2s;
  font-size: 14px;
  color: #fff;
}
@media (max-width: 1300px) {
  .licene__text {
    max-width: 80px;
  }
  .brand__name {
    max-width: 100px;
  }
}
@media (max-width: 1366px) {
  .licene__text {
    max-width: 80px;
  }
  .brand__name {
    max-width: 150px;
  }
}
@media (max-width: 1440px) {
  .licene__text {
    max-width: 150px;
  }
  .brand__name {
    max-width: 200px;
  }
}
@media (max-width: 1680px) {
  .brand__name {
    max-width: 350px;
  }
}
/* kết thúc css layout left */

/* css layout right */
.layout__right {
  background: linear-gradient(to right, var(--primary--color), #00c1bf);
  height: var(--nav-bar-height);
  flex: 1;
}

.layout__padding {
  margin: 6px;
}
.layout__right-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.layout__right-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layout__right-toolbars {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 0 10px;
}
.search__item {
  display: flex;
  align-items: center;
  background: rgba(239, 239, 239, 0.2);
  padding: 5px 10px;
}
.input__search {
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 200px;
}
.input__search::placeholder {
  color: white;
  font-style: italic;
}
/* kết thúc css layout right */
</style>
