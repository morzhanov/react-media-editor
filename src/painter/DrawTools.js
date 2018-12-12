import React from 'react'

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
          if (onClose) onClose()
        }
      }
    ]
  }

  getButtonStyles = ({ display } = {}) => ({
    marginRight: 24,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    border: '2px solid #fff',
    borderRadius: 4,
    fontFamily: 'Arial, Helvetica, sans-serif',
    cursor: 'pointer',
    transition: '300ms ease all',
    display
  })

  onColorPicked = color => this.props.onColorChange(color)

  togglePicker = () => {
    this.setState(state => ({ showPicker: !state.showPicker }))
  }

  renderToolsItem = (item, key) => (
    <div
      style={this.getButtonStyles({
        display:
          item.name === 'Color' && !this.props.colorPicker ? 'none' : 'inherit'
      })}
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
    const ColorPicker = this.props.colorPicker
    return (
      <div
        className="canvas-painter-tools"
        style={{ display: 'flex', background: '#888', padding: 12 }}
      >
        {!this.state.opened && (
          <div
            style={this.getButtonStyles()}
            className="tools-item"
            onClick={this.toggleOpen}
          >
            Open Tools
          </div>
        )}
        {this.state.opened && (
          <>
            {this.toolsItems.map((item, i) => this.renderToolsItem(item, i))}
            {this.state.showPicker && ColorPicker && (
              <div style={{ position: 'fixed', top: 70, left: 50 }}>
                <ColorPicker onChangeComplete={this.onColorPicked} />
              </div>
            )}
          </>
        )}
      </div>
    )
  }
}

export default DrawTools
