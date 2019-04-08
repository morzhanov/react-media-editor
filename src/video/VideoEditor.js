import React from 'react'
import VideoPlayer from './VideoPlayer'
import CanvasPainter from '../painter/CanvasPainter'
import Controls from '../controls/Controls'

class VideoEditor extends React.Component {
  canvasPainter = React.createRef()

  state = { ratio: 16 / 9, video: null }

  componentDidMount() {
    const { src } = this.props
    const media = document.createElement('video')
    media.setAttribute('crossorigin', 'anonymous')
    const checkLoad = () => {
      if (media.readyState === 4) {
        const ratio = media.videoWidth / media.videoHeight
        this.setState({ ratio, media })
      } else {
        setTimeout(checkLoad, 100)
      }
    }
    media.src = src
    checkLoad()
  }

  componentWillUnmount() {
    this.videPlayer.destroy()
  }

  initPlayer = () => {
    this.videPlayer = new VideoPlayer(
      this.canvasPainter.canvas,
      this.canvasPainter.ctx,
      this.state.media,
      this.state.ratio,
      this.playerDrawCallback
    )
  }

  playerDrawCallback = () => this.canvasPainter.redraw()

  forceRedraw = () => this.videPlayer.drawVideo(true)

  render() {
    const { media } = this.state
    const { colorPicker, src } = this.props

    if (!media || !src) {
      return null
    }
    return (
      <div style={{ width: '100%' }}>
        <CanvasPainter
          colorPicker={colorPicker}
          forceRedraw={this.forceRedraw}
          ref={ref => {
            this.canvasPainter = ref
            this.initPlayer()
          }}
        />
        {media && <Controls media={media} />}
      </div>
    )
  }
}

export default VideoEditor
