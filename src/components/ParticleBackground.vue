<template>
  <!-- AI 粒子连线背景 - 神经网络效果 -->
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let particles: Particle[] = []
let mousePos = { x: -1000, y: -1000 }

// 粒子类
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    // 随机速度，更慢更飘逸
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    // 随机大小
    this.radius = Math.random() * 2 + 1
    // 主色调蓝色系
    const colors = ['rgba(22, 93, 255, 0.6)', 'rgba(64, 128, 255, 0.5)', 'rgba(100, 149, 237, 0.4)']
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx
    this.y += this.vy

    // 边界反弹
    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

    // 鼠标交互 - 粒子被鼠标排斥
    const dx = this.x - mousePos.x
    const dy = this.y - mousePos.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) {
      const force = (120 - dist) / 120
      this.x += (dx / dist) * force * 2
      this.y += (dy / dist) * force * 2
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()

    // 发光效果
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2)
    ctx.fillStyle = this.color.replace(/[\d.]+\)$/, '0.1)')
    ctx.fill()
  }
}

/**
 * 初始化粒子系统
 */
const initParticles = (canvas: HTMLCanvasElement) => {
  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }
}

/**
 * 绘制粒子间的连线
 */
const drawConnections = (ctx: CanvasRenderingContext2D) => {
  const maxDist = 130

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.3
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(22, 93, 255, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // 鼠标与粒子的连线
    const dx = particles[i].x - mousePos.x
    const dy = particles[i].y - mousePos.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 150) {
      const opacity = (1 - dist / 150) * 0.5
      ctx.beginPath()
      ctx.moveTo(particles[i].x, particles[i].y)
      ctx.lineTo(mousePos.x, mousePos.y)
      ctx.strokeStyle = `rgba(64, 128, 255, ${opacity})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }
  }
}

/**
 * 动画循环
 */
const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles.forEach(p => {
    p.update(canvas.width, canvas.height)
    p.draw(ctx)
  })

  // 绘制连线
  drawConnections(ctx)

  animationId = requestAnimationFrame(animate)
}

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas)
}

/**
 * 处理鼠标移动
 */
const handleMouseMove = (e: MouseEvent) => {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

/**
 * 处理鼠标离开
 */
const handleMouseLeave = () => {
  mousePos.x = -1000
  mousePos.y = -1000
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 设置画布大小
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 初始化粒子
  initParticles(canvas)

  // 开始动画
  animate()

  // 监听事件
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped lang="scss">
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;
}
</style>
