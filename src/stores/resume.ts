import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义技能项类型
export interface SkillItem {
  name: string
  level: 'Level1' | 'Level2' | 'Level3' | 'Level4' // 精通/熟练/了解
}

// 定义技能分类类型
export interface SkillCategory {
  title: string
  icon: string
  skills: SkillItem[]
}

// 定义工作经历类型
export interface WorkExperience {
  company: string
  position: string
  period: string
  duties: string[]
}

// 定义项目经历类型
export interface Project {
  name: string
  role: string
  description: string
  duties: string[]
  techPoints: string[]
  techStack: string[]
  image: string
}

// 定义个人信息类型
export interface PersonalInfo {
  name: string
  age: string
  phone: string
  email: string
  yearsExperience: string
  targetPosition: string
  targetCity: string
  education: {
    school: string
    degree: string
    major: string
    period: string
  }
  intro: string
}

// 简历数据 Store
export const useResumeStore = defineStore('resume', () => {
  // 个人基本信息
  const personalInfo = ref<PersonalInfo>({
    name: '王望阳',
    age: '25岁',
    phone: '13755444691',
    email: 'log_wangwei@163.com',
    yearsExperience: '4年前端开发工程师',
    targetPosition: '前端开发工程师',
    targetCity: '深圳',
    education: {
      school: '井冈山大学',
      degree: '本科',
      major: '计算机科学与技术',
      period: '2018-2022'
    },
    intro: '热爱前端技术，专注于 Vue 生态开发，具备完整的项目生命周期经验。善于攻克前端难点，优化项目架构和用户体验，具备良好的团队协作能力和技术分享精神。'
  })

  // 技能分类数据
  const skillCategories = ref<SkillCategory[]>([
    {
      title: '框架技术',
      icon: '⚡',
      skills: [
        { name: 'Vue2', level: 'Level1' },
        { name: 'Vue3', level: 'Level1' },
        { name: 'TypeScript', level: 'Level2' },
        { name: 'Pinia', level: 'Level1' },
        { name: 'Vuex', level: 'Level1' },
        { name: 'Vue Router', level: 'Level1' },
        { name: 'ES5/ES6+', level: 'Level1' },
        { name: 'React', level: 'Level3' }
      ]
    },
    {
      title: 'AI工具',
      icon: '🤖',
      skills: [
        { name: 'Trae', level: 'Level1' },
        { name: 'Claude', level: 'Level1' },
        { name: 'Cursor', level: 'Level2' },
        { name: 'ChatGPT', level: 'Level2' },
      ]
    },
    {
      title: '跨端开发',
      icon: '📱',
      skills: [
        { name: 'UniApp', level: 'Level1' },
        { name: '微信原生小程序', level: 'Level1' },
        // { name: '多端适配', level: 'Level1' },
        // { name: '性能优化', level: 'Level1' }
      ]
    },
    {
      title: 'UI组件',
      icon: '🎨',
      skills: [
        { name: 'Element Plus', level: 'Level1' },
        { name: 'Vant', level: 'Level1' },
        { name: 'uView UI', level: 'Level1' },
        { name: 'Ant Design', level: 'Level2' },
      ]
    },
    {
      title: '工程化',
      icon: '🔧',
      skills: [
        { name: 'Vite', level: 'Level1' },
        { name: 'Webpack', level: 'Level1' },
        { name: '请求封装', level: 'Level1' },
        { name: '接口联调', level: 'Level1' },
        { name: '性能优化', level: 'Level1' }
      ]
    },
    {
      title: '可视化/样式',
      icon: '📊',
      skills: [
        { name: 'ECharts', level: 'Level1' },
        { name: 'Canvas', level: 'Level2' },
        { name: 'Sass/Scss', level: 'Level1' },
        { name: 'Flex布局', level: 'Level1' },
        { name: 'Grid布局', level: 'Level1' },
        { name: '响应式布局', level: 'Level1' }
      ]
    },
    {
      title: '其他技能',
      icon: '💡',
      skills: [
        { name: 'Node.js', level: 'Level4' },
        { name: 'MySQL', level: 'Level4' },
        // { name: '权限路由', level: 'Level1' },
        // { name: '分包加载', level: 'Level1' },
        // { name: '组件化开发', level: 'Level1' }
      ]
    }
  ])

  // 工作经历数据
  const workExperiences = ref<WorkExperience[]>([
    {
      company: '深圳益邦智能有限公司',
      position: '前端开发负责人',
      period: '2024.07 - 2026.04',
      duties: [
        '担任价值云平台前端主要负责人，主导需求改动、研发、自测、上线、复盘全流程落地',
        '负责ERP后台管理系统、App内嵌H5开发迭代维护',
        '参与内部UI组件库设计开发',
        '攻克前端难点，优化项目架构和用户体验'
      ]
    },
    {
      company: '深圳市小块头科技有限公司',
      position: '前端开发工程师',
      period: '2023.04 - 2024.07',
      duties: [
        '参与产品需求讨论',
        '配合产品、后端完成功能模块开发',
        '按设计文档完成开发计划',
        '参与技术选型',
        '做页面性能优化与交互提升'
      ]
    },
    {
      company: '杭州常青网络科技有限公司',
      position: '前端开发工程师',
      period: '2022.03 - 2023.03',
      duties: [
        '遵循开发规范编写高质量代码',
        '公共组件封装提升复用',
        '团队协作，分享技术经验',
        '跟进前端新技术，推动框架革新'
      ]
    }
  ])

  // 项目经历数据
  const projects = ref<Project[]>([
    {
      name: '益邦智联app(内嵌H5)',
      role: '前端开发负责人',
      description: '智能终端应用软件，数据可视化，查看实时历史数据，轻量省流。',
      duties: [
        '项目筹备排期风险评估，参与方案评审',
        '页面组件开发，多机型适配调试',
        '自测跟进测试，上线验证',
        '项目验收复盘'
      ],
      techPoints: [
        '原生APP壳+内嵌H5混合开发，热更新',
        '一套代码多端复用',
        '动态公共样式支持APP换皮',
        '离线包实现页面秒开，降低白屏崩溃率'
      ],
      techStack: ['Vue3全家桶', 'vantUI', 'vconsole', '微信Paypal支付', 'Echarts', 'Sass'],
      image: 'https://picsum.photos/seed/project1/600/400'
    },
    {
      name: '价值云(valueclouds)ERP后台管理系统',
      role: '前端开发工程师',
      description: '模块化物联网ERP系统，设备接入、资源管理、运维、权限、数据统计。',
      duties: [
        '前期方案评审排期',
        '页面组件开发',
        '自测、测试跟进上线',
        '项目复盘'
      ],
      techPoints: [
        'Webpack搭建架构，通用组件封装',
        'ECharts大屏可视化',
        '高德/谷歌地图API',
        'WebSocket实时数据',
        '路由/组件懒加载、图片懒加载、按需引入、缓存、Webpack打包压缩等性能优化'
      ],
      techStack: ['Vue全家桶', 'Webpack', 'ElementUI', '高德/谷歌地图api', '微信Paypal支付', 'Echarts', 'Sass'],
      image: 'https://picsum.photos/seed/project2/600/400'
    },
    {
      name: '小块头锂电风向标小程序',
      role: '前端开发工程师',
      description: '锂电池信息查询交易小程序，支持购买会员。',
      duties: [
        '页面组件开发，接口对接',
        '性能优化，协同产品UI按时交付'
      ],
      techPoints: [
        'UniApp搭建，封装uni.request',
        '二次封装瀑布流实现触底懒加载',
        'Echarts可视化',
        'Canvas海报水印',
        '微信登录、会员权限、支付流程',
        '分包、图片懒加载、包体积优化'
      ],
      techStack: ['UniApp', 'Vue全家桶', 'uViewUI', 'Echarts', 'Sass'],
      image: 'https://picsum.photos/seed/project3/600/400'
    },
    {
      name: '小块头锂电风向标后台管理系统',
      role: '前端开发工程师',
      description: '配套小程序的后台管理系统，用于运营维护。',
      duties: [
        '界面开发、交互实现',
        '数据联调、代码优化维护'
      ],
      techPoints: [
        'Vue+Element-UI，公共组件二次封装',
        'ECharts图表组件封装',
        'Axios请求拦截响应拦截封装',
        '动态路由router.addRoutes、路由守卫实现权限控制',
        'keep-alive、路由懒加载、webpack打包优化'
      ],
      techStack: ['Vue3全家桶', 'TypeScript', 'Pinia', 'Vite', 'Axios', 'Element-Ui', 'Echarts', 'Sass'],
      image: 'https://picsum.photos/seed/project4/600/400'
    },
    {
      name: '杭州女装网小程序/APP',
      role: '前端开发工程师',
      description: '女装线上购物平台。',
      duties: [
        '小程序与APP前端开发',
        '页面性能优化，团队协作交付'
      ],
      techPoints: [
        'UniApp搭建，Grid布局',
        '二次封装轮播、瀑布流',
        '购物车组件封装',
        '微信登录、支付'
      ],
      techStack: ['UniApp', 'Vue全家桶', 'VantUi', 'Sass'],
      image: 'https://picsum.photos/seed/project5/600/400'
    }
  ])

  // 导航菜单
  const navItems = ref([
    { id: 'hero', label: '首页' },
    { id: 'skills', label: '技能' },
    { id: 'experience', label: '工作经历' },
    { id: 'projects', label: '项目' },
    { id: 'contact', label: '联系' }
  ])

  return {
    personalInfo,
    skillCategories,
    workExperiences,
    projects,
    navItems
  }
})
