import React from 'react'

const Time = ({ time }) => {
  const styles = {
    height: '40px',
    lineHeight: '40px',
    fontSize: '1rem',
    fontFamily: 'Arial',
    width: 230
  }

  return <div style={styles}>{time}</div>
}
export default Time
