import React from 'react'
import VideoEditor from './video/VideoEditor'
import ImageEditor from './image/ImageEditor'

export const TYPE_VIDEO = 'TYPE_VIDEO'
export const TYPE_IMAGE = 'TYPE_IMAGE'

const MediaEditor = props => {
  const { type, media, src } = props
  if (!media && !src) {
    return null
  }

  switch (type) {
    case TYPE_VIDEO:
      return <VideoEditor {...props} />
    case TYPE_IMAGE:
      return <ImageEditor {...props} />
    default:
      return null
  }
}

export default MediaEditor
