<template>
  <a-dropdown v-model:open="isOpen" :trigger="['click']" :placement="placement">
    <!-- Trigger -->
    <template #default>
      <slot name="button">
        <button>Dropdown</button>
      </slot>
    </template>

    <!-- Custom Content -->
    <template #overlay>
      <div class="custom-dropdown" @click.stop>
        <slot :close="closeDropdown" />
      </div>
    </template>
  </a-dropdown>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  placement: {
    type: String,
    default: 'bottomLeft',
  },
  widthMatchTrigger: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)
function closeDropdown() {
  isOpen.value = false
}
</script>

<style scoped>
.custom-dropdown {
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
</style>
