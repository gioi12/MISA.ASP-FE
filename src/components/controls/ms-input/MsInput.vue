<template>
  <div class="search__item">
    <input type="text" :placeholder="props.placeholder" class="input__search" v-model="model" />
    <div v-if="props.icon" :class="props.icon" :style="{ backgroundColor: props.iconColor }"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: 'black',
  },
})
// định nghĩa model
const model = defineModel()
</script>

<style scoped>
.search__item {
  display: flex;
  align-items: center;
  background: rgba(239, 239, 239, 0.2);
  padding: 0px 10px;
  border: 1px solid #babec5;
  border-radius: 2px;
}
.search__item:hover {
  outline: 1px solid #e2e2e2;
}

.input__search {
  font-size: 13px;
  height: var(--input-height);
  color: inherit;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  border: none;
}

.input__search::placeholder {
  font-style: italic;
}
.input__search:focus {
  border: none;
  outline: none;
}
.search__item:focus-within {
  border: 1px solid var(--primary--color);
}
</style>
