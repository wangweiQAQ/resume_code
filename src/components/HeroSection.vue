<template>
  <!-- Hero 首屏区域 -->
  <section id="hero" class="hero">
    <!-- AI 代码流装饰 - 左侧 -->
    <div class="hero__code-stream hero__code-stream--left">
      <div class="hero__code-line" v-for="n in 15" :key="'l'+n" :style="{ animationDelay: `${n * 0.3}s` }">
        {{ codeSnippets[(n - 1) % codeSnippets.length] }}
      </div>
    </div>

    <!-- AI 代码流装饰 - 右侧 -->
    <div class="hero__code-stream hero__code-stream--right">
      <div class="hero__code-line" v-for="n in 15" :key="'r'+n" :style="{ animationDelay: `${n * 0.4}s` }">
        {{ codeSnippets[(n + 3) % codeSnippets.length] }}
      </div>
    </div>

    <div class="container hero__container">
      <div class="hero__content fade-in-up" :class="{ 'is-visible': isVisible }">
        <!-- 问候语 + AI 标签 -->
        <div class="hero__greeting-row">
          <p class="hero__greeting">👋 你好，我是</p>
          <span class="hero__ai-badge">
            <span class="hero__ai-dot"></span>
            AI 赋能开发
          </span>
        </div>

        <!-- 姓名 -->
        <h1 class="hero__name">
          <span class="hero__name-text">{{ personalInfo.name }}</span>
          <span class="hero__name-shine"></span>
        </h1>

        <!-- 岗位 - 打字机效果 -->
        <h2 class="hero__title">
          <TypeWriter
            v-if="isVisible"
            :text="personalInfo.yearsExperience"
            :speed="100"
            :delay="800"
          />
        </h2>

        <!-- 简介 -->
        <p class="hero__intro">{{ personalInfo.intro }}</p>

        <!-- 数据统计 -->
        <div class="hero__stats">
          <div class="hero__stat-item">
            <span class="hero__stat-number">
              <CountUp ref="countUpExp" :end-value="4" :duration="1500" suffix="+" />
            </span>
            <span class="hero__stat-label">年经验</span>
          </div>
          <div class="hero__stat-divider"></div>
          <div class="hero__stat-item">
            <span class="hero__stat-number">
              <CountUp ref="countUpProjects" :end-value="5" :duration="1500" suffix="+" :delay="300" />
            </span>
            <span class="hero__stat-label">项目经历</span>
          </div>
          <div class="hero__stat-divider"></div>
          <div class="hero__stat-item">
            <span class="hero__stat-number">
              <CountUp ref="countUpSkills" :end-value="30" :duration="1800" suffix="+" :delay="600" />
            </span>
            <span class="hero__stat-label">技术栈</span>
          </div>
        </div>

        <!-- 个人信息标签 -->
        <div class="hero__tags">
          <span class="hero__tag hero__tag--primary">
            <span class="hero__tag-icon">📍</span>
            期望城市：{{ personalInfo.targetCity }}
          </span>
          <span class="hero__tag">
            <span class="hero__tag-icon">🎓</span>
            {{ personalInfo.education.school }}
          </span>
          <span class="hero__tag">
            <span class="hero__tag-icon">📅</span>
            {{ personalInfo.age }}
          </span>
        </div>

        <!-- 操作按钮 -->
        <div class="hero__actions">
          <a href="#contact" class="btn btn-primary hero__btn-primary" @click.prevent="scrollToContact">
            <span>联系我</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <!-- <button class="btn btn-outline" @click="downloadResume">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>下载简历 PDF</span>
          </button> -->
        </div>
      </div>

      <!-- 右侧头像/AI 装饰区域 -->
      <div class="hero__visual fade-in-up" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.2s">
        <div class="hero__avatar-wrapper">
          <!-- 外圈旋转光环 -->
          <div class="hero__ring hero__ring--1"></div>
          <div class="hero__ring hero__ring--2"></div>
          <div class="hero__ring hero__ring--3"></div>

          <!-- AI 节点装饰 -->
          <div class="hero__ai-node" v-for="n in 6" :key="n" :style="getNodeStyle(n)">
            <div class="hero__ai-node-dot"></div>
            <div class="hero__ai-node-line" :style="getNodeLineStyle(n)"></div>
          </div>

          <!-- 头像 -->
          <div class="hero__avatar">
            <div class="hero__avatar-icon">👨‍💻</div>
            <!-- AI 扫描线效果 -->
            <div class="hero__scan-line"></div>
          </div>

          <!-- 浮动装饰卡片 -->
          <div class="hero__float-card hero__float-card--1">
            <span class="hero__float-icon">Vue</span>
            <span class="hero__float-text">精通</span>
          </div>
          <div class="hero__float-card hero__float-card--2">
            <span class="hero__float-icon">🤖 AI</span>
            <span class="hero__float-text">提效</span>
          </div>
          <div class="hero__float-card hero__float-card--3">
            <span class="hero__float-icon">📱</span>
            <span class="hero__float-text">跨端</span>
          </div>
          <div class="hero__float-card hero__float-card--4">
            <span class="hero__float-icon">⚡</span>
            <span class="hero__float-text">性能</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <div class="hero__scroll-hint" @click="scrollToSkills">
      <span>向下滚动探索</span>
      <div class="hero__scroll-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'
