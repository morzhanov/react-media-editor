import React from 'react'
import DrawTools from './DrawTools'
import CanvasController from './CanvasController'

class CanvasPainter extends React.Component {
  static defaultProps = {
    width: 400,
    height: 400,
    ratio: 16 / 9,
    brushColor: '#f33',
    brushSize: 10,
    textSize: 18
  }

  constructor(props) {
    super(props)
    this.controller = new CanvasController()
    this.state = {
      ratio: props.ratio,
      width: props.width,
      height: props.height
    }
  }

  componentDidMount() {
    this.controller.init({
      canvas: this.canvas,
      ctx: this.ctx,
      canvasPainter: this,
      ...this.props
    })
    this.changeSize()
    window.addEventListener('resize', this.changeSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSize)
  }

  changeSize = () => {
    const { ratio } = this.state
    this.setState({
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetWidth / ratio
    })

    const parent = this.canvas.parentNode
    setTimeout(() => {
      this.setState({
        width: parent.offsetWidth,
        height: parent.offsetWidth / ratio
      })
      this.redraw()
      this.forceUpdate()
    }, 100)
  }

  redraw = () => {
    const { beforeRender, afterRender } = this.props
    if (beforeRender) beforeRender()
    this.controller.onRedraw()
    if (afterRender) afterRender()
  }

  render() {
    const { width, height } = this.state
    const { style, children } = this.props

    return (
      <div className="canvas-painter">
        <DrawTools
          onUndo={this.controller.onUndo}
          onClear={this.controller.onClear}
          onSave={this.controller.onSave}
          onToolsChange={this.controller.onToolsChange}
          onColorChange={this.controller.onColorChange}
        />
        <canvas
          ref={canvas => {
            if (canvas) {
              this.canvas = canvas
              this.ctx = canvas.getContext('2d')
            }
          }}
          style={{
            background: '#000',
            display: 'block',
            touchAction: 'none',
            ...style
          }}
          width={width}
          height={height}
          onClick={() => false}
          onMouseDown={this.controller.onMouseDown}
          onMouseUp={this.controller.onMouseUp}
          onMouseMove={this.controller.onMouseMove}
          onMouseOut={() => {
            this.controller.isMouseDown = false
          }}
          onTouchStart={this.controller.onMouseDown}
          onTouchMove={this.controller.onMouseMove}
          onTouchEnd={this.controller.onMouseUp}
          onTouchCancel={() => {
            this.controller.isMouseDown = false
          }}
        />
        {children}
      </div>
    )
  }
}

export default CanvasPainter
