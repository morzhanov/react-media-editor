import React from 'react'
import { SketchPicker } from 'react-color'

class DrawTools extends React.Component {
  constructor(props) {
    super(props)
    const { onToolsChange, onUndo, onClear, onSave, onClose } = props
    this.state = { opened: false, showPicker: false }

    this.toolsItems = [
      {
        name: 'Pencil',
        onClick: () => onToolsChange(0)
      },
      {
        name: 'Line',
        onClick: () => onToolsChange(1)
      },
      {
        name: 'Arrow',
        onClick: () => onToolsChange(2)
      },
      {
        name: 'Elipse',
        onClick: () => onToolsChange(3)
      },
      {
        name: 'Rectangle',
        onClick: () => onToolsChange(4)
      },
      {
        name: 'Text',
        onClick: () => onToolsChange(5)
      },
      {
        name: 'Color',
        onClick: this.togglePicker
      },
      {
        name: 'Undo',
        onClick: onUndo
      },
      {
        name: 'Clear',
        onClick: onClear
      },
      {
        name: 'Save',
        onClick: onSave
      },
      {
        name: 'Close',
        onClick: () => {
          this.toggleOpen()
          onClose()
        }
      }
    ]
  }

  onColorPicked = color => this.props.onColorChange(color)

  togglePicker = () => {
    this.setState(state => ({ showPicker: !state.showPicker }))
  }

  renderToolsItem = (item, key) => (
    <div onClick={item.onClick} key={key} className="tools-item">
      {item.name}
    </div>
  )

  toggleOpen = () => {
    this.setState(state => ({ opened: !state.opened }))
  }

  render() {
    return (
      <div className="canvas-painter-tools">
        {!this.state.opened && (
          <div className="tools-item" onClick={this.toggleOpen}>
            Open Tools
          </div>
        )}
        {this.state.opened && (
          <>
            {this.toolsItems.map((item, i) => this.renderToolsItem(item, i))}
            {this.state.showPicker && (
              <SketchPicker onChangeComplete={this.onColorPicked} />
            )}
          </>
        )}
      </div>
    )
  }
}

export default DrawTools
