<template>
  <button
    :class="['ms-button', props.type !== 'default' && `ms-button--${props.type}`]"
    :style="{ color: props.color }"
  >
    <div
      v-if="icon && positionIcon === 'left'"
      class="ms-button__icon ms-button__icon--left"
      :class="icon"
      :style="{ backgroundColor: props.iconColor }"
    ></div>
    <slot></slot>
    <div
      v-if="icon && positionIcon === 'right'"
      class="ms-button__icon ms-button__icon--right"
      :class="icon"
      :style="{ backgroundColor: props.iconColor }"
    ></div>
  </button>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  color: {
    type: String,
    default: 'black',
  },
  icon: {
    type: String,
    default: null,
  },
  positionIcon: {
    type: String,
    default: null,
  },
  iconColor: {
    type: String,
    default: 'black',
  },
})
</script>
<style scoped>
/* css cho thuộc tính ms-button */
.ms-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  overflow: visible;
  height: var(--rounded-button-height);
  padding: 8px 12px 8px 16px;
  font-size: 14px;
  background: transparent;
}

.button__icon {
  display: inline-block;
  align-items: center;
}
.ms-button__icon--left {
  padding-right: 6px;
}
.ms-button__icon--right {
  padding-left: 6px;
}
/* kết thúc css cho thuộc tính button */

/* css cho loại button */
.ms-button--add {
  background-color: white;
  border: 2px solid #3b3c3f !important;
  border-radius: 30px;
  color: #111;
  padding: 0 16px;
  font-weight: 600;
}

.ms-button--primary {
  border: 1px solid transparent;
  color: #fff;
  background-color: var(--primary--color);
}
/* kết thúc css cho loại button */

/* css tùy chỉnh cho button */
.ms-radius-true {
  border-radius: 30px 0 0 30px;
}

.ms-dropdown-style-default {
  padding: 8px 12px 8px 16px;
  height: var(--rounded-button-height);
}
.ms-con-dropdown-radius-false-true {
  border-radius: 0 30px 30px 0;
}
.ms-padding-is-single-false-size-default {
  padding: 8px 12px 8px 8px;
}
/* kết thúc css tùy chỉnh cho button */
</style>
