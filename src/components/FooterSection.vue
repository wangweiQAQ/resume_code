<template>
  <!-- 页脚 -->
  <footer class="footer">
    <div class="container footer__container">
      <!-- 顶部信息 -->
      <div class="footer__top">
        <div class="footer__brand">
          <span class="footer__logo">W</span>
          <span class="footer__name">{{ personalInfo.name }}</span>
          <span class="footer__position">{{ personalInfo.targetPosition }}</span>
        </div>

        <div class="footer__contact">
          <a :href="`tel:${personalInfo.phone}`" class="footer__link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {{ personalInfo.phone }}
          </a>
          <a :href="`mailto:${personalInfo.email}`" class="footer__link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {{ personalInfo.email }}
          </a>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="footer__divider"></div>

      <!-- 底部版权 -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} {{ personalInfo.name }}. All rights reserved.
        </p>
        <p class="footer__tech">
          本站使用 <span>Vue3</span> + <span>TypeScript</span> + <span>Pinia</span> + <span>Vite</span> 构建
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { storeToRefs } from 'pinia'

const resumeStore = useResumeStore()
const { personalInfo } = storeToRefs(resumeStore)

// 当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  padding: 40px 0 24px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  // 顶部区域
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__logo {
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

  &__name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__position {
    font-size: 0.9rem;
    color: var(--text-tertiary);
    padding-left: 12px;
    border-left: 1px solid var(--border-light);
  }

  &__contact {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-tertiary);
    font-size: 0.9rem;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--primary-light);
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  // 分割线
  &__divider {
    height: 1px;
    background: var(--border-light);
  }

  // 底部区域
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__copyright {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  &__tech {
    font-size: 0.8rem;
    color: var(--text-muted);

    span {
      color: var(--primary-light);
      font-weight: 500;
    }
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .footer {
    padding: 32px 0 20px;

    &__top {
      flex-direction: column;
      text-align: center;
    }

    &__brand {
      flex-direction: column;
      gap: 8px;
    }

    &__position {
      padding-left: 0;
      border-left: none;
      padding-top: 8px;
      border-top: 1px solid var(--border-light);
    }

    &__bottom {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
