import React from 'react'
import VideoEditor from './video/VideoEditor'
import ImageEditor from './image/ImageEditor'
import AudioEditor from './audio/AudioEditor'

export const TYPE_VIDEO = 'TYPE_VIDEO'
export const TYPE_AUDIO = 'TYPE_AUDIO'
export const TYPE_IMAGE = 'TYPE_IMAGE'
export const TYPE_DOC = 'TYPE_DOC'

const MediaEditor = ({ type, media, ratio, src }) => {
  if (!media && !src) {
    return null
  }

  switch (type) {
    case TYPE_VIDEO:
      return <VideoEditor media={media} ratio={ratio} />
    case TYPE_IMAGE:
      return <ImageEditor image={media} ratio={ratio} />
    case TYPE_AUDIO:
      return <AudioEditor src={src} />
    case TYPE_DOC:
      return <div>Not yet implemented</div>
    default:
  }
}

export default MediaEditor
