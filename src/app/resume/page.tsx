'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Metadata } from 'next'

const personalInfo = {
  personalInfo: {
    name: '王俊龙',
    title: '前端开发工程师',
    age: '24岁',
    location: '广东',
    avatar: 'https://bucket.starlightpathserver.fun/blog/record/67e6d11ce4b0dcf86abf395f.jpg',
    contact: {
      phone: '1342155****',
      email: '1662528926@qq.com',
      github: 'https://github.com/jl5250'
    }
  },
  advantages: [
    '上海市第十五届计算机应用能力大赛 三等奖、创新项目奖',
    'GitHub 开源项目作者（ThriveX CMS 建站系统）Star 900+',
    'ThriveX CMS 建站系统 计算机软件著作权（申请中）',
    '具备项目从 0 到 1 部署上线的经验：https://liuyuyang.net/',
    '利用业余时间持续输出技术文章，目前在 CSDN 累计拥有 1700+ 粉丝',
    '熟练 Spring Boot 以及 Express、Flask 等多种后端开发语言 对前后端接口联调过程中的问题能够进行清晰定位',
    '能够独当一面，从 0 到 1 构建前端项目 且 具备完整项目设计、研发、部署、全链路问题排查能力'
  ],
  links: {
    github: 'https://github.com/LiuYuYang01',
    csdn: 'https://thrive.blog.csdn.net',
    project: 'https://liuyuyang.net/'
  },
  skills: [
    '熟练 HTML5、CSS3、Flex、Scss、TailwindCSS 能够还原 UI 设计师的产品原型图',
    '熟练 TypeScript、JavaScript、jQuery、面向对象、闭包、原型链、WebApi、原生DOM',
    '熟练 Vue2 / 3 相关生态：Axios、Vuex、Pinia',
    '熟练 React18 相关生态：NextJS、Redux、Zustand、Ahooks',
    '熟练 Ant Design、NextUI、Element UI、Bootstrap 等多种组件库的使用',
    '了解 WebPack、Vite 等打包构建工具',
    '了解 Spring Boot、Spring MVC、Mybatis Plus 等主流框架',
    '了解 MySQL 关系型数据库，mongoDB 非关系型数据库',
    '熟悉 Linux 常用命令以及 Nginx 基本配置，并熟练使用可视化工具如：宝塔、1Panel 等，并有项目部署上线的经验'
  ],
  workExperience: [
    {
      company: '广州穗监工程质量安全监测中心',
      position: '技术部实习生',
      period: '2021.01-2021.02',
      responsibilities: [
        '参与并负责服务器的维护',
        '负责协助活动筹办以及准备会议的准备工作，积极举办团建活动',
        '筛选各项考核工作表，各车间相关协调事项',
        '负责协助车间内需要建立起来的相关员工守则、作业指导书等，以及车间内需要设立的表格和其他软件相关资料'
      ]
    }
  ],
  projects: [
    {
      name: '基于角色的学生成绩综合分析系统(毕设项目)',
      period: '2022.10-2023.5',
      role: '全栈工程',
      description:
        '学生管理成绩综合分析系统是可自动获取成绩并计算各类综测分数、绩点的可视化系统，本系统使用了 Python httpx 框架技术实现多段导出了多个班级的成绩，并进行一个数据的处理。用多进程的方法实现导出速度优化，并减少了阻塞的可能，提高了后续计算绩点的算法。本系统根据 Vue 的数据改变视图特性，利用可视化的方式控制前后台的数据，支持按钮及数据权限，实现了可自定义数据权限。',
      techStack: {
        deployment: '阿里云服务器部署',
        backend: 'Python Flask + MySQL',
        frontend: 'Vue CLI3 + Element UI'
      },
      highlights: [
        '基于 Ruoyi 系统二次开发，实现多班级成绩自动导出、综测计算及可视化分析',
        '【性能优化】采用 Python Httpx 多进程异步处理数据，导出效率提升 40%',
        '【组件封装】基于 ECharts 封装扇形图、柱状图等可视化组件，支持动态数据渲染',
        '【架构设计】分离数据分析与系统管理后端，结合 Axios 异步请求避免阻塞'
      ],
      repositories: {
        admin: 'https://github.com/jl5250/gduf/tree/main/gduf-java',
        backend: 'https://github.com/jl5250/gduf/tree/main/gduf-python'
      },
      achievements: '',
      challenges: ''
    },
    {
      name: '自研 UI 组件库（仿 Ant Design）',
      period: '2023.11-2023.12',
      role: '全站工程',
      description: [
        'Ant Design 作为一款成熟且广泛应用的 UI 组件库，为我的开发提供了优秀的参考范例。本项目旨在借鉴 Ant Design 的设计思路与功能架构，运用React前端技术栈，打造一款贴合自身业务需求与设计风格的UI 组件库，以提升应用开发效率与用户界面的一致性和美观性。'
      ],
      techStack: {
        deployment: '阿里云服务器部署',
        backend: '',
        frontend: 'React + TypeScript + Storybook + Sass'
      },
      links: {
        website: 'https://github.com/jl5250/loongship'
      },
      highlights: [
        '【文档驱动】使用 Storybook 实现组件本地调试及文档自动化生成',
        '参考 Ant Design 设计规范，封装 Button、Modal 等 10+ 基础组件',
        '【扩展性】集成 react-fontawesome 图标库与 react-transition-group 动画库'
      ]
    },
    {
      name: '低代码问卷系统（仿问卷星）',
      period: '2025.1.20-2025.2.23',
      role: '全栈开发',
      responsibilities: [
        '本项目使用React基本框架以及Nextjs框架进行多端开发，实现低代码应用开发方法，基于自主配置的方式，快速构建、数据编排、连接生态、中台服务。将复杂的页面UI组件进行设计与拆分。合理运用数据结构设计拆分模块，充分考虑扩展性，灵活扩展多个组件。'
      ],
      highlights: [
        '【模块化设计】使用 Redux 管理问卷画布组件状态，通过 Type 标识动态渲染组件',
        '【多端实现】B 端（React 开发），C 端（Next.js 开发）',
        '【交互优化】基于 dnd-kit 实现拖拽式组件库，支持表单属性编辑与实时预览',
        '【工程实践】Webpack 分包懒加载，首屏加载速度优化 30%',
        '【测试覆盖】结合 Storybook 生成组件文档，react-testing-library 实现单元测试'
      ],
      techStack: {
        deployment: '阿里云服务器部署',
        backend: 'Node.js + MySQL',
        frontend: 'React + Redux + Ant Design + TypeScript + Webpack'
      }
    }
  ],
  education: {
    school: '广东金融学院',
    major: '计算机科学与技术',
    degree: '本科',
    period: '2020.10-2024.06',
    achievements: ['互联网+创新创业大赛院赛金奖', '互联网+红色赛道校赛铜奖', '港澳华侨奖学金三等奖']
  }
}

