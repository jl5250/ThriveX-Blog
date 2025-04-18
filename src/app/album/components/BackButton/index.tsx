'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'
import { TiArrowBack } from 'react-icons/ti'

export default () => {
  return (
    <Link href="/album">
      <Button color="success" endContent={<TiArrowBack />}>
        返回
      </Button>
    </Link>
  )
}
