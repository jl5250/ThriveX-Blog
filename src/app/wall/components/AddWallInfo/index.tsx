'use client'

import { useEffect, useState } from 'react'
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  RadioGroup,
  Radio
} from '@heroui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Wall, Cate } from '@/types/app/wall'
import { addWallDataAPI, getCateListAPI } from '@/api/wall'
import { Bounce, toast, ToastContainer, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdOutlineAdd, MdPerson, MdEmail } from 'react-icons/md'
import { BsFillChatDotsFill } from 'react-icons/bs'

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce
}

export default () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // 获取留言分类列表
  const [cateList, setCateList] = useState<Cate[]>([])
  const getCateList = async () => {
    const { data } = (await getCateListAPI()) || { data: [] as Cate[] }
    setCateList(data?.filter((item) => item.id !== 1))
  }
  useEffect(() => {
    getCateList()
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
    reset
  } = useForm<Wall>({ defaultValues: {}, mode: 'onChange' })
  const [contentCount, setContentCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Wall> = async (data) => {
    setLoading(true)
    const { code, message } = (await addWallDataAPI({
      ...data,
      createTime: Date.now().toString()
    })) || { code: 0, message: '' }
    setLoading(false)
    if (code !== 200) return toast.error(message, toastConfig)
    toast.success('🎉 提交成功, 请等待审核!', toastConfig)
    onOpenChange()
    reset()
    // 可在此处触发父组件刷新留言列表
  }

  // ESC关闭弹窗
  useEffect(() => {
    if (!isOpen) {
      reset()
      setContentCount(0)
    }
  }, [isOpen, reset])

  // 表单样式
  const inputWrapper = 'hover:!border-primary group-data-[focus=true]:border-primary rounded-md'

  return (
    <>
      <div
        className="
          flex justify-center items-center w-[70px] h-[70px] rounded-full
          bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400
          shadow-lg cursor-pointer z-50
          transition-all duration-200
          hover:scale-110 hover:shadow-[0_0_20px_#a78bfa]
          active:scale-95
          border-4 border-white/30
          backdrop-blur-md
          group
        "
        onClick={onOpen}
        aria-label="添加留言"
      >
        <MdOutlineAdd
          className="
            text-white text-5xl drop-shadow-lg
            transition-transform duration-200
            group-hover:rotate-90
          "
        />
      </div>

      <Modal
        size="lg"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>
                  <BsFillChatDotsFill className="inline text-primary mr-2" />
                  添加留言
                </span>
              </ModalHeader>

              <ModalBody>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: '请输入留言内容',
                    minLength: { value: 5, message: '内容至少5个字' },
                    maxLength: { value: 200, message: '内容不能超过200字' }
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <Textarea
                        {...field}
                        label="留言内容"
                        variant="bordered"
                        placeholder="示例：你好呀！"
                        isInvalid={!!errors.content?.message}
                        errorMessage={errors.content?.message}
                        onBlur={() => trigger('content')}
                        onChange={(e) => {
                          field.onChange(e)
                          setContentCount(e.target.value.length)
                        }}
                        classNames={{ inputWrapper: `pl-10 ${inputWrapper}` }}
                        aria-label="留言内容"
                        maxLength={200}
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400 select-none">
                        {contentCount}/200
                      </span>
                    </div>
                  )}
                />

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />
                      <Input
                        {...field}
                        type="text"
                        label="你的名称（选填）"
                        variant="bordered"
                        placeholder="示例：宇阳"
                        isInvalid={!!errors.name?.message}
                        errorMessage={errors.name?.message}
                        onBlur={() => trigger('name')}
                        classNames={{ inputWrapper: 'pl-10 ' + inputWrapper }}
                        aria-label="你的名称"
                      />
                    </div>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$/,
                      message: '邮箱格式不正确'
                    }
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />
                      <Input
                        {...field}
                        type="text"
                        label="你的邮箱（选填）"
                        variant="bordered"
                        placeholder="示例：3311118881@qq.com"
                        isInvalid={!!errors.email?.message}
                        errorMessage={errors.email?.message}
                        onBlur={() => trigger('email')}
                        classNames={{ inputWrapper: 'pl-10 ' + inputWrapper }}
                        aria-label="你的邮箱"
                      />
                    </div>
                  )}
                />

                <Controller
                  name="cateId"
                  control={control}
                  rules={{ required: '请选择留言分类' }}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        label="留言分类"
                        variant="bordered"
                        placeholder={
                          cateList?.length ? '示例：想对我说的话' : '暂无分类，请联系管理员'
                        }
                        isInvalid={!!errors.cateId?.message}
                        errorMessage={errors.cateId?.message}
                        classNames={{
                          trigger:
                            'hover:!border-primary data-[focus=true]:!border-primary data-[open=true]:!border-primary rounded-md'
                        }}
                        aria-label="留言分类"
                        disabled={!cateList?.length}
                      >
                        {cateList?.map((item) => (
                          <SelectItem key={item.id}>{item.name}</SelectItem>
                        ))}
                      </Select>
                    </>
                  )}
                />

                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      label="留言墙颜色"
                      defaultValue="#ffe3944d"
                      className="flex mt-3 [&>span]:text-sm [&>span]:text-center [&>div]:flex-row [&>div>label]:mx-1 [&>div>label]:flex-row-reverse [&>div>label>div]:ml-0 [&>div>label>div]:mr-2"
                      aria-label="留言墙颜色"
                    >
                      {['#ffe3944d', '#fcafa24d', '#a8ed8a4d', '#caa7f74d', '#92e6f54d'].map(
                        (color) => (
                          <Radio key={color} value={color} className="">
                            <span
                              className="inline-block w-8 h-8 rounded-md"
                              style={{ background: color }}
                            ></span>
                          </Radio>
                        )
                      )}
                    </RadioGroup>
                  )}
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => handleSubmit(onSubmit)()}
                  className="w-full flex justify-center items-center"
                  isDisabled={!isValid || loading}
                  isLoading={loading}
                  aria-label="提交留言"
                >
                  {loading ? '提交中...' : '提交'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ToastContainer />
    </>
  )
}
