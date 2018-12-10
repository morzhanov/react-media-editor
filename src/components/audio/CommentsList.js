import React from 'react'

const CommentsList = props => {
  const listStyles = {
    height: '100%',
    width: 500,
    padding: 20,
    backgroundColor: '#225'
  }
  const itemStyles = {
    width: '100%',
    height: 40,
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: '#448',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '40px'
  }
  const { comments, goToTimeMark } = props
  return (
    <div style={listStyles}>
      {comments.map(comment => (
        <div
          style={itemStyles}
          onClick={() => goToTimeMark(comment.progressMark)}
          key={comment.text.substr(0, comment.text.length / 2)}
        >
          {comment.text}
        </div>
      ))}
    </div>
  )
}

export default CommentsList
