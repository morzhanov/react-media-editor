import React from 'react'

export default class AddCommentPopup extends React.Component {
  state = { visible: false }

  field = React.createRef()

  showPopup = () => this.setState({ visible: true })

  hidePopup = () => this.setState({ visible: false })

  confirmAction = () => {
    this.hidePopup()
    this.props.successCallback(this.field.value)
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
      border: '1px solid rgba(100,100,255,0.7)',
      padding: 15,
      fontSize: 20,
      color: '#bbb'
    }

    return (
      <ReactModal
        isOpen={this.state.visible}
        className="modal-block"
        overlayClassName="modal-wrapper"
        shouldCloseOnOverlayClick
        onRequestClose={this.cancelAction}
      >
        <div className="modal-header">
          <h4>Add comment</h4>
        </div>
        <div className="general-block-body">
          <div style={textareaContainerStyles}>
            <textarea style={textareaStyles} ref={this.field} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bottom-action double"
              onClick={this.cancelAction}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bottom-action double"
              onClick={this.confirmAction}
            >
              Comment
            </button>
          </div>
        </div>
      </ReactModal>
    )
  }
}
