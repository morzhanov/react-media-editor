import Text from './entities/Text'
import Tools from './entities/Tools'
import Shape from './entities/Shape'
import Path from './entities/Path'
import { includes } from 'lodash'

class CanvasController {
  init = data => {
    this.canvasPainter = data.canvasPainter
    this.canvas = data.canvas
    this.ctx = data.ctx
    this.brushColor = data.brushColor
    this.brushSize = data.brushSize
    this.textSize = data.textSize
    this.width = data.width
    this.height = data.height
    this.forceRedraw = data.forceRedraw

    this.tool = Tools.Pencil
    this.isMouseDown = false
    this.hasInput = false
    this.textPosition = {}
    this.startDrawIdx = []
    this.pathsArray = []
    this.shapesArray = []
    this.textsArray = []
    this.history = []
  }

  onRedraw = () => {
    this.pathsArray.forEach(path =>
      path.data.forEach(item => this.drawPath(item))
    )
    this.shapesArray.forEach(shape => this.drawShape(shape))
    this.textsArray.forEach(text => this.drawText(text))

    if (this.isMouseDown && this.tool === Tools.Shape) {
      this.drawCurrentShape()
    }
  }

  // Mouse listeners

  onMouseUp = e => {
    this.isMouseDown = false
    const shapes = [Tools.Line, Tools.Arrow, Tools.Elipse, Tools.Rectangle]

    if (includes(shapes, this.tool)) {
      const { x, y } = this.getMousePos(e)
      const shape = new Shape(
        this.shapeStart.x,
        this.shapeStart.y,
        x,
        y,
        this.brushColor,
        this.tool
      )
      this.shapesArray.push(shape)
      this.history.push(Tools.Shape)
    }
  }

  onMouseDown = e => {
    if (this.tool === Tools.Pencil) {
      this.drawPathStart(e)
      return
    }
    if (this.tool === Tools.Text && !this.hasInput) {
      this.textPosition = this.getMousePos(e)
      this.addTextInput(this.textPosition)
      return
    }
    this.drawShapeStart(e)
  }

  onMouseMove = e => {
    if (!this.ctx || !this.isMouseDown) return

    if (this.tool === Tools.Pencil) {
      this.drawPaths(e)
      return
    }
    this.drawCurrentShape(e)
  }

  /* eslint-disable */
  getMousePos = e => {
    const rect = this.canvas.getBoundingClientRect()
    let clientX = e.clientX
    let clientY = e.clientY
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }
  /* eslint-enable */

  // Draw text methods

  addTextInput = ({ x, y }) => {
    const parent = this.canvas.parentNode
    const input = document.createElement('input')
    parent.appendChild(input)

    input.style.borderBottom = `2px solid ${this.brushColor}`
    input.style.fontSize = this.textSize
    input.style.color = this.brushColor
    input.style.left = `${x}px`
    input.style.top = `${y + this.textSize}px`

    input.autofocus = true
    input.onkeydown = this.handleTextEnter
    input.focus()
    this.hasInput = true
  }

  handleTextEnter = e => {
    const { keyCode } = e
    if (keyCode === 13) {
      const { x, y } = this.textPosition
      const text = new Text(
        x,
        y,
        e.target.value,
        this.brushColor,
        this.textSize
      )

      e.target.remove()
      this.hasInput = false
      this.textsArray.push(text)
      this.history.push(Tools.Text)
      this.drawText(text)
    }
  }

  drawText = content => {
    const { ctx } = this
    const { x, y, text, color, textSize } = content

    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    ctx.fillStyle = color
    ctx.font = `${textSize - 2}px Arial`
    ctx.fillText(text, x, y - textSize - 4)
  }

  // Draw path methods

  drawPathStart = e => {
    this.isMouseDown = true
    this.startDrawIdx.push(this.pathsArray.length)

    const { x, y } = this.getMousePos(e)
    this.x = x
    this.y = y
    this.drawPaths(e, true)
  }

