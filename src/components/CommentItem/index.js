import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentsList} = props
  const {id, name, comment, isLiked, date} = commentsList

  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClass = isLiked ? 'liked-text' : 'un-liked-text'
  const userInitial = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)

  const onDeleteClicked = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  const onLikeBtnClicked = () => {
    const {likeBtnClicked} = props
    likeBtnClicked(id)
  }

  return (
    <li className="comment-item">
      <div className="upper-section">
        <p className="user-initial">{userInitial}</p>
        <div className="comment-details">
          <p className="user-name">
            {name} <span className="posted-time">{postedTime}</span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="lower-section">
        <button
          className="like-button"
          type="button"
          onClick={onLikeBtnClicked}
        >
          <img src={imageUrl} alt="like icon" className="like-image" />
          <p className={likeTextClass}>Like</p>
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteClicked}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
