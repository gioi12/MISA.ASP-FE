<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="state.visible" class="ms-dialog-overlay" @click.self="dialog.close('cancel')">
        <div class="ms-dialog">
          <div v-if="state.title" class="ms-dialog__header">{{ state.title }}</div>

          <div class="ms-dialog__body">
            <div :class="['mi', 'mi-48', iconClass]" />
            <span class="ms-dialog__message">{{ state.message }}</span>
          </div>

          <div class="ms-dialog__divider" />

          <div class="ms-dialog__footer">
            <ms-button
              v-for="btn in state.buttons"
              :key="btn.value"
              :class="btn.class"
              @click="dialog.close(btn.value)"
            >
              {{ btn.text }}
            </ms-button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { state, dialog } from '@/utils/useDialog'
import MsButton from '@/components/controls/ms-button/MsButton.vue'

const iconClass = computed(
  () =>
    ({
      info: 'mi-information-48',
      success: 'mi-check-circle-48',
      warning: 'mi-warning-48',
      error: 'mi-error-48',
      question: 'mi-exclamation-question-48',
    })[state.value.type] ?? 'mi-information-48',
)
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 380px;
  border-left: 4px solid;
}
.toast--info {
  border-color: #0075c0;
}
.toast--success {
  border-color: #2ecc71;
}
.toast--warning {
  border-color: #f39c12;
}
.toast--error {
  border-color: #e74c3c;
}

.toast__message {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
