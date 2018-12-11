import React from 'react'
// import { TYPE_IMAGE, Editor } from 'react-media-editor'
import { Editor, TYPE_IMAGE } from '../../../dist/index.min'
import ExampleImage from '../assets/img/example.png'

class Image extends React.Component {
  state = { ratio: 16 / 9, image: null }

  componentDidMount = () => {
    const img = new window.Image()
    img.onload = () => {
      const ratio = img.width / img.height
      this.setState({ ratio, image: img })
    }
    img.src = ExampleImage
  }

  render() {
    const { image, ratio } = this.state

    return (
      <div className="page-wrapper editor">
        <div className="container">
          <Editor type={TYPE_IMAGE} media={image} ratio={ratio} />
        </div>
      </div>
    )
  }
}

export default Image
