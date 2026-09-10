<template>
  <!-- 工作经历板块 -->
  <section id="experience" class="experience section">
    <div class="container">
      <!-- 标题 -->
      <div class="experience__header fade-in-up" :class="{ 'is-visible': isVisible }">
        <h2 class="section-title">工作经历</h2>
        <p class="section-subtitle">4年前端开发经验，从开发工程师到负责人的成长之路</p>
      </div>

      <!-- 时间线 -->
      <div class="experience__timeline">
        <div
          v-for="(exp, index) in workExperiences"
          :key="exp.company"
          class="experience__item fade-in-up"
          :class="{ 'is-visible': isVisible }"
          :style="{ transitionDelay: `${index * 0.2 + 0.1}s` }"
        >
          <!-- 时间线节点 -->
          <div class="experience__timeline-dot">
            <div class="experience__timeline-dot-inner"></div>
          </div>

          <!-- 时间线连接线 -->
          <div v-if="index < workExperiences.length - 1" class="experience__timeline-line"></div>

          <!-- 内容卡片 -->
          <div class="experience__card glass-effect">
            <!-- 卡片头部 -->
            <div class="experience__card-header">
              <div class="experience__company-info">
                <h3 class="experience__company">{{ exp.company }}</h3>
                <span class="experience__position">{{ exp.position }}</span>
              </div>
              <span class="experience__period">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ exp.period }}
              </span>
            </div>

            <!-- 职责列表 -->
            <div class="experience__duties">
              <div
                v-for="(duty, dutyIndex) in exp.duties"
                :key="dutyIndex"
                class="experience__duty-item"
              >
                <span class="experience__duty-marker"></span>
                <span class="experience__duty-text">{{ duty }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 教育经历 -->
      <div class="experience__education fade-in-up" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.7s">
        <div class="experience__education-card glass-effect">
          <div class="experience__education-icon">🎓</div>
          <div class="experience__education-content">
            <h3 class="experience__education-school">{{ personalInfo.education.school }}</h3>
            <div class="experience__education-detail">
              <span>{{ personalInfo.education.degree }} · {{ personalInfo.education.major }}</span>
              <span class="experience__education-period">{{ personalInfo.education.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'

const resumeStore = useResumeStore()
const { workExperiences, personalInfo } = storeToRefs(resumeStore)

// 动画可见状态
const isVisible = ref(false)

/**
 * 检测元素是否进入视口
 */
const checkVisibility = () => {
  const element = document.getElementById('experience')
  if (element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    if (rect.top < windowHeight * 0.8) {
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
.experience {
  position: relative;

  &__header {
    text-align: center;
  }

  // 时间线容器
  &__timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto 60px;
    padding-left: 40px;
  }

  // 时间线项目
  &__item {
    position: relative;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // 时间线节点圆点
  &__timeline-dot {
    position: absolute;
    left: -40px;
    top: 24px;
    width: 20px;
    height: 20px;
    background: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    &-inner {
      width: 10px;
      height: 10px;
      background: var(--primary-gradient);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(22, 93, 255, 0.5);
    }
  }

  // 时间线连接线
  &__timeline-line {
    position: absolute;
    left: -31px;
    top: 44px;
    width: 2px;
    height: calc(100% + 20px);
    background: linear-gradient(to bottom, var(--primary-color), transparent);
    opacity: 0.3;
  }

  // 内容卡片
  &__card {
    padding: 28px;
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);

    &:hover {
      transform: translateX(8px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(22, 93, 255, 0.3);
    }
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-light);
    gap: 16px;
  }

  &__company-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__company {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__position {
    font-size: 0.95rem;
    color: var(--primary-light);
    font-weight: 500;
  }

  &__period {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
    color: var(--text-tertiary);
    white-space: nowrap;
    padding: 6px 12px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  // 职责列表
  &__duties {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__duty-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  &__duty-marker {
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    margin-top: 8px;
    background: var(--primary-color);
    border-radius: 50%;
  }

  &__duty-text {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  // 教育经历
  &__education {
    max-width: 900px;
    margin: 0 auto;
  }

  &__education-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 28px;
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }

  &__education-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  &__education-content {
    flex: 1;
  }

  &__education-school {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  &__education-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-tertiary);
    font-size: 0.9rem;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .experience {
    &__timeline {
      padding-left: 30px;
    }

    &__timeline-dot {
      left: -30px;
      width: 16px;
      height: 16px;

      &-inner {
        width: 8px;
        height: 8px;
      }
    }

    &__timeline-line {
      left: -23px;
    }

    &__card {
      padding: 20px;
    }

    &__card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    &__period {
      align-self: flex-start;
    }

    &__education-card {
      flex-direction: column;
      text-align: center;
      gap: 12px;
      padding: 20px;
    }

    &__education-detail {
      flex-direction: column;
      gap: 4px;
    }
  }
}
</style>
