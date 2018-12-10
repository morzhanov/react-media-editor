import React from 'react'
import { MuteIcon, UnMuteIcon } from './icons'

const Volume = ({ volumeHandler, muteHandler, volume, muted }) => {
  const styles = {
    height: '40px',
    border: 'none',
    backgroundColor: 'inherit',
    cursor: 'pointer'
  }

  const iconStyles = {
    width: '20px',
    height: '20px',
    margin: '10px 10'
  }

  const progressStyles = {
    width: 'calc(100% - 40px)',
    margin: '0 20px',
    height: '40px',
    cursor: 'pointer',
    width: 'calc(30% - 40px)', // ???? TODO:
    opacity: muted ? 0.2 : 1
  }

  return (
    <>
      <div onClick={muteHandler} style={styles}>
        {muted ? (
          <UnMuteIcon style={iconStyles} />
        ) : (
          <MuteIcon style={iconStyles} />
        )}
      </div>
      <progress
        onClick={volumeHandler}
        min="0"
        max="1"
        value={volume}
        style={progressStyles}
      />
    </>
  )
}
export default Volume
