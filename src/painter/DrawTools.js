import React from 'react'

class DrawTools extends React.Component {
  buttonStyle = {
    marginRight: 24,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    border: '2px solid #fff',
    borderRadius: 4,
    fontFamily: 'Arial, Helvetica, sans-serif',
    cursor: 'pointer',
    transition: '300ms ease all'
  }

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
          if (onClose) onClose()
        }
      }
    ]
  }

  onColorPicked = color => this.props.onColorChange(color)

  togglePicker = () => {
    this.setState(state => ({ showPicker: !state.showPicker }))
  }

  renderToolsItem = (item, key) => (
    <div
      style={this.buttonStyle}
      onClick={item.onClick}
      key={key}
      className="tools-item"
    >
      {item.name}
    </div>
  )

  toggleOpen = () => {
    this.setState(state => ({ opened: !state.opened }))
  }

  render() {
    const ColorPicker = this.props.picker
    return (
      <div
        className="canvas-painter-tools"
        style={{ display: 'flex', background: '#888', padding: 12 }}
      >
        {!this.state.opened && (
          <div
            style={this.buttonStyle}
            className="tools-item"
            onClick={this.toggleOpen}
          >
            Open Tools
          </div>
        )}
        {this.state.opened && (
          <>
            {this.toolsItems.map((item, i) => this.renderToolsItem(item, i))}
            {this.state.showPicker && (
              <ColorPicker
                style={{ position: 'absolute', top: 70, left: 50 }}
                onChangeComplete={this.onColorPicked}
              />
            )}
          </>
        )}
      </div>
    )
  }
}

export default DrawTools
