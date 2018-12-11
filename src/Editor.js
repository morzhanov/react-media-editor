import React from 'react'
import VideoEditor from './video/VideoEditor'
import ImageEditor from './image/ImageEditor'
import AudioEditor from './audio/AudioEditor'

export const TYPE_VIDEO = 'TYPE_VIDEO'
export const TYPE_AUDIO = 'TYPE_AUDIO'
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
    case TYPE_AUDIO:
      return <AudioEditor {...props} />
    default:
      return null
  }
}

export default MediaEditor
