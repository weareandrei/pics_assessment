import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Comment } from '../../../lib/type'

import commentsJson from '../mockData/comments.json'

interface CommentsState {
  comments: Comment[]
}

const initialState: CommentsState = {
  comments: commentsJson
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    },
    updateComment: (
      state,
      action: PayloadAction<{ id: string; contents: string }>
    ) => {
      const comment = state.comments.find(
        comment => comment.id === action.payload.id
      )
      if (comment) {
        comment.contents = action.payload.contents
      }
    },
    likeComment: (state, action: PayloadAction<string>) => {
      const comment = state.comments.find(
        comment => comment.id === action.payload
      )
      if (comment && !comment.userLiked) {
        comment.likesCount += 1
        comment.userLiked = true
      } else if (comment && comment.userLiked) {
        comment.likesCount -= 1
        comment.userLiked = false
      }
    },
  },
})

export const { addComment, updateComment, likeComment } = commentsSlice.actions
export default commentsSlice.reducer
