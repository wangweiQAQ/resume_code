<template>
  <!-- 项目经历板块 -->
  <section id="projects" class="projects section">
    <div class="container">
      <!-- 标题 -->
      <div class="projects__header fade-in-up" :class="{ 'is-visible': isVisible }">
        <h2 class="section-title">项目经历</h2>
        <p class="section-subtitle">参与并主导多个大型项目，涵盖ERP、小程序、APP等多端开发</p>
      </div>

      <!-- 项目卡片网格 -->
      <div class="projects__grid">
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          class="projects__card fade-in-up"
          :class="{ 'is-visible': isVisible }"
          :style="{ transitionDelay: `${index * 0.1 + 0.1}s` }"
        >
          <!-- 项目图片 -->
          <div class="projects__card-image">
            <img :src="project.image" :alt="project.name" loading="lazy" />
            <div class="projects__card-overlay">
              <span class="projects__card-role">{{ project.role }}</span>
            </div>
          </div>

          <!-- 项目内容 -->
          <div class="projects__card-content">
            <!-- 项目名称 -->
            <h3 class="projects__card-title">{{ project.name }}</h3>

            <!-- 项目简介 -->
            <p class="projects__card-desc">{{ project.description }}</p>

            <!-- 主要职责 -->
            <div class="projects__card-section">
              <h4 class="projects__card-section-title">
                <span class="projects__card-section-icon">📋</span>
                主要职责
              </h4>
              <ul class="projects__card-list">
                <li v-for="(duty, idx) in project.duties" :key="idx">
                  {{ duty }}
                </li>
              </ul>
            </div>

            <!-- 核心技术点 -->
            <div class="projects__card-section">
              <h4 class="projects__card-section-title">
                <span class="projects__card-section-icon">💡</span>
                核心技术点
              </h4>
              <ul class="projects__card-list projects__card-list--tech">
                <li v-for="(point, idx) in project.techPoints" :key="idx">
                  {{ point }}
                </li>
              </ul>
            </div>

            <!-- 技术栈标签 -->
            <div class="projects__card-stack">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="projects__stack-tag"
              >
                {{ tech }}
              </span>
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
const { projects } = storeToRefs(resumeStore)

// 动画可见状态
const isVisible = ref(false)

/**
 * 检测元素是否进入视口
 */
const checkVisibility = () => {
  const element = document.getElementById('projects')
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
.projects {
  background: var(--bg-secondary);
  position: relative;

  &__header {
    text-align: center;
  }

  // 项目卡片网格
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 28px;
  }

  // 项目卡片
  &__card {
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-normal);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl), 0 0 30px rgba(22, 93, 255, 0.15);
      border-color: rgba(22, 93, 255, 0.3);

      .projects__card-image img {
        transform: scale(1.05);
      }

      .projects__card-overlay {
        opacity: 1;
      }
    }
  }

  // 卡片图片区域
  &__card-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &__card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(10, 15, 28, 0.9) 0%, rgba(10, 15, 28, 0.3) 100%);
    display: flex;
    align-items: flex-end;
    padding: 16px;
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  &__card-role {
    display: inline-block;
    padding: 6px 14px;
    background: var(--primary-gradient);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 20px;
  }

  // 卡片内容
  &__card-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__card-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  &__card-desc {
    font-size: 0.9rem;
    color: var(--text-tertiary);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  // 卡片内容区块
  &__card-section {
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 16px;
    }
  }

  &__card-section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  &__card-section-icon {
    font-size: 1rem;
  }

  &__card-list {
    padding-left: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 16px;
      font-size: 0.85rem;
      color: var(--text-tertiary);
      line-height: 1.7;
      margin-bottom: 4px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &--tech li::before {
      background: var(--skill-familiar);
    }
  }

  // 技术栈标签
  &__card-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--border-light);
  }

  &__stack-tag {
    display: inline-block;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: var(--primary-light);
    background: rgba(22, 93, 255, 0.1);
    border: 1px solid rgba(22, 93, 255, 0.2);
    border-radius: 4px;
    transition: all var(--transition-fast);

    &:hover {
      background: rgba(22, 93, 255, 0.2);
    }
  }
}

/* 响应式 */
@media (max-width: 992px) {
  .projects {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
  }
}

@media (max-width: 576px) {
  .projects {
    &__grid {
      grid-template-columns: 1fr;
    }

    &__card-content {
      padding: 20px;
    }

    &__card-image {
      height: 180px;
    }
  }
}
</style>
