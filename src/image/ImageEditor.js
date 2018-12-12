import React from 'react'
import CanvasPainter from '../painter/CanvasPainter'

class ImageEditor extends React.Component {
  canvasPainter = React.createRef()

  state = { ratio: 16 / 9, image: null }

  componentDidMount() {
    const { src } = this.props
    const img = new window.Image()
    img.setAttribute('crossorigin', 'anonymous')
    img.onload = () => {
      const ratio = img.width / img.height
      this.setState({ ratio, media: img })
    }
    img.src = src
  }

  renderImage = () => {
    if (!this.canvasPainter) return

    const { canvas, ctx } = this.canvasPainter || {}
    const { media, ratio } = this.state
    if (canvas && media) {
      ctx.drawImage(media, 0, 0, canvas.width, canvas.width / ratio)
    }
  }

  render() {
    const { colorPicker, src } = this.props
    const { media } = this.state

    if (!media || !src) return null

    return media ? (
      <div style={{ width: '100%' }}>
        <CanvasPainter
          colorPicker={colorPicker}
          forceRedraw={this.renderImage}
          beforeRender={this.renderImage}
          ref={ref => {
            this.canvasPainter = ref
            this.renderImage()
          }}
        />
      </div>
    ) : null
  }
}

export default ImageEditor
