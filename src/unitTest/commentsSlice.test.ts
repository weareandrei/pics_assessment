/// <reference types="jest" />
import { configureStore } from '@reduxjs/toolkit'
import { type Comment } from '../../lib/type'
import commentsReducer, {
  addComment,
  likeComment,
} from '../store/slices/commentsSlice'

describe('commentsSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({
      reducer: {
        comments: commentsReducer,
      },
    })
  })

  it('should like and unlike a comment', () => {
    const initialComment: Comment = {
      id: 'comment1',
      storyId: 'story1',
      contents: 'This is a test comment',
      author: 'user1',
      likesCount: 0,
      userLiked: false,
    }

    store.dispatch(addComment(initialComment))

    store.dispatch(likeComment('comment1'))
    let state = store.getState().comments
    let likedComment = state.comments.find(
      (comment: Comment) => comment.id === 'comment1'
    )

    expect(likedComment.likesCount).toBe(1)
    expect(likedComment.userLiked).toBe(true)

    store.dispatch(likeComment('comment1'))
    state = store.getState().comments
    let unlikedComment = state.comments.find(
      (comment: Comment) => comment.id === 'comment1'
    )

    expect(unlikedComment.likesCount).toBe(0)
    expect(unlikedComment.userLiked).toBe(false)
  })

  it('should add a new comment from the current user', () => {
    const newComment: Comment = {
      id: 'comment1',
      storyId: 'story1',
      contents: 'This is a new comment from the current user',
      author: 'currentUser',
      likesCount: 0,
      userLiked: false,
    }

    store.dispatch(addComment(newComment))

    const state = store.getState().comments
    const addedComment = state.comments.find(
      (comment: Comment) => comment.id === 'comment1'
    )

    expect(addedComment).toBeDefined()
    expect(addedComment.contents).toBe(
      'This is a new comment from the current user'
    )
    expect(addedComment.author).toBe('currentUser')
    expect(addedComment.likesCount).toBe(0)
    expect(addedComment.userLiked).toBe(false)
  })

  it('should add a new comment from another user', () => {
    const anotherUserComment: Comment = {
      id: 'comment2',
      storyId: 'story1',
      contents: 'This is a comment from another user',
      author: 'anotherUser',
      likesCount: 0,
      userLiked: false,
    }

    store.dispatch(addComment(anotherUserComment))

    const state = store.getState().comments
    const addedComment = state.comments.find(
      (comment: Comment) => comment.id === 'comment2'
    )

    expect(addedComment).toBeDefined()
    expect(addedComment.contents).toBe('This is a comment from another user')
    expect(addedComment.author).toBe('anotherUser')
    expect(addedComment.likesCount).toBe(0)
    expect(addedComment.userLiked).toBe(false)
  })
})
