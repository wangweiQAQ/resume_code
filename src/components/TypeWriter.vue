<template>
  <span class="typewriter">
    <span class="typewriter__text">{{ displayText }}</span>
    <span class="typewriter__cursor">|</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  text: string
  speed?: number
  delay?: number
  loop?: boolean
}>()

const displayText = ref('')
let charIndex = 0
let timer: ReturnType<typeof setTimeout> | null = null
let isDeleting = false

/**
 * 打字机效果
 */
const type = () => {
  const speed = props.speed ?? 80
  const text = props.text

  if (!isDeleting) {
    // 打字阶段
    displayText.value = text.substring(0, charIndex + 1)
    charIndex++

    if (charIndex === text.length) {
      // 打字完成，等待后删除（如果开启循环）
      if (props.loop) {
        timer = setTimeout(() => {
          isDeleting = true
          type()
        }, 2000)
      }
      return
    }
  } else {
    // 删除阶段
    displayText.value = text.substring(0, charIndex - 1)
    charIndex--

    if (charIndex === 0) {
      isDeleting = false
      timer = setTimeout(type, 500)
      return
    }
  }

  timer = setTimeout(type, isDeleting ? speed / 2 : speed)
}

onMounted(() => {
  const delay = props.delay ?? 500
  timer = setTimeout(type, delay)
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})

watch(() => props.text, () => {
  if (timer) clearTimeout(timer)
  charIndex = 0
  isDeleting = false
  displayText.value = ''
  const delay = props.delay ?? 500
  timer = setTimeout(type, delay)
})
</script>

<style scoped lang="scss">
.typewriter {
  display: inline;

  &__text {
    color: inherit;
  }

  &__cursor {
    display: inline-block;
    color: var(--primary-light);
    font-weight: 300;
    animation: blink 1s infinite;
    margin-left: 2px;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
