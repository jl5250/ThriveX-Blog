import { User } from '@/types/app/user'
import type React from 'react'

interface PersonalInfoSectionProps {
  id: string
  userData: User
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ id, userData }) => {
  const personalInfo = {
    name: '王俊龙',
    phone: '保密',
    email: '1662528926@qq.com',
    qq: '1662528926',
    location: '中国香港',
    gender: '男',
    birthdate: '2000.08.30',
    residence: '广东广州',
    education: '本科',
    university: '广东金融学院',
    major: '计算机科学与技术'
  }

  const skills =
    '熟悉C#和Java前后端开发，熟悉oracle和mysql数据库，熟悉Html和js及css前端开发，熟悉uniapp跨平台开发，熟悉windows和linux服务器部署web服务，熟悉winform和swing应用程序研发，熟悉云服务器部署建站。'

  return (
    <section
      id={id}
      className="overflow-hidden h-screen sm:h-screen md:h-screen relative bg-cover bg-center scroll-smooth"
    >
      <div className="container mx-auto">
        <h2 className="section-title">基本资料</h2>
        <p className="text-center text-gray-400 mb-16">{skills}</p>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-primary">
              <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="姓名" value={personalInfo.name} highlight />
            <InfoItem label="手机" value={personalInfo.phone} />
            <InfoItem label="性别" value={personalInfo.gender} />
            <InfoItem label="邮箱" value={personalInfo.email} />
            <InfoItem label="出生" value={personalInfo.birthdate} />
            <InfoItem label="QQ号" value={personalInfo.qq} />
            <InfoItem label="居住" value={personalInfo.residence} />
            <InfoItem label="户籍" value={personalInfo.location} />
            <InfoItem label="学历" value={personalInfo.education} />
            <InfoItem label="学校" value={personalInfo.university} />
            <InfoItem label="专业" value={personalInfo.major} />
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#home"
            className="px-8 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors"
          >
            回到顶部
          </a>
        </div>
      </div>
    </section>
  )
}

interface InfoItemProps {
  label: string
  value: string
  highlight?: boolean
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, highlight = false }) => {
  return (
    <div className="flex items-center border-b border-gray-700 py-3">
      <div className="w-20 text-gray-400">{label} |</div>
      <div className={`ml-4 ${highlight ? 'text-primary font-semibold' : ''}`}>{value}</div>
    </div>
  )
}

export default PersonalInfoSection
