/// <reference types="jest" />
import { configureStore } from '@reduxjs/toolkit'
import { type Story } from '../../lib/type'
import storiesReducer, {
  addStory,
  deleteStory,
  editStoryName,
} from '../store/slices/storiesSlice'

describe('storiesSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({
      reducer: {
        stories: storiesReducer,
      },
    })
    const newStory = {
      id: 'id_story5',
      name: 'New Story',
    }

    store.dispatch(addStory(newStory))
  })

  it('should rename a story', () => {
    const updatedStory: Story = {
      id: 'id_story5',
      name: 'Updated Story Name',
    }

    store.dispatch(editStoryName(updatedStory))

    const state = store.getState().stories
    const renamedStory = state.stories.find(
      (story: Story) => story.id === 'id_story5'
    )

    expect(renamedStory).toBeDefined()
    expect(renamedStory.name).toBe('Updated Story Name')
  })

  it('should add a new story', () => {
    const newStory = {
      id: 'id_story3',
      name: 'New Story',
    }

    store.dispatch(addStory(newStory))

    const state = store.getState().stories
    const addedStory = state.stories.find(
      (story: Story) => story.id === 'id_story3'
    )

    expect(addedStory).toBeDefined()
    expect(addedStory.name).toBe('New Story')
  })

  it('should remove a story', () => {
    store.dispatch(deleteStory('id_story5'))

    const state = store.getState().stories
    const removedStory = state.stories.find(
      (story: Story) => story.id === 'id_story5'
    )

    expect(removedStory).toBeUndefined()
  })
})
