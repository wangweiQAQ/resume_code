<template>
  <!-- 顶部导航栏 - 固定定位 -->
  <nav class="navbar" :class="{ 'is-scrolled': isScrolled, 'is-mobile-open': isMobileOpen }">
    <div class="navbar__inner container">
      <!-- Logo / 姓名 -->
      <a href="#hero" class="navbar__logo" @click="scrollToSection('hero')">
        <span class="navbar__logo-icon">W</span>
        <span class="navbar__logo-text">王望阳</span>
      </a>

      <!-- 桌面端导航菜单 -->
      <ul class="navbar__menu">
        <li v-for="item in navItems" :key="item.id" class="navbar__item">
          <a
            :href="`#${item.id}`"
            class="navbar__link"
            :class="{ 'is-active': activeSection === item.id }"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- 移动端菜单按钮 -->
      <button
        class="navbar__toggle"
        :class="{ 'is-active': isMobileOpen }"
        @click="toggleMobileMenu"
        aria-label="菜单"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <div class="navbar__mobile-menu" v-show="isMobileOpen">
      <ul class="navbar__mobile-list">
        <li v-for="item in navItems" :key="item.id" class="navbar__mobile-item">
          <a
            :href="`#${item.id}`"
            class="navbar__mobile-link"
            :class="{ 'is-active': activeSection === item.id }"
            @click.prevent="handleMobileNavClick(item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'

// 使用 resume store
const resumeStore = useResumeStore()
const { navItems } = storeToRefs(resumeStore)

// 滚动状态
const isScrolled = ref(false)
// 当前激活的导航项
const activeSection = ref('hero')
// 移动端菜单展开状态
const isMobileOpen = ref(false)

/**
 * 处理滚动事件
 * 1. 检测是否滚动以改变导航栏样式
 * 2. 检测当前可视区域并高亮对应导航项
 */
const handleScroll = () => {
  // 导航栏滚动样式
  isScrolled.value = window.scrollY > 50

  // 计算当前激活的板块
  const scrollPosition = window.scrollY + 100
  const sections = navItems.value.map(item => document.getElementById(item.id))

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navItems.value[i].id
      break
    }
  }
}

/**
 * 平滑滚动到指定板块
 * @param sectionId 板块ID
 */
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 64 // 减去导航栏高度
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
  isMobileOpen.value = false
}

/**
 * 移动端导航点击处理
 */
const handleMobileNavClick = (sectionId: string) => {
  scrollToSection(sectionId)
}

/**
 * 切换移动端菜单
 */
const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // 初始化检测
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
/* 导航栏容器 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  transition: all var(--transition-normal);

  // 滚动后的样式
  &.is-scrolled {
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-light);
    box-shadow: var(--shadow-md);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  // Logo 区域
  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: var(--primary-gradient);
      border-radius: var(--radius-sm);
      color: #fff;
      font-weight: 800;
      font-size: 1.1rem;
    }

    &:hover {
      color: var(--text-primary);
    }
  }

  // 桌面端菜单
  &__menu {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__item {
    position: relative;
  }

  &__link {
    display: block;
    padding: 8px 16px;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    cursor: pointer;

    &:hover {
      color: var(--text-primary);
      background: rgba(22, 93, 255, 0.1);
    }

    &.is-active {
      color: var(--primary-light);
      background: rgba(22, 93, 255, 0.15);

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
      }
    }
  }

  // 移动端菜单按钮
  &__toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 20px;
    padding: 0;

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all var(--transition-fast);
      transform-origin: center;
    }

    &.is-active {
      span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }

  // 移动端菜单
  &__mobile-menu {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-light);
    padding: 16px;
  }

  &__mobile-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__mobile-link {
    display: block;
    padding: 12px 16px;
    color: var(--text-secondary);
    font-size: 1rem;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);

    &:hover,
    &.is-active {
      color: var(--primary-light);
      background: rgba(22, 93, 255, 0.15);
    }
  }
}

/* 响应式 - 平板及以下 */
@media (max-width: 768px) {
  .navbar {
    &__menu {
      display: none;
    }

    &__toggle {
      display: flex;
    }

    &__mobile-menu {
      display: block;
    }
  }
}
</style>
