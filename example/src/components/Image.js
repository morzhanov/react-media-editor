import React from 'react'
import { SketchPicker } from 'react-color'
import { ImageEditor } from 'react-media-editor'
import ExampleImage from '../assets/img/example.png'

const Image = () => (
  <div className="page-wrapper editor">
    <div className="container">
      <ImageEditor colorPicker={SketchPicker} src={ExampleImage} />
    </div>
  </div>
)

export default Image
