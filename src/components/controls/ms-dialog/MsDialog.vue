<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="state.visible" class="ms-dialog-overlay" @click.self="dialog.close(false)">
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
              :key="btn.text"
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
.ms-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.ms-dialog {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
}

/* Header */
.ms-dialog__header {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  color: #111;
}

/* Body: icon bên trái, message bên phải — giống UI gốc */
.ms-dialog__body {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px 16px;
}

.ms-dialog__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ms-dialog__message {
  font-size: 13px;
  color: #333;
  line-height: 1.5;
}

/* Divider */
.ms-dialog__divider {
  height: 1px;
  background: #e8e8e8;
  margin: 0;
}

/* Footer: cancel trái, (no + confirm) phải */
.ms-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  gap: 8px;
}

.ms-dialog__footer-left {
  display: flex;
  gap: 8px;
}

.ms-dialog__footer-right {
  display: flex;
  gap: 8px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
