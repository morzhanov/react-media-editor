import React from 'react'
import { Editor, TYPE_VIDEO } from 'react-media-editor'

class Video extends React.Component {
  state = { ratio: 16 / 9, video: null }

  componentDidMount = () => {
    const media = document.createElement('video')
    const source = document.createElement('source')
    const src =
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    source.setAttribute('src', src)
    media.appendChild(source)

    const checkLoad = () => {
      if (media.readyState === 4) {
        const ratio = media.videoWidth / media.videoHeight
        this.setState({ ratio, video: media })
      } else {
        setTimeout(checkLoad, 100)
      }
    }

    window.addEventListener('load', checkLoad, false)
    media.load()
  }

  render() {
    const { video, ratio } = this.state

    return (
      <div className="page-wrapper editor">
        <div className="container">
          <Editor type={TYPE_VIDEO} media={video} ratio={ratio} />
        </div>
      </div>
    )
  }
}

export default Video
