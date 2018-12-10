import React from 'react'

class AudioChart extends React.Component {
  static defaultProps = {
    width: 800,
    ratio: 3 / 1,
    stepHeight: 4,
    maxSteps: 8000
  }

  constructor(props) {
    super(props)
    this.state = {
      width: props.width,
      height: props.width / props.ratio,
      stepHeight: props.stepHeight,
      data: null,
      maxSteps: props.maxSteps,
      ratio: props.ratio
    }
    this.canvas = React.createRef()
  }

  componentDidMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioContext()

    const onDecodeError = () => {
      console.log('error while decoding your file.')
    }

    const loadMusic = url => {
      const req = new XMLHttpRequest()
      req.open('GET', url, true)
      req.responseType = 'arraybuffer'
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 200) {
            audioContext.decodeAudioData(
              req.response,
              buffer => {
                this.setState({ data: buffer })
                this.drawData(buffer)
              },
              onDecodeError
            )
          } else {
            console.log('error during the load.Wrong url or cross origin issue')
          }
        }
      }
      req.send()
    }

    loadMusic(this.props.src)

    this.changeSize()
    window.addEventListener('resize', this.changeSize)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.progress !== this.props.progress) {
      if (this.state.data) {
        this.drawData(this.state.data)
        this.drawProgress(nextProps.progress)
      }
    }
    return nextProps
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSize)
  }

  changeSize = () => {
    this.setState(state => ({
      width: this.canvas.current.offsetWidth,
      height: this.canvas.current.offsetWidth / state.ratio
    }))

    const parent = this.canvas.current.parentNode
    setTimeout(() => {
      if (parent) {
        this.setState(state => ({
          width: parent.offsetWidth,
          height: parent.offsetWidth / state.ratio
        }))
      }
      if (this.state.data) {
        this.drawData(this.state.data)
      }
      this.forceUpdate()
    }, 300)
  }

  drawData = buff => {
    const { width, height, stepHeight, maxSteps } = this.state
    const { canvas } = this
    const ctx = canvas.current.getContext('2d')
    let leftChannel = buff.getChannelData(0)
    // reduce count of steps entries
    if (leftChannel.length > maxSteps * 2) {
      const stepReducer = ~~(leftChannel.length / maxSteps)
      leftChannel = leftChannel.filter((_, i) => i % stepReducer === 0)
    }

    ctx.save()
    ctx.fillStyle = '#000'
    ctx.lineWidth = 1
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#228'
    ctx.globalCompositeOperation = 'lighter'
    ctx.translate(0, height / 2)
    ctx.globalAlpha = 0.6
    leftChannel.forEach((item, i) => {
      const x = Math.floor((width * i) / leftChannel.length)
      const y = (item * height) / ((1 / stepHeight) * 0.5)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + 1, y)
      ctx.stroke()
    })
    ctx.restore()
  }

  drawProgress = progress => {
    const { width, height } = this.state
    const { canvas } = this
    const ctx = canvas.current.getContext('2d')
    ctx.font = `${height / 20}px Arial`
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(progress, width / 2, height / 20)

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo((width * progress) / 100, 0)
    ctx.lineTo((width * progress) / 100, height)
    ctx.stroke()
  }

  mouseDownHandler = e => {
    const percent = e.nativeEvent.offsetX / e.target.offsetWidth
    this.props.progressClickHandler(percent)
  }

  render() {
    return (
      <canvas
        width={this.state.width}
        height={this.state.height}
        onMouseDown={this.mouseDownHandler}
        ref={this.canvas}
        style={{
          display: 'block',
          touchAction: 'none',
          ...this.props.style
        }}
      />
    )
  }
}

export default AudioChart
