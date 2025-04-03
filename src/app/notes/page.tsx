import Slide from '@/components/Slide'
import { getUserDataAPI } from '@/api/user'
import { User } from '@/types/app/user'
import { Divider, Spacer } from '@heroui/react'
import LinkScroll from './components/LinkScroll'
import WheelScroll from './components/WheelScroll'
import PersonalInfoSection from './components/PersonalInfoSection'

export default async () => {
  const { data: user } = (await getUserDataAPI()) || { data: {} as User }

  return (
    <>
      <LinkScroll />
      <WheelScroll userData={user} />
      <PersonalInfoSection id="panel2" userData={user} />
    </>
  )
}
