import React from 'react'
import MediaEditor, { TYPE_AUDIO } from '../MediaEditor'

const Audio = () => (
  <div className="page-wrapper editor">
    <MediaEditor
      type={TYPE_AUDIO}
      src="https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3"
    />
  </div>
)

export default Audio