export default () => {
  // 添加平滑滚动效果
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <title>王俊龙 - 前端开发工程师</title>
      <meta name="description" content="王俊龙 - 前端开发工程师" />

      <div className="min-h-screen py-12 mt-[60px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10"
        >
          {/* 个人信息头部 */}
          <div className="flex items-center space-x-8 mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-48 rounded-full overflow-hidden group"
            >
              <img
                src={personalInfo.personalInfo.avatar}
                alt={personalInfo.personalInfo.name}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {personalInfo.personalInfo.name}
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                {personalInfo.personalInfo.title} | {personalInfo.personalInfo.age} |{' '}
                {personalInfo.personalInfo.location}
              </h2>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <a
                  href={`tel:${personalInfo.personalInfo.contact.phone}`}
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <FaPhone className="mr-2 text-blue-500" />{' '}
                  {personalInfo.personalInfo.contact.phone}
                </a>
                <a
                  href={`mailto:${personalInfo.personalInfo.contact.email}`}
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <FaEnvelope className="mr-2 text-blue-500" />{' '}
                  {personalInfo.personalInfo.contact.email}
                </a>
                <a
                  href={personalInfo.personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <FaGithub className="mr-2 text-blue-500" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* 自我介绍 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              个人优势
            </h3>

            <div className="flex">
              <div className="text-gray-700 leading-relaxed space-y-3">
                {personalInfo.advantages.map((advantage, index) => (
                  <p key={index} className="text-base font-medium flex items-center">
                    <span className="text-blue-500 text-3xl mr-2">•</span>
                    <span>{advantage}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* <div className="mt-8 space-y-3">
              <p className="flex items-center">
                <span className="text-gray-800 font-semibold mr-3">GitHub 社区地址：</span>
                <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.github}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 font-semibold mr-3">CSDN 技术博客：</span>
                <a href={personalInfo.links.csdn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.csdn}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 font-semibold mr-3">开源项目作品：</span>
                <a href={personalInfo.links.project} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.project}
                </a>
              </p>
            </div> */}
          </motion.div>

          {/* 专业技能 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              专业技能
            </h3>

            <div className="space-y-4 text-gray-600">
              <div className="flex flex-col space-y-2">
                {personalInfo.skills.map((skill, index) => (
                  <p key={index} className="text-base font-medium flex items-center">
                    <span className="text-blue-500 text-3xl mr-2">•</span>
                    <span>{skill}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 工作经历 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              工作经历
            </h3>

            <div className="space-y-4">
              {personalInfo.workExperience.map((job, index) => (
                <div key={index} className="group bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {job.company}
                    </h4>
                    <p className="text-gray-600 font-medium">{job.period}</p>
                  </div>
                  <p className="text-gray-700 font-semibold mb-4">{job.position}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-base">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 项目经历 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              项目经历
            </h3>

            <div className="space-y-8">
              {personalInfo.projects.map((project, index) => (
                <div key={index} className="group bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {project.name}
                    </h4>
                    <p className="text-gray-600 font-medium">{project.period}</p>
                  </div>
                  <p className="text-gray-700 font-semibold mb-4">{project.role}</p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-bold text-gray-800 mb-3 text-base">项目描述：</h5>
                      <div className="text-gray-600 text-base">
                        {Array.isArray(project.description)
                          ? project.description.map((desc, i) => (
                              <div key={i} className="mb-2">
                                {desc}
                              </div>
                            ))
                          : project.description}
                      </div>
                    </div>

                    {project.techStack && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">技术栈：</h5>
                        <div className="text-gray-600 text-base">
                          {typeof project.techStack === 'string' ? (
                            project.techStack
                          ) : (
                            <>
                              <div className="mb-2">• 前端技术栈：{project.techStack.frontend}</div>
                              <div className="mb-2">• 后端技术栈：{project.techStack.backend}</div>
                              <div>• 项目部署：{project.techStack.deployment}</div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {project.highlights && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">项目亮点：</h5>
                        <div className="space-y-2 text-gray-600 text-base">
                          {project.highlights.map((highlight, i) => (
                            <div key={i}>• {highlight}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.links && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">项目地址：</h5>
                        <div className="space-y-2 text-gray-600 text-base">
                          {Object.entries(project.links).map(([key, value]) => (
                            <div key={key}>
                              •{' '}
                              {key === 'preview'
                                ? '项目预览'
                                : key === 'website'
                                ? '项目官网'
                                : key === 'docs'
                                ? '项目文档'
                                : key === 'api'
                                ? '项目接口'
                                : key === 'dashboard'
                                ? '项目后台'
                                : key}
                              ：
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-medium ml-2"
                              >
                                {value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.repositories && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">项目仓库：</h5>
                        <div className="space-y-2 text-gray-600 text-base">
                          {Object.entries(project.repositories).map(([key, value]) => (
                            <div key={key}>
                              • {key === 'frontend' ? '前端' : key === 'admin' ? '控制端' : '后端'}
                              ：
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-medium ml-2"
                              >
                                {value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.achievements && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">业绩：</h5>
                        <div className="space-y-2 text-gray-600 text-base">
                          {Array.isArray(project.achievements) ? (
                            project.achievements.map((achievement, i) => (
                              <div key={i}>• {achievement}</div>
                            ))
                          ) : (
                            <div>• {project.achievements}</div>
                          )}
                        </div>
                      </div>
                    )}

                    {project.challenges && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">项目难点：</h5>
                        <div className="text-gray-600 text-base">{project.challenges}</div>
                      </div>
                    )}

                    {project.responsibilities && (
                      <div>
                        <h5 className="font-bold text-gray-800 mb-3 text-base">主要工作：</h5>
                        <div className="space-y-2 text-gray-600 text-base">
                          {project.responsibilities.map((responsibility, i) => (
                            <div key={i}>• {responsibility}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 教育背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              教育背景
            </h3>

            <div className="group bg-gray-50 p-6 rounded-xl">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-bold text-gray-800 group-hover:!text-blue-600 transition-colors">
                    {personalInfo.education.school}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {personalInfo.education.major} | {personalInfo.education.degree} |{' '}
                    {personalInfo.education.period}
                  </p>
                </div>

                <ul className="list-disc list-inside text-gray-600 space-y-2 text-base">
                  {personalInfo.education.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
