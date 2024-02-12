import {Component} from 'react'

import {v4 as uidV4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comment extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  deleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  likeBtnClicked = id => {
    // const {commentsList} = this.state

    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(comment => (
      <CommentItem
        commentsList={comment}
        deleteComment={this.deleteComment}
        likeBtnClicked={this.likeBtnClicked}
        key={comment.id}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state
    const randNum = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    const initialClassName = `initial ${initialContainerBackgroundClassNames[randNum]}`
    const newComment = {
      id: uidV4(),
      name: nameInput,
      comment: commentInput,
      initialClass: initialClassName,
      date: new Date(),
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    // const count = commentsList.length

    return (
      <div className="app-container">
        <div className="app-section">
          <div className="upper-section">
            <div className="left-section">
              <h1 className="title">Comments</h1>
              <form
                name="comments"
                className="input-form"
                onSubmit={this.onAddComment}
              >
                <p className="label">Say something about 4.0 Technologies</p>
                <input
                  id="name"
                  type="text"
                  className="user-name-input"
                  placeholder="Your Name"
                  value={nameInput}
                  onChange={this.onChangeName}
                />
                <textarea
                  className="comment-text"
                  placeholder="Your Comment"
                  onChange={this.onChangeComment}
                  value={commentInput}
                />
                <button type="submit" className="add-comment-btn">
                  Add Comment
                </button>
              </form>
              <div className="right-section">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                  alt="comments"
                />
              </div>
            </div>
            <hr className="line" />
            <p className="total-comments">{commentsList.length}</p>
            <ul className="comments-list">{this.renderCommentsList()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment
