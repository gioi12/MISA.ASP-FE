<template>
  <div class="search__item">
    <input type="text" :placeholder="props.placeholder" class="input__search" />
    <div v-if="props.icon" :class="props.icon"></div>
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
})
</script>

<style scoped>
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
</style>
