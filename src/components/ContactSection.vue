<template>
  <!-- 联系板块 -->
  <section id="contact" class="contact section">
    <div class="container">
      <!-- 标题 -->
      <div class="contact__header fade-in-up" :class="{ 'is-visible': isVisible }">
        <h2 class="section-title">联系我</h2>
        <p class="section-subtitle">期待与您的合作，随时欢迎联系</p>
      </div>

      <!-- 联系方式卡片 -->
      <div class="contact__cards">
        <!-- 电话 -->
        <div
          class="contact__card glass-effect fade-in-up"
          :class="{ 'is-visible': isVisible }"
          style="transition-delay: 0.15s"
        >
          <div class="contact__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h3 class="contact__card-title">电话</h3>
          <a :href="`tel:${personalInfo.phone}`" class="contact__card-value">
            {{ personalInfo.phone }}
          </a>
          <p class="contact__card-desc">工作日 9:00 - 20:00</p>
        </div>

        <!-- 邮箱 -->
        <div
          class="contact__card glass-effect fade-in-up"
          :class="{ 'is-visible': isVisible }"
          style="transition-delay: 0.25s"
        >
          <div class="contact__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3 class="contact__card-title">邮箱</h3>
          <a :href="`mailto:${personalInfo.email}`" class="contact__card-value">
            {{ personalInfo.email }}
          </a>
          <p class="contact__card-desc">24小时内回复</p>
        </div>

        <!-- 所在地 -->
        <div
          class="contact__card glass-effect fade-in-up"
          :class="{ 'is-visible': isVisible }"
          style="transition-delay: 0.35s"
        >
          <div class="contact__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3 class="contact__card-title">期望城市</h3>
          <span class="contact__card-value">{{ personalInfo.targetCity }}</span>
          <p class="contact__card-desc">可接受远程/线上面试</p>
        </div>
      </div>

      <!-- 快速联系按钮 -->
      <div class="contact__actions fade-in-up" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.45s">
        <a :href="`tel:${personalInfo.phone}`" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          立即电话联系
        </a>
        <a :href="`mailto:${personalInfo.email}`" class="btn btn-outline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          发送邮件
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'

const resumeStore = useResumeStore()
const { personalInfo } = storeToRefs(resumeStore)

// 动画可见状态
const isVisible = ref(false)

/**
 * 检测元素是否进入视口
 */
const checkVisibility = () => {
  const element = document.getElementById('contact')
  if (element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    if (rect.top < windowHeight * 0.85) {
      isVisible.value = true
    }
  }
}

let scrollListener: (() => void) | null = null

onMounted(() => {
  scrollListener = checkVisibility
  window.addEventListener('scroll', scrollListener, { passive: true })
  checkVisibility()
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped lang="scss">
.contact {
  position: relative;

  &__header {
    text-align: center;
  }

  // 联系方式卡片
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    max-width: 900px;
    margin: 0 auto 48px;
  }

  &__card {
    text-align: center;
    padding: 32px 24px;
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(22, 93, 255, 0.3);

      .contact__card-icon {
        transform: scale(1.1);
      }
    }
  }

  &__card-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-gradient);
    border-radius: 50%;
    color: #fff;
    transition: transform var(--transition-normal);
    box-shadow: 0 4px 14px rgba(22, 93, 255, 0.4);

    svg {
      width: 28px;
      height: 28px;
    }
  }

  &__card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  &__card-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    display: block;
    margin-bottom: 8px;
    word-break: break-all;

    &:hover {
      color: var(--primary-light);
    }
  }

  &__card-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  // 操作按钮
  &__actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
}

/* 响应式 */
@media (max-width: 576px) {
  .contact {
    &__cards {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &__card {
      padding: 24px 20px;
    }
  }
}
</style>
