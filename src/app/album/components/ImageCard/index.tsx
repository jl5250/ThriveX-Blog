'use client'

import { Card, CardHeader, Image } from '@heroui/react'
import Link from 'next/link'

type Props = {
  srcData: any
  id: string
  title: string
  description: string
}

export default (props: Props) => {
  return (
    <Link
      href={`album/${props.id}?title=${props.title}&description=${props.description}`}
      className="p-6"
    >
      <Card className="h-[300px] w-[300px] motion-reduce:transition ease-in-out hover:scale-110 duration-700">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-white/60 font-base">{props.title}</p>
          <h4 className="text-white text-2xl font-sans pt-5">{props.description}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={props.srcData}
        />
      </Card>
    </Link>
  )
}
