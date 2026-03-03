<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // [{ key: 'salary', label: 'Thông tin tiền lương' }]
  },
})

const activeTab = ref(props.tabs[0].key)

const changeTab = (key) => {
  activeTab.value = key
}
</script>

<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tabs__item"
        :class="{ 'tabs__item--active': activeTab === tab.key }"
        @click="changeTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="tabs__content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  width: 100%;
}

.tabs__header {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.tabs__item {
  padding: 5px 8px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  border: 1px solid #ddd;
  border-bottom: none;
  margin-bottom: -1px;
  transition: all 0.1s;
  user-select: none;
  border-radius: 3px 3px 0 0;
  margin-right: 1px;
}

.tabs__item:hover {
  color: var(--primary--color);
}

.tabs__item--active {
  color: #333;
  font-weight: 500;
  background: #cce4f9;
  border: 1px solid #ddd;
}

.tabs__content {
  padding: 16px;
  border: 1px solid #ddd;
  border-top: none;
  background: #fff;
  height: 150px;
}
</style>
