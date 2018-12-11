import React from 'react'
import MediaEditor, { TYPE_IMAGE } from 'react-media-editor'
import ExampleImage from '../../assets/images/test-img/bg-home.jpg'

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
          <MediaEditor type={TYPE_IMAGE} media={image} ratio={ratio} />
        </div>
      </div>
    )
  }
}

export default Image