  drawPaths = (e, isNew) => {
    const { x, y } = this.getMousePos(e)
    const newX = x + 1
    const newY = y + 1
    const path = {
      color: this.brushColor,
      size: this.brushSize,
      startX: this.x,
      startY: this.y,
      endX: newX,
      endY: newY
    }

    this.drawPath(path)
    if (isNew) {
      const newData = [path]
      this.pathsArray.push(new Path(newData))
      this.history.push(Tools.Pencil)
    }
    this.pathsArray[this.pathsArray.length - 1].data.push(path)
    this.x = newX
    this.y = newY
  }

  drawPath = path => {
    this.ctx.strokeStyle = path.color
    this.ctx.lineWidth = path.size
    this.ctx.lineCap = 'round'
    this.ctx.beginPath()
    this.ctx.moveTo(path.startX, path.startY)
    this.ctx.lineTo(path.endX, path.endY)
    this.ctx.stroke()
  }

  // Draw shape methods

  drawShapeStart = e => {
    this.isMouseDown = true
    this.shapeStart = this.getMousePos(e)
  }

  drawCurrentShape = e => {
    if (e) {
      const { x, y } = this.getMousePos(e)
      const shape = new Shape(
        this.shapeStart.x,
        this.shapeStart.y,
        x,
        y,
        this.brushColor,
        this.tool
      )
      this.currentShape = shape
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.forceRedraw()
      this.canvasPainter.redraw()
      this.drawShape(shape)
    } else if (this.currentShape) {
      this.drawShape(this.currentShape)
    }
  }

  drawShape = shape => {
    const { ctx } = this
    const { x1, y1, x2, y2, color, type } = shape

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = this.brushSize
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    switch (type) {
      case Tools.Arrow:
      case Tools.Line:
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        break
      case Tools.Elipse:
        this.drawElipse(shape)
        break
      case Tools.Rectangle:
        ctx.rect(x1, y1, x2 - x1, y2 - y1)
        break
      default:
    }

    ctx.stroke()
    if (type === Tools.Arrow) this.drawArrowTip(shape)
  }

  drawArrowTip = line => {
    const { ctx } = this
    const { x1, y1, x2, y2 } = line
    const tipLength = 10
    const angle = Math.atan2(y2 - y1, x2 - x1)

    ctx.beginPath()
    ctx.moveTo(x2, y2)
    ctx.lineTo(
      x2 - tipLength * Math.cos(angle - Math.PI / 6),
      y2 - tipLength * Math.sin(angle - Math.PI / 6)
    )
    ctx.moveTo(x2, y2)
    ctx.lineTo(
      x2 - tipLength * Math.cos(angle + Math.PI / 6),
      y2 - tipLength * Math.sin(angle + Math.PI / 6)
    )
    ctx.stroke()
  }

  drawElipse = ({ x1, y1, x2, y2 }) => {
    const { ctx } = this
    const radiusX = (x2 - x1) * 0.5
    const radiusY = (y2 - y1) * 0.5
    const centerX = x1 + radiusX
    const centerY = y1 + radiusY
    const step = 0.01
    let i = step
    const pi2 = Math.PI * 2 - step
    ctx.moveTo(centerX + radiusX * Math.cos(0), centerY + radiusY * Math.sin(0))
    for (; i < pi2; i += step) {
      ctx.lineTo(
        centerX + radiusX * Math.cos(i),
        centerY + radiusY * Math.sin(i)
      )
    }
  }

  // Tools and controls methods

  onUndo = () => {
    switch (this.history.pop()) {
      case Tools.Text:
        this.textsArray.pop()
        break
      case Tools.Pencil:
        this.pathsArray.pop()
        break
      case Tools.Shape:
        this.shapesArray.pop()
        break
      default:
    }
    this.canvasPainter.redraw()
  }

  onClear = () => {
    this.pathsArray = []
    this.shapesArray = []
    this.textsArray = []
    this.forceRedraw()
    this.canvasPainter.redraw()
  }

  onSave = () => {
    const image = this.canvas.toDataURL('image/png')

    const a = document.createElement('a')
    a.href = image
    a.download = `${new Date().getTime()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  onToolsChange = id => {
    this.tool = id
  }

  onColorChange = color => {
    this.brushColor = color.hex
    this.canvasPainter.redraw()
  }
}

export default CanvasController
