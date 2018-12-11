import React from 'react'
import { PauseIcon, PlayIcon } from './icons'

const Playback = ({ playbackHandler, paused }) => {
  const styles = {
    height: '40px',
    border: 'none',
    backgroundColor: 'inherit',
    cursor: 'pointer'
  }

  const buttonStyles = {
    width: '20px',
    height: '20px',
    margin: '10px 10'
  }

  return (
    <div onClick={playbackHandler} style={styles}>
      {paused ? (
        <PlayIcon style={buttonStyles} />
      ) : (
        <PauseIcon style={buttonStyles} />
      )}
    </div>
  )
}
export default Playback