import TypeWriter from './TypeWriter.vue'
import CountUp from './CountUp.vue'

const resumeStore = useResumeStore()
const { personalInfo } = storeToRefs(resumeStore)

// 动画可见状态
const isVisible = ref(false)

// CountUp 组件引用
const countUpExp = ref<InstanceType<typeof CountUp> | null>(null)
const countUpProjects = ref<InstanceType<typeof CountUp> | null>(null)
const countUpSkills = ref<InstanceType<typeof CountUp> | null>(null)

// AI 代码片段
const codeSnippets = [
  'const app = createApp(App)',
  'app.use(pinia)',
  'const user = ref(null)',
  'async function fetchData()',
  'computed(() => state.value)',
  'watch(deps, callback)',
  'onMounted(() => {})',
  'provide/inject pattern',
  'v-for="item in list"',
  'v-bind:class="{}"',
  'emit(\'update\', val)',
  'defineProps<{}>()',
  'reactive({ ... })',
  'shallowRef(obj)',
  'toRaw(proxy)',
  'markRaw(obj)',
  'customRef(() => {})',
  'effectScope()'
]

/**
 * 获取 AI 节点位置样式
 */
const getNodeStyle = (n: number) => {
  const angle = (n - 1) * 60 * (Math.PI / 180)
  const radius = 130
  const x = Math.cos(angle) * radius + 160
  const y = Math.sin(angle) * radius + 160
  return {
    left: `${x}px`,
    top: `${y}px`,
    animationDelay: `${n * 0.3}s`
  }
}

/**
 * 获取节点连接线样式
 */
const getNodeLineStyle = (n: number) => {
  const angle = (n - 1) * 60
  return {
    transform: `rotate(${angle + 90}deg)`
  }
}

/**
 * 滚动到联系板块
 */
const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * 滚动到技能板块
 */
