'use client'

import { useState } from 'react'
import { Image } from '@heroui/react'
import NextImage from 'next/image'
import { File } from '@/types/app/file'
import { RowsPhotoAlbum, RenderImageContext, RenderImageProps } from 'react-photo-album'
import 'react-photo-album/rows.css'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

type Props = {
  albumList: File[]
}

function renderNextImage(
  { alt = '', title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
) {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`
      }}
    >
      <Image
        isBlurred
        alt={alt}
        as={NextImage}
        title={title}
        sizes={sizes}
        src={photo.src}
        height={height}
        width={width}
        placeholder={'blurDataURL' in photo ? 'blur' : undefined}
      />
    </div>
  )
}

export default (props: Props) => {
  const [index, setIndex] = useState(-1)
  const { albumList } = props
  const photos = albumList.map((item) => {
    return {
      src: item.url,
      width: item.arrt ? item.arrt.width : 1200,
      height: item.arrt ? item.arrt.height : 800
    }
  })
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={20}
        padding={20}
        render={{ image: renderNextImage }}
        onClick={({ index }) => setIndex(index)}
        rowConstraints={{ singleRowMaxHeight: 300, maxPhotos: 4 }}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  )
}
