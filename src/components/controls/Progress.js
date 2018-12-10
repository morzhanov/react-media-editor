import React from 'react'

const Progress = ({ value, progressClickHandler }) => {
  const styles = {
    width: 'calc(100% - 230px)',
    margin: '0 20px',
    height: '40px',
    cursor: 'pointer'
  }

  return (
    <progress
      onClick={progressClickHandler}
      min="0"
      max="100"
      value={value}
      style={styles}
    />
  )
}
export default Progress