const scrollToSkills = () => {
  const element = document.getElementById('skills')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * 下载简历（占位功能）
 */
// const downloadResume = () => {
//   alert('简历 PDF 下载功能 - 请在此处配置真实的简历文件链接')
// }

// 组件挂载后触发动画
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    // 延迟触发数字递增动画
    nextTick(() => {
      setTimeout(() => {
        countUpExp.value?.startAnimation()
        countUpProjects.value?.startAnimation()
        countUpSkills.value?.startAnimation()
      }, 1200)
    })
  }, 100)
})
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
  overflow: hidden;

  // AI 代码流装饰
  &__code-stream {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0;
    overflow: hidden;
    opacity: 0.15;
    pointer-events: none;

    &--left {
      left: 0;
      align-items: flex-start;
      padding-left: 20px;
    }

    &--right {
      right: 0;
      align-items: flex-end;
      padding-right: 20px;
    }
  }

  &__code-line {
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.75rem;
    color: var(--primary-light);
    white-space: nowrap;
    animation: codeFloat 8s linear infinite;
    opacity: 0;
  }

  @keyframes codeFloat {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  &__container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  // 左侧内容
  &__content {
    max-width: 600px;
  }

  &__greeting-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  &__greeting {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin: 0;
  }

  // AI 标签
  &__ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 20px;
    font-size: 0.75rem;
    color: #10B981;
    font-weight: 500;
  }

  &__ai-dot {
    width: 6px;
    height: 6px;
    background: #10B981;
    border-radius: 50%;
    animation: pulse-green 2s ease-in-out infinite;
  }

  @keyframes pulse-green {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
    50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  }

  &__name {
    position: relative;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 16px;
    display: inline-block;
    overflow: hidden;

    &-text {
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-light) 50%, var(--text-primary) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    &-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: shine 3s ease-in-out infinite;
    }
  }

  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  @keyframes shine {
    0% { left: -100%; }
    50%, 100% { left: 150%; }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 24px;
    min-height: 2.2rem;

    :deep(.typewriter__text) {
      color: var(--primary-light);
      font-weight: 600;
    }
  }

  &__intro {
    font-size: 1.05rem;
    color: var(--text-tertiary);
    line-height: 1.8;
    margin-bottom: 24px;
  }

  // 数据统计
  &__stats {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 28px;
    padding: 20px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(8px);
  }

  &__stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  &__stat-number {
    font-size: 2rem;
    font-weight: 700;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  &__stat-label {
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }

  &__stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border-light);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 36px;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    color: var(--text-secondary);
    backdrop-filter: blur(8px);
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }

    &--primary {
      background: rgba(22, 93, 255, 0.1);
      border-color: rgba(22, 93, 255, 0.3);
      color: var(--primary-light);
    }

    &-icon {
      font-size: 1rem;
    }
  }

  &__actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__btn-primary {
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }
  }

  // 右侧视觉区域
  &__visual {
    display: flex;
    justify-content: center;
  }

  &__avatar-wrapper {
    position: relative;
    width: 340px;
    height: 340px;
  }

  // 旋转光环
  &__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 1px dashed rgba(22, 93, 255, 0.3);
    transform: translate(-50%, -50%);

    &--1 {
      width: 220px;
      height: 220px;
      animation: rotate 20s linear infinite;
    }

    &--2 {
      width: 280px;
      height: 280px;
      animation: rotate 30s linear infinite reverse;
      border-style: dotted;
      border-color: rgba(64, 128, 255, 0.2);
    }

    &--3 {
      width: 340px;
      height: 340px;
      animation: rotate 40s linear infinite;
      border-color: rgba(100, 149, 237, 0.15);
    }
  }

  @keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  // AI 节点
  &__ai-node {
    position: absolute;
    width: 8px;
    height: 8px;
    animation: nodePulse 2s ease-in-out infinite;
  }

  &__ai-node-dot {
    width: 100%;
    height: 100%;
    background: var(--primary-light);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(22, 93, 255, 0.6);
  }

  &__ai-node-line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, rgba(22, 93, 255, 0.4), transparent);
    transform-origin: left center;
  }

  @keyframes nodePulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.6;
    }
  }

  &__avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: var(--primary-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-xl), 0 0 40px rgba(22, 93, 255, 0.3);
    overflow: hidden;
    animation: avatarFloat 4s ease-in-out infinite;

    &-icon {
      font-size: 4.5rem;
      position: relative;
      z-index: 2;
    }
  }

  // 扫描线效果
  &__scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: scan 3s linear infinite;
    z-index: 3;
  }

  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }

  @keyframes avatarFloat {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-10px); }
  }

  // 浮动卡片
  &__float-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 14px;
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 10;

    &--1 {
      top: 10px;
      left: -10px;
      animation: float-card 4s ease-in-out infinite;
    }

    &--2 {
      top: 0;
      right: 0;
      animation: float-card 5s ease-in-out infinite 1s;
    }

    &--3 {
      bottom: 40px;
      left: -20px;
      animation: float-card 4.5s ease-in-out infinite 0.5s;
    }

    &--4 {
      bottom: 20px;
      right: -10px;
      animation: float-card 3.5s ease-in-out infinite 1.5s;
    }
  }

  &__float-icon {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary-light);
  }

  &__float-text {
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  // 滚动提示
  &__scroll-hint {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--text-tertiary);
    font-size: 0.85rem;
    cursor: pointer;
    transition: color var(--transition-fast);
    z-index: 10;

    &:hover {
      color: var(--primary-light);
    }
  }

  &__scroll-icon {
    animation: bounce 2s infinite;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}

@keyframes float-card {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* 响应式 */
@media (max-width: 1200px) {
  .hero {
    &__code-stream {
      display: none;
    }
  }
}

@media (max-width: 992px) {
  .hero {
    &__container {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
    }

    &__content {
      max-width: 100%;
      order: 2;
    }

    &__visual {
      order: 1;
    }

    &__greeting-row {
      justify-content: center;
    }

    &__stats {
      justify-content: center;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    &__tags {
      justify-content: center;
    }

    &__actions {
      justify-content: center;
    }

    &__name {
      font-size: 2.8rem;
    }

    &__avatar-wrapper {
      width: 280px;
      height: 280px;
    }

    &__ring {
      &--1 { width: 180px; height: 180px; }
      &--2 { width: 230px; height: 230px; }
      &--3 { width: 280px; height: 280px; }
    }

    &__avatar {
      width: 140px;
      height: 140px;

      &-icon {
        font-size: 3.5rem;
      }
    }
  }
}

@media (max-width: 576px) {
  .hero {
    &__name {
      font-size: 2.2rem;
    }

    &__title {
      font-size: 1.2rem;
      min-height: 1.8rem;
    }

    &__intro {
      font-size: 0.95rem;
    }

    &__stats {
      padding: 16px;
      gap: 16px;
    }

    &__stat-number {
      font-size: 1.5rem;
    }

    &__avatar-wrapper {
      width: 240px;
      height: 240px;
    }

    &__ring {
      &--1 { width: 150px; height: 150px; }
      &--2 { width: 195px; height: 195px; }
      &--3 { width: 240px; height: 240px; }
    }

    &__avatar {
      width: 120px;
      height: 120px;

      &-icon {
        font-size: 3rem;
      }
    }

    &__ai-node {
      display: none;
    }

    &__float-card {
      padding: 6px 10px;

      &--1 {
        top: 5px;
        left: -5px;
      }

      &--2 {
        top: 0;
        right: -5px;
      }

      &--3 {
        bottom: 30px;
        left: -10px;
      }

      &--4 {
        bottom: 10px;
        right: -5px;
      }
    }
  }
}
</style>
