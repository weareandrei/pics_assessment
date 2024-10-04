import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { map } from 'lodash'
import { Story } from '../../../lib/type'

import storiesJson from '../mockData/stories.json'

interface StoriesState {
  selectedStoryId: string | undefined
  stories: Story[]
}

const initialState: StoriesState = {
  selectedStoryId: 'story1',
  stories: storiesJson
}

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    selectStoryId: (state, action: PayloadAction<string>) => {
      state.selectedStoryId = action.payload
    },
    addStory: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.stories.push(action.payload)
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter(story => story.id !== action.payload)
    },
    editStoryName: (state, action: PayloadAction<Story>) => {
      state.stories = map(state.stories, story => {
        if (story.id === action.payload.id) {
          return action.payload
        }
        return story
      })
    },
  },
})

export const { selectStoryId, addStory, deleteStory, editStoryName } =
  storiesSlice.actions
export default storiesSlice.reducer
