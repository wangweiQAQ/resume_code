<template>
  <span class="count-up">{{ displayValue }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  endValue: number
  duration?: number
  suffix?: string
  decimals?: number
}>(), {
  duration: 2000,
  suffix: '',
  decimals: 0
})

const displayValue = ref(0)
let animationFrame: number | null = null
let startTime: number | null = null

/**
 * 缓动函数 - easeOutExpo
 */
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * 动画函数
 */
const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp

  const progress = Math.min((timestamp - startTime) / props.duration, 1)
  const easedProgress = easeOutExpo(progress)

  displayValue.value = Number((props.endValue * easedProgress).toFixed(props.decimals))

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animate)
  }
}

/**
 * 开始动画
 */
const startAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  startTime = null
  displayValue.value = 0
  animationFrame = requestAnimationFrame(animate)
}

// 暴露方法供父组件调用
defineExpose({ startAnimation })

onMounted(() => {
  // 默认不自动开始，等待父组件触发
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped lang="scss">
.count-up {
  font-variant-numeric: tabular-nums;
}
</style>
