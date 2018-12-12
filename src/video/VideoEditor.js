import React from 'react'
import VideoPlayer from './VideoPlayer'
import CanvasPainter from '../painter/CanvasPainter'
import Controls from '../controls/Controls'

class VideoEditor extends React.Component {
  canvasPainter = React.createRef()

  componentDidMount() {
    this.videPlayer = new VideoPlayer(
      this.canvasPainter.canvas,
      this.canvasPainter.ctx,
      this.props.media,
      this.props.ratio,
      this.playerDrawCallback
    )
  }

  componentWillUnmount() {
    this.videPlayer.destroy()
  }

  playerDrawCallback = () => this.canvasPainter.redraw()

  forceRedraw = () => this.videPlayer.drawVideo(true)

  render() {
    const { media, colorPicker } = this.props
    return (
      <div style={{ width: '100%' }}>
        <CanvasPainter
          colorPicker={colorPicker}
          forceRedraw={this.forceRedraw}
          ref={ref => {
            this.canvasPainter = ref
          }}
        />
        {media && <Controls media={media} />}
      </div>
    )
  }
}

export default VideoEditor
