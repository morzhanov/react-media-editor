import React from 'react'
import Playback from './Playback'
import Time from './Time'
import Progress from './Progress'
import Volume from './Volume'

class Controls extends React.Component {
  static defaultProps = {
    showProgressBar: true
  }

  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      muted: false,
      volume: props.media.volume,
      timeString: this.getTimeString(props.media),
      progress: 0
    }
  }

  componentDidMount() {
    const { media } = this.props
    media.addEventListener('play', this.playbackListener, false)
    media.addEventListener('pause', this.playbackListener, false)
    media.addEventListener('timeupdate', this.timeUpdateHandler, false)
  }

  componentWillUnmount() {
    const { media } = this.props
    media.removeEventListener('play', this.playbackListener, false)
    media.removeEventListener('pause', this.playbackListener, false)
    media.removeEventListener('timeupdate', this.timeUpdateHandler, false)
  }

  timeUpdateHandler = () => {
    const { media } = this.props
    const progress = media.currentTime
      ? (media.currentTime / media.duration) * 100
      : 0
    this.setState({
      progress,
      timeString: this.getTimeString(media)
    })
  }

  playbackListener = () => {
    const { media } = this.props
    this.setState({ paused: media.paused })
  }

  playbackHandler = () => {
    const { media } = this.props
    if (media.paused) {
      media.play()
    } else {
      media.pause()
    }
    this.setState({ paused: !media.paused })
  }

  progressClickHandler = e => {
    const percent = e.nativeEvent.offsetX / e.target.offsetWidth
    this.changeMediaProgress(percent)
  }

  changeMediaProgress = percent => {
    const { media } = this.props
    media.currentTime = percent * media.duration
    if (media.paused || media.ended) {
      media.play().then(() => media.pause())
    }
  }

  muteHandler = () => {
    const { media } = this.props
    media.muted = !media.muted
    this.setState({ muted: media.muted })
  }

  volumeHandler = e => {
    const { media } = this.props
    media.volume = e.nativeEvent.offsetX / e.target.offsetWidth
    this.setState({ volume: media.volume })
  }

  getTimeString = media => {
    const current = this.secondsToHms(media.currentTime)
    const duration = this.secondsToHms(media.duration)
    return `${current} / ${duration}`
  }

  secondsToHms = seconds => {
    const numberSeconds = Number(seconds)
    if (!seconds) return '00:00:00'

    const h = Math.floor(numberSeconds / 3600)
    const m = Math.floor((numberSeconds % 3600) / 60)
    const s = Math.floor((numberSeconds % 3600) % 60)

    return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
      s < 10 ? `0${s}` : s
    }`
  }

  render() {
    const { showProgressBar } = this.props
    const { paused, timeString, progress, volume, muted } = this.state
    const styles = {
      display: 'flex',
      backgroundColor: '#d0d0d0',
      position: 'relative',
      top: '-4px',
      width: '100%',
      height: '40px',
      justifyContent: 'flex-start'
    }

    return (
      <div style={styles}>
        <Playback paused={paused} playbackHandler={this.playbackHandler} />
        <Time time={timeString} />
        {showProgressBar && (
          <Progress
            value={progress}
            progressClickHandler={this.progressClickHandler}
          />
        )}
        <Volume
          volumeHandler={this.volumeHandler}
          muteHandler={this.muteHandler}
          volume={volume}
          muted={muted}
        />
      </div>
    )
  }
}

export default Controls
