import React from 'react'

export default class AddCommentPopup extends React.Component {
  state = { visible: false }

  showPopup = () => this.setState({ visible: true })

  hidePopup = () => this.setState({ visible: false })

  confirmAction = () => {
    this.hidePopup()
    this.props.successCallback(this.field.value)
    this.field.value = ''
  }

  cancelAction = () => {
    this.hidePopup()
    this.props.cancelCallback()
  }

  render() {
    const textareaContainerStyles = {
      width: '100%',
      height: 400,
      padding: 20
    }

    const textareaStyles = {
      width: '100%',
      height: '100%',
      backgroundColor: 'inherit',
      outline: 'none',
      padding: 15,
      fontSize: 20,
      color: '#555'
    }

    const butttonStyles = {
      width: '80px',
      height: '32px',
      fontSize: '14px',
      marginRight: 20
    }

    return (
      <div
        style={{
          color: '#000',
          padding: 20,
          border: '1px solid #888',
          borderRadius: 4,
          background: '#fff',
          width: 500,
          minHeight: 500,
          position: 'fixed',
          top: '20%',
          left: 'calc(50% - 200px)',
          display: this.state.visible ? 'block' : 'none'
        }}
        className="modal-block"
      >
        <div className="modal-header">
          <h4>Add comment</h4>
        </div>
        <div className="general-block-body">
          <div style={textareaContainerStyles}>
            <textarea
              style={textareaStyles}
              ref={ref => {
                this.field = ref
              }}
            />
          </div>
          <div className="modal-footer" style={{ padding: 20 }}>
            <button
              style={butttonStyles}
              type="button"
              className="btn bottom-action double"
              onClick={this.cancelAction}
            >
              Cancel
            </button>
            <button
              style={butttonStyles}
              type="button"
              className="btn bottom-action double"
              onClick={this.confirmAction}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
}
