<template>
  <div class="app">
    <!-- 粒子连线背景（神经网络效果） -->
    <ParticleBackground />

    <!-- 鼠标跟随光晕效果 -->
    <CursorGlow />

    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 主要内容区域 -->
    <main class="app__main">
      <!-- Hero 首屏 -->
      <HeroSection />

      <!-- 技能板块 -->
      <SkillsSection />

      <!-- 工作经历板块 -->
      <ExperienceSection />

      <!-- 项目经历板块 -->
      <ProjectsSection />

      <!-- 联系板块 -->
      <ContactSection />
    </main>

    <!-- 页脚 -->
    <FooterSection />

    <!-- 回到顶部按钮 -->
    <Transition name="fade-up">
      <button
        v-show="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="回到顶部"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import CursorGlow from '@/components/CursorGlow.vue'

// 回到顶部按钮显示状态
const showBackToTop = ref(false)

/**
 * 处理滚动事件，控制回到顶部按钮显示
 */
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

/**
 * 平滑滚动到顶部
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

let scrollListener: (() => void) | null = null

onMounted(() => {
  scrollListener = handleScroll
  window.addEventListener('scroll', scrollListener, { passive: true })
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped lang="scss">
.app {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    position: relative;
    z-index: 2;
  }
}

// 回到顶部按钮
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: #fff;
  border-radius: 50%;
  box-shadow: var(--shadow-lg), 0 0 20px rgba(22, 93, 255, 0.4);
  transition: all var(--transition-normal);
  z-index: 999;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl), 0 0 30px rgba(22, 93, 255, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
}

// 过渡动画
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 响应式 */
@media (max-width: 768px) {
  .back-to-top {
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
