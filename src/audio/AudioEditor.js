import React from 'react'
import AudioChart from './AudioChart'
import Controls from '../controls/Controls'
import CommentsList from './CommentsList'
import AddCommentPopup from './AddCommentPopup'

class AudioEditor extends React.Component {
  state = {
    audio: null,
    progress: 0,
    comments: []
  }

  controlsRef = React.createRef()

  commentsModal = React.createRef()

  componentDidMount() {
    const audio = document.createElement('audio')
    const extension = audio.src.substr(audio.src.lastIndexOf('.'))

    audio.src = this.props.src
    audio.type = `audio/${extension}`

    const checkAudioState = () => {
      if (audio.readyState === 4) {
        this.setState({ audio })
      } else {
        setTimeout(checkAudioState, 100)
      }
    }

    window.addEventListener('load', checkAudioState, false)

    audio.load()

    audio.addEventListener('timeupdate', this.audioProgressHandler, false)
  }

  componentWillUnmount() {
    this.state.audio.removeEventListener(
      'timeupdate',
      this.audioProgressHandler,
      false
    )
  }

  audioProgressHandler = () => {
    const { audio } = this.state
    if (audio) {
      const progress = audio.currentTime
        ? (audio.currentTime / audio.duration) * 100
        : 0
      this.setState({ progress })
    }
  }

  progressClickHandler = percent => {
    if (this.controlsRef) this.controlsRef.changeMediaProgress(percent)
  }

  showCommentsPopup = () => this.commentsModal.showPopup()

  successCommentCallback = text => {
    const newComment = {
      text,
      progressMark: this.state.progress / 100
    }
    this.setState(prevState => ({
      comments: [...prevState.comments, newComment]
    }))
  }

  render() {
    const { enableComments, showCommentsList = true } = this.props
    const addCommentButtonStyles = {
      width: '100%',
      height: '48px',
      fontSize: '16px',
      marginTop: '12px'
    }
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div>
          <AudioChart
            progressClickHandler={this.progressClickHandler}
            progress={this.state.progress}
            {...this.props}
          />
          {this.state.audio && (
            <Controls
              showProgressBar={false}
              ref={ref => {
                this.controlsRef = ref
              }}
              media={this.state.audio}
            />
          )}
        </div>
        {enableComments && (
          <aside style={{ padding: 20, paddingTop: 0 }}>
            {showCommentsList && (
              <CommentsList
                goToTimeMark={this.progressClickHandler}
                comments={this.state.comments}
              />
            )}
            <button
              type="button"
              style={addCommentButtonStyles}
              onClick={this.showCommentsPopup}
            >
              Add comment
            </button>
            <AddCommentPopup
              successCallback={this.successCommentCallback}
              ref={ref => {
                this.commentsModal = ref
              }}
            />
          </aside>
        )}
      </div>
    )
  }
}

export default AudioEditor
