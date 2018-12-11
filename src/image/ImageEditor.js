import React from 'react'
import CanvasPainter from '../painter/CanvasPainter'

class ImageEditor extends React.Component {
  componentDidMount() {
    this.renderImage()
  }

  renderImage = () => {
    if (!this.canvasPainter) return

    const { canvas, ctx } = this.canvasPainter || {}
    const { image, ratio } = this.props
    if (canvas && image) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.width / ratio)
    }
  }

  render() {
    const { image } = this.props
    return image ? (
      <div style={{ width: '100%', backgroundColor: '#000' }}>
        <CanvasPainter
          forceRedraw={this.renderImage}
          beforeRender={this.renderImage}
          ref={ref => {
            this.canvasPainter = ref
          }}
        />
      </div>
    ) : null
  }
}

export default ImageEditor
