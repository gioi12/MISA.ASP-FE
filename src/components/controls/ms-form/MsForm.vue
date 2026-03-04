<template>
  <div class="ms-form" :class="props.open && 'active'">
    <div class="form__bg"></div>
    <div
      class="drag__form"
      :style="{
        transform: !props.settingsMode
          ? `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
          : 'none',
      }"
      :class="{ 'is-dragging': isDragging, 'drag__form--settings': props.settingsMode }"
      @mousedown="startDrag"
    >
      <div class="form__content">
        <header class="form__header">
          <div class="form__header-title">
            <div class="flex">
              <div class="title">{{ title }}</div>
              <!-- slot cho title pop up -->
              <slot name="area-title__slot"></slot>
            </div>
          </div>
          <div class="form__header-close">
            <div class="ask__icon cursor-pointer"></div>
            <div class="close__icon cursor-pointer" @click="handleClose"></div>
          </div>
        </header>
        <div class="form__content--header">
          <!-- slot cho header content popup -->
          <slot name="form-content-header__slot"></slot>
        </div>
        <div class="form__content--body">
          <!-- slot cho body content popup -->
          <slot name="form-content-body__slot"></slot>
          <div class="footer__container">
            <div class="divide"></div>
            <div class="form__footer flex">
              <div class="form__footer-left">
                <button
                  class="ms-button ms-button-secondary ms-button-size-default ms-button-radius-false"
                  @click="handleClose"
                >
                  Hủy
                </button>
              </div>
              <div class="form__footer-right">
                <!-- slot cho hành động pop up -->
                <slot name="form-footer-right__slot">
                  <div class="flex gap-8">
                    <button
                      class="ms-button ms-button-secondary ms-button-size-default ms-button-radius-false"
                      @click="handleStore"
                    >
                      Cất
                    </button>
                    <button
                      class="ms-button ms-button-primary ms-button-size-default ms-button-radius-false"
                      @click="handleStoreAndAdd"
                    >
                      Cất và thêm
                    </button>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  settingsMode: {
    type: Boolean,
    default: false,
  },
})
// định nghĩa emit cho đóng
const emit = defineEmits(['close', 'store', 'storeAndAdd'])

const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

// Các tag/class không trigger drag khi click vào
const IGNORE_TAGS = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'OPTION']
const IGNORE_CLASSES = ['ms-combo', 'ms-checkbox', 'ms-radio', 'ms-date-picker']

function handleClose() {
  emit('close')
}
function handleStore() {
  emit('store')
}
function handleStoreAndAdd() {
  emit('storeAndAdd')
}

function shouldIgnore(target) {
  if (IGNORE_TAGS.includes(target.tagName)) return true
  if (IGNORE_CLASSES.some((cls) => target.closest(`.${cls}`))) return true
  return false
}
/**
 * bắt đầutính giá trị chuột
 * @param e
 */
function startDrag(e) {
  if (shouldIgnore(e.target)) return

  isDragging.value = true
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  }

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}
/**
 * lắng nghe tính giá trị chuột
 * @param e
 */
function onDrag(e) {
  if (!isDragging.value) return
  position.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y,
  }
}
/**
 * Dừng kéo thả chuột
 */
function stopDrag() {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}
/**
 * Khi mở set giá trị về 0
 */
watch(
  () => props.open,
  (val) => {
    if (!val) position.value = { x: 0, y: 0 }
  },
)
/**
 * xóa event lắng nghe khi unmounted
 */
onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.ms-form {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.active {
  display: block;
}
.flex {
  display: flex !important;
}
.form__bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  z-index: 1000;
  opacity: 0.3;
}
.drag__form {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1001;
  cursor: grab;
  user-select: none;
}
.drag__form.is-dragging {
  cursor: grabbing;
}

/* Trả cursor về đúng cho các element tương tác bên trong */
.drag__form input,
.drag__form textarea,
.drag__form select,
.drag__form label {
  cursor: auto;
  user-select: text;
}
.drag__form button {
  cursor: pointer;
}

.form__content {
  background-color: white;
  border-radius: 4px;
  min-width: 900px;
  max-width: 900px;
  width: 900px;
}
.form__content--header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  position: relative;
}
.form__content--body {
  transition: all 0.23s ease 0.1s;
  flex-direction: column;
  display: flex;
  overflow: auto;
  overflow-y: visible;
  padding: 0 32px 20px;
  /* cuộn */
  max-height: 600px;
}
.form__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  position: relative;
}
.form__header-close {
  display: flex;
  padding: 12px;
}
.title {
  font-size: 24px;
  color: var(--default-text-color);
  font-weight: 700;
}
.divide {
  width: 100%;
  border-top: 1px solid #e0e0e0;
  margin: 32px 0 20px;
  position: relative;
}
.ms-button {
  transition: all 0.2s ease;
  border: 0px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  background: transparent;
  overflow: visible;
  color: #fff;
}
.ms-button-secondary {
  border: 1px solid #8d9096;
  color: #111;
  background-color: transparent;
}
.ms-button-size-default {
  height: var(--primary-button-height);
  padding: 6px 16px;
}
.ms-button-radius-false {
  border-radius: 3px;
}
.ms-button-primary {
  border: 1px solid transparent;
  color: #fff;
  background-color: var(--primary--color);
}
.form__footer {
  justify-content: space-between;
}
.gap-8 {
  gap: 8px;
}
.form__header-title {
  width: 100%;
  padding: 20px 12px 20px 32px;
  position: relative;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
}
.cursor-pointer {
  cursor: pointer;
}
/* css form cho settings */
.drag__form--settings {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  right: 0;
  top: 0;
  left: auto;
  width: auto;
}

/* kết thúc css form cho settings */
</style>
