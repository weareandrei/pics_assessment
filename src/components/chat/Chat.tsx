import React, { CSSProperties, useState } from 'react'
import Input from './components/Input'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeComment } from '../../store/slices/commentsSlice'
import { RootState } from '../../store/store'
import { ChatFeed } from './components/ChatFeed'
import { filter, find, map } from 'lodash'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import FullStoryDialog from './components/FullStoryDialog'

interface ChatProps {
  isMobile: boolean
}

const Chat = ({ isMobile }: ChatProps) => {
  const [openFullStory, setOpenFullStory] = useState(false)

  const dispatch = useDispatch()

  const selectedStoryId = useSelector(
    (state: RootState) => state.stories.selectedStoryId
  )
  const selectedComments = useSelector((state: RootState) =>
    filter(
      state.comments.comments,
      comment => comment.storyId === selectedStoryId
    )
  )
  const allStories = useSelector((state: RootState) => state.stories.stories)

  const style: { [key: string]: CSSProperties } = {
    mainContainer: {
      height: isMobile ? 'calc(100% - 55px)' : '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
      position: 'relative',
    },
  }

  if (allStories.length === 0) {
    return <> No Stories created yet</>
  }

  return (
    <Box style={style.mainContainer}>
      <Button
        variant="contained"
        onClick={() => setOpenFullStory(true)}
        sx={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#616AAA',
          color: '#D0D0D0',
          padding: '8px 28px',
          textTransform: 'none',
        }}
      >
        See Full Story
      </Button>

      <FullStoryDialog
        comments={map(selectedComments, comment => comment.contents)}
        storyName={
          find(allStories, story => story.id === selectedStoryId)
            ?.name as string
        }
        isMobile={isMobile}
        open={openFullStory}
        handleClose={() => setOpenFullStory(false)}
      />

      <ChatFeed
        isMobile={isMobile}
        selectedComments={selectedComments}
        likeComment={commentId => dispatch(likeComment(commentId))}
      />

      <Input
        isMobile={isMobile}
        sx={{ margin: isMobile ? '0px 24px 24px 24px' : '0px 14% 24px 14%' }}
        placeholder={'Add a new comment'}
        onSubmit={(message: string) =>
          dispatch(
            addComment({
              id: nanoid(),
              storyId: selectedStoryId as string,
              contents: message,
              author: '',
              likesCount: 0,
              userLiked: false,
            })
          )
        }
        onGetRandomComment={({ contents, author, likesCount }) =>
          dispatch(
            addComment({
              id: nanoid(),
              storyId: selectedStoryId as string,
              contents: contents,
              author: author,
              likesCount: likesCount,
              userLiked: false,
            })
          )
        }
      />
    </Box>
  )
}

export default Chat
