import React, { Component } from 'react'
import VideoPlayer from './VideoPlayer'
import CanvasPainter from '../painter/CanvasPainter'
import Controls from '../controls/Controls'

class VideoEditor extends Component {
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
    const { media } = this.props
    return (
      <div style={{ width: '100%' }}>
        <CanvasPainter
          forceRedraw={this.forceRedraw}
          ref={this.canvasPainter}
        />
        {media && <Controls media={media} />}
      </div>
    )
  }
}

export default VideoEditor
