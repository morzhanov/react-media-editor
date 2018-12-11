import React from 'react'
import shortid from 'shortid'

const listStyles = {
  minHeight: 302,
  minWidth: 500,
  padding: 20,
  border: '1px solid #ccc',
  backgroundColor: '#fff'
}
const itemStyles = {
  minHeight: 60,
  color: '#555',
  fontSize: 20,
  marginBottom: 20,
  backgroundColor: '#fff',
  border: '1px solid #aaa',
  borderRadius: 4,
  padding: 8,
  cursor: 'pointer'
}

const CommentsList = props => {
  const { comments, goToTimeMark } = props
  return (
    <div style={listStyles}>
      <h3 style={{ marginLeft: '-10px', marginTop: '-10px', color: '#666' }}>
        Comments
      </h3>
      {comments.map(comment =>
        comment && comment.text ? (
          <div
            style={itemStyles}
            onClick={() => goToTimeMark(comment.progressMark)}
            key={shortid.generate()}
          >
            {comment.text}
          </div>
        ) : null
      )}
    </div>
  )
}

export default CommentsList
