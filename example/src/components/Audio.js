import React from 'react'
// import { Editor, TYPE_AUDIO } from 'react-media-editor'
import { Editor, TYPE_AUDIO } from '../../../dist/index.min'

const Audio = () => (
  <div className="page-wrapper editor">
    <Editor
      enableComments
      type={TYPE_AUDIO}
      src="https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3"
    />
  </div>
)

export default Audio
