<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
import TheSidebar from '@/layouts/TheSidebar.vue'
</script>

<template>
  <div class="layout">
    <div class="layout__header">
      <TheHeader />
    </div>
    <div class="layout__body">
      <div class="layout__menu">
        <TheSidebar />
      </div>
      <div class="layout__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
}
.layout__header {
  height: var(--nav-bar-height);
}
.layout__body {
  display: flex;
  height: calc(100vh - 48px);
}
.layout__content {
  flex: 1;
  background-color: #eeeff1;
  padding-left: 16px;
  min-width: 0;
  overflow: hidden;
  height: 100%;
}
.layout__menu {
  background-color: white;
}
</style>
