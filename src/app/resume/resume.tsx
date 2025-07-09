'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Resume } from '@/types/app/resume'

export default ({ data }: { data: Resume }) => {
  const { personalInfo, advantages, links, skills, workExperience, projects, education } = data || {}

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <title>{`💪 ${personalInfo?.name ?? ''} - ${personalInfo?.title ?? ''}`}</title>
      <meta name="description" content={`💪 ${personalInfo?.name ?? ''} - ${personalInfo?.title ?? ''}`} />

      <div className="min-h-screen py-12 mt-[60px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white dark:!bg-black-b rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-10"
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
                src={personalInfo?.avatar}
                alt={personalInfo?.name}
                className="object-cover transition-transform group-hover:scale-110"
              />
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:!text-white mb-2">{personalInfo?.name}</h1>
              <h2 className="text-xl font-semibold text-gray-700 dark:!text-gray-300 mb-6">
                {personalInfo?.title} | {personalInfo?.age} | {personalInfo?.location}
              </h2>
              <div className="flex flex-wrap gap-6 text-gray-600 dark:!text-white">
                <a href={`tel:${personalInfo?.contact?.phone}`} className="flex items-center hover:text-blue-600 font-medium">
                  <FaPhone className="mr-2 text-blue-500" /> {personalInfo?.contact?.phone}
                </a>
                <a href={`mailto:${personalInfo?.contact?.email}`} className="flex items-center hover:text-blue-600 font-medium">
                  <FaEnvelope className="mr-2 text-blue-500" /> {personalInfo?.contact?.email}
                </a>
                <a href={personalInfo?.contact?.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 font-medium">
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
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              个人优势
            </h3>

            <div className="flex">
              <div className="text-gray-700 dark:!text-gray-300 leading-relaxed space-y-3">
                {advantages?.map((advantage, index) => (
                  <p key={index} className="text-base font-medium flex items-center">
                    <span className="text-blue-500 text-3xl mr-2">•</span>
                    <span>{advantage}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">GitHub 社区地址：</span>
                <a href={links?.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {links?.github}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">CSDN 技术博客：</span>
                <a href={links?.csdn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {links?.csdn}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">开源项目作品：</span>
                <a href={links?.project} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {links?.project}
                </a>
              </p>
            </div>
          </motion.div>

          {/* 专业技能 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              专业技能
            </h3>

            <div className="space-y-4 text-gray-600 dark:!text-gray-300">
              <div className="flex flex-col space-y-2">
                {skills?.map((skill, index) => (
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
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              工作经历
            </h3>

            <div className="space-y-4">
              {workExperience?.map((job, index) => (
                <div key={index} className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:text-blue-600    ">{job.company}</h4>
                    <p className="text-gray-600 dark:!text-gray-300 font-medium">{job.period}</p>
                  </div>
                  <p className="text-gray-700 dark:!text-gray-300 font-semibold mb-4">{job.position}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:!text-gray-300 space-y-2">
                    {job.responsibilities?.map((responsibility, i) => (
                      <li key={i} className="text-base">{responsibility}</li>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              项目经历
            </h3>

            <div className="space-y-8">
              {projects?.map((project, index) => (
                <div key={index} className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:text-blue-600    ">{project.name}</h4>
                    <p className="text-gray-600 dark:!text-gray-300 font-medium">{project.period}</p>
                  </div>
                  <p className="text-gray-700 dark:!text-gray-300 font-semibold mb-4">{project.role}</p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目描述：</h5>
                      <div className="text-gray-600 dark:!text-gray-300 text-base">
                        {Array.isArray(project.description) ? project.description.map((desc, i) => (
                          <div key={i} className="mb-2">{desc}</div>
                        )) : project.description}
                      </div>
                    </div>

                    {project.techStack && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">技术栈：</h5>
                        <div className="text-gray-600 dark:!text-gray-300 text-base">
                          {typeof project.techStack === 'string' ? project.techStack : (
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
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目亮点：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {project.highlights.map((highlight, i) => (
                            <div key={i}>• {highlight}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.links && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目地址：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Object.entries(project.links).map(([key, value]) => (
                            <div key={key}>• {key === 'preview' ? '项目预览' : key === 'website' ? '项目官网' : key === 'docs' ? '项目文档' : key === 'api' ? '项目接口' : key === 'dashboard' ? '项目后台' : key}：
                              <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium ml-2">
                                {value as string}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.repositories && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目仓库：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Object.entries(project.repositories).map(([key, value]) => (
                            <div key={key}>• {key === 'frontend' ? '前端' : key === 'admin' ? '控制端' : '后端'}：
                              <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium ml-2">
                                {value as string}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.achievements && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">业绩：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Array.isArray(project.achievements) ? project.achievements.map((achievement, i) => (
                            <div key={i}>• {achievement}</div>
                          )) : <div>• {project.achievements}</div>}
                        </div>
                      </div>
                    )}

                    {project.challenges && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目难点：</h5>
                        <div className="text-gray-600 dark:!text-gray-300 text-base">{project.challenges}</div>
                      </div>
                    )}

                    {project.responsibilities && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">主要工作：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
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
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              教育背景
            </h3>

            <div className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
              <div>
                <div className='flex justify-between items-center mb-3'>
                  <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:!text-blue-600">
                    {education?.school}
                  </h4>
                  <p className="text-gray-600 dark:!text-gray-300 font-medium">
                    {education?.major} | {education?.degree} | {education?.period}
                  </p>
                </div>

                <ul className="list-disc list-inside text-gray-600 dark:!text-gray-300 space-y-2 text-base">
                  {education?.achievements?.map((achievement, index) => (
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