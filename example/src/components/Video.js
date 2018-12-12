import React from 'react'
import { SketchPicker } from 'react-color'
import { VideoEditor } from 'react-media-editor'

const Video = () => (
  <div className="page-wrapper editor">
    <div className="container">
      <VideoEditor
        colorPicker={SketchPicker}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  </div>
)

export default Video
