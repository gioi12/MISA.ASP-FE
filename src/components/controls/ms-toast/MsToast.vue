<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="ms-toast-container">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="ms-component ms-toastfications activetoast"
        :style="{ border: `1px solid ${borderColor(t.type)}` }"
        @click="remove(t.id)"
      >
        <div class="content-toast">
          <div :class="[iconClass(t.type)]" />
          <div class="con-text-toast">
            <p>{{ t.message }}</p>
          </div>
        </div>
        <span class="filling" />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { toasts } from '@/utils/useToast'

const ICONS = {
  success: 'dialog__icon--success',
  error: 'dialog__icon--error',
  warning: 'dialog__icon-warning',
  info: 'dialog__icon-info',
}

const BORDERS = {
  success: 'rgb(119, 221, 119)',
  error: 'rgb(255, 119, 119)',
  warning: 'rgb(255, 193, 7)',
  info: 'rgb(0, 117, 192)',
}

const iconClass = (type) => ICONS[type] ?? ICONS.info
const borderColor = (type) => BORDERS[type] ?? BORDERS.info

function remove(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}
</script>

<style scoped>
.ms-toast-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  pointer-events: none;
}

.ms-component.ms-toastfications {
  position: relative;
  z-index: 200000;
  padding: 18px 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: default;
  min-width: 400px;
  max-width: 350px;
  color: rgb(33, 33, 33);
  background: #fff;
  pointer-events: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.content-toast {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.con-text-toast p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.filling {
  position: absolute;
  right: -100px;
  bottom: -100px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  height: 796px;
  width: 796px;
  opacity: 0.06;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(110%);
}
.toast-move {
  transition: all 0.3s ease;
}
</style>
