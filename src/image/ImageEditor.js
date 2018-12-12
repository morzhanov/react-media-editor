import React from 'react'
import CanvasPainter from '../painter/CanvasPainter'

class ImageEditor extends React.Component {
  canvasPainter = React.createRef()

  componentDidMount() {
    this.renderImage()
  }

  renderImage = () => {
    if (!this.canvasPainter) return

    const { canvas, ctx } = this.canvasPainter || {}
    const { media, ratio } = this.props
    if (canvas && media) {
      ctx.drawImage(media, 0, 0, canvas.width, canvas.width / ratio)
    }
  }

  render() {
    const { media } = this.props
    return media ? (
      <div style={{ width: '100%' }}>
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
