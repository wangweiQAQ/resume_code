<template>
  <!-- 鼠标跟随光晕效果 -->
  <div
    ref="cursorRef"
    class="cursor-glow"
    :class="{ 'is-visible': isVisible }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref<HTMLDivElement | null>(null)
const isVisible = ref(false)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let animationId: number | null = null

/**
 * 缓动跟随动画
 */
const animate = () => {
  // 缓动系数 - 值越小越平滑
  const ease = 0.15

  currentX += (mouseX - currentX) * ease
  currentY += (mouseY - currentY) * ease

  if (cursorRef.value) {
    cursorRef.value.style.left = `${currentX}px`
    cursorRef.value.style.top = `${currentY}px`
  }

  animationId = requestAnimationFrame(animate)
}

/**
 * 处理鼠标移动
 */
const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

/**
 * 处理鼠标进入
 */
const handleMouseEnter = () => {
  isVisible.value = true
}

/**
 * 处理鼠标离开
 */
const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  // 检测是否为触摸设备
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if (!isTouchDevice) {
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    animate()
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped lang="scss">
.cursor-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(22, 93, 255, 0.12) 0%,
    rgba(22, 93, 255, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;

  &.is-visible {
    opacity: 1;
  }
}

/* 移动端禁用 */
@media (max-width: 768px) {
  .cursor-glow {
    display: none;
  }
}
</style>
