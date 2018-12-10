import React from 'react'
import CanvasPainter from '../painter/CanvasPainter'

class ImageEditor extends React.Component {
  componentDidMount() {
    this.renderImage()
    this.canvasPainter = React.createRef()
  }

  renderImage = () => {
    const { canvas, ctx } = this.canvasPainter || {}
    const { image, ratio } = this.props
    if (canvas && image) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.width / ratio)
    }
  }

  render() {
    const { image } = this.props
    return image ? (
      <div style={{ width: '100%' }}>
        <CanvasPainter
          forceRedraw={this.renderImage}
          beforeRender={this.renderImage}
          ref={this.canvasPainter}
        />
      </div>
    ) : null
  }
}

export default ImageEditor
