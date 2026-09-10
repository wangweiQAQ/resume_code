<template>
  <!-- 技能板块 -->
  <section id="skills" class="skills section">
    <div class="container">
      <!-- 标题 -->
      <div class="skills__header fade-in-up" :class="{ 'is-visible': isVisible }">
        <h2 class="section-title">专业技能</h2>
        <p class="section-subtitle">4年前端开发积累，持续学习，不断进步</p>
      </div>

      <!-- 技能等级说明 1精通，2熟练，3掌握，4了解，5入门-->
      <div class="skills__legend fade-in-up" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.1s">
        <div class="skills__legend-item">
          <span class="skills__legend-dot" style="background: var(--skill-Level1)"></span>
          <span>精通 (90%+)</span>
        </div>
        <div class="skills__legend-item">
          <span class="skills__legend-dot" style="background: var(--skill-Level2)"></span>
          <span>熟练 (75%+)</span>
        </div>
        <div class="skills__legend-item">
          <span class="skills__legend-dot" style="background: var(--skill-Level3)"></span>
          <span>掌握 (65%+)</span>
        </div>
        <div class="skills__legend-item">
          <span class="skills__legend-dot" style="background: var(--skill-Level4)"></span>
          <span>了解 (40%+)</span>
        </div>
      </div>

      <!-- 技能分类卡片 -->
      <div class="skills__grid">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.title"
          class="skills__card glass-effect fade-in-up"
          :class="{ 'is-visible': isVisible }"
          :style="{ transitionDelay: `${index * 0.1 + 0.15}s` }"
        >
          <!-- 卡片标题 -->
          <div class="skills__card-header">
            <span class="skills__card-icon">{{ category.icon }}</span>
            <h3 class="skills__card-title">{{ category.title }}</h3>
          </div>

          <!-- 技能进度条列表 -->
          <div class="skills__progress-list">
            <div
              v-for="(skill, skillIndex) in category.skills"
              :key="skill.name"
              class="skills__progress-item"
              :style="{ animationDelay: `${skillIndex * 0.1}s` }"
            >
              <div class="skills__progress-header">
                <span class="skills__progress-name">{{ skill.name }}</span>
                <span class="skills__progress-percent" :class="`skills__progress-percent--${skill.level}`">
                  {{ getSkillPercent(skill.level) }}%
                </span>
              </div>
              <div class="skills__progress-bar">
                <div
                  class="skills__progress-fill"
                  :class="[`skills__progress-fill--${skill.level}`, { 'is-animate': isVisible }]"
                  :style="{ width: isVisible ? getSkillPercent(skill.level) + '%' : '0%', transitionDelay: `${index * 0.15 + skillIndex * 0.08 + 0.3}s` }"
                >
                  <span class="skills__progress-shine"></span>
                </div>
              </div>
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
const { skillCategories } = storeToRefs(resumeStore)

// 动画可见状态
const isVisible = ref(false)

/**
 * 根据技能等级获取百分比
 */
const getSkillPercent = (level: string): number => {
  switch (level) {
    case 'Level1':
      return 95
    case 'Level2':
      return 80
    case 'Level3':
      return 65
    case 'Level4':
      return 40
    default:
      return 70
  }
}

/**
 * 检测元素是否进入视口
 */
const checkVisibility = () => {
  const element = document.getElementById('skills')
  if (element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    if (rect.top < windowHeight * 0.75) {
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
.skills {
  background: var(--bg-secondary);
  position: relative;

  &__header {
    text-align: center;
  }

  // 技能等级图例
  &__legend {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 48px;
  }

  &__legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--text-tertiary);
  }

  &__legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  // 技能卡片网格
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 24px;
  }

  // 技能卡片
  &__card {
    padding: 28px;
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(22, 93, 255, 0.3);
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-light);
  }

  &__card-icon {
    font-size: 1.8rem;
  }

  &__card-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  // 技能进度条列表
  &__progress-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__progress-item {
    opacity: 0;
    transform: translateX(-10px);
    animation: slideInLeft 0.5s ease forwards;
  }

  @keyframes slideInLeft {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  &__progress-name {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  &__progress-percent {
    font-size: 0.8rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;

    &--Level1 {
      color: var(--primary-light);
    }

    &--Level2 {
      color: #10B981;
    }

    &--Level3 {
      color: #F59E0B;
    }

    &--Level4 {
      color: #999999;
    }
  }

  // 进度条轨道
  &__progress-bar {
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: 3px;
    overflow: hidden;
  }

  // 进度条填充
  &__progress-fill {
    height: 100%;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    width: 0;

    &--Level1 {
      background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
      box-shadow: 0 0 8px rgba(22, 93, 255, 0.4);
    }

    &--Level2 {
      background: linear-gradient(90deg, #059669, #10B981);
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    &--Level3 {
      background: linear-gradient(90deg, #D97706, #F59E0B);
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
    }

    &--Level4 {
      background: linear-gradient(90deg, #999999, #D9D9D9);
      box-shadow: 0 0 8px rgba(153, 153, 153, 0.4);
    }

    // &--Level5 {
    //   background: linear-gradient(90deg, #D9D9D9, #F9F9F9);
    //   box-shadow: 0 0 8px rgba(229, 229, 229, 0.4);
    // }
  }

  // 进度条闪光效果
  &__progress-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: progressShine 2s ease-in-out infinite;
    animation-delay: 1.5s;
  }

  @keyframes progressShine {
    0% { left: -100%; }
    50%, 100% { left: 150%; }
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .skills {
    &__grid {
      grid-template-columns: 1fr;
    }

    &__legend {
      gap: 20px;
      flex-wrap: wrap;
    }
  }
}
</style>
