import React, { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import StoryButton from './StoryButton'
import { map } from 'lodash'
import { nanoid } from 'nanoid'
import { type AnyFunction, type Story } from '../../../../lib/type'

interface NavBarProps {
  isMobile: boolean
  currentPathname: string
  allStories: Story[]
  selectedStoryId: string
  navigate: AnyFunction
  selectStoryId: AnyFunction
  editStoryName: AnyFunction
  addStory: AnyFunction
  deleteStory: AnyFunction
  changeDrawerState: AnyFunction
}

const NavBar = ({
  isMobile,
  currentPathname,
  allStories,
  selectedStoryId,
  navigate,
  selectStoryId,
  editStoryName,
  addStory,
  deleteStory,
  changeDrawerState,
}: NavBarProps) => {
  const style: { [key: string]: CSSProperties } = {
    sideBarContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      width: isMobile ? '100%' : '255px',
      height: '100svh',
      background: '#242526',
      minHeight: 0,
    },
    dividerHeader: {
      marginTop: '12px',
      marginBottom: '8px',
      color: '#7C7C7C',
      fontSize: isMobile ? '18px' : '13px',
      fontWeight: '500',
    },
    headerIconMobile: {
      height: '35px',
      width: '35px',
      borderRadius: '5px',
      color: '#7C7C7C',
    },
  }

  return (
    <Box sx={style.sideBarContainer}>
      {isMobile && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '12px',
          }}
        >
          <IconButton
            onClick={() => changeDrawerState()}
            style={style.headerIconMobile}
          >
            <CloseIcon sx={{ height: '30px', width: '30px' }} />
          </IconButton>
        </div>
      )}

      <div
        style={{
          position: 'relative',
          padding: '12px',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            style={{
              width: isMobile ? '50%' : '68%',
              margin: '12px 0px 20px 0px',
            }}
            src={'/createStory.png'}
            alt={'Logo'}
          />
        </Box>
        <StoryButton
          key={'000'}
          isMobile={isMobile}
          onClick={() => {
            if (currentPathname !== '/home') {
              navigate('/home')
            }
          }}
          label={'Home'}
          isActive={currentPathname === '/home'}
        />

        <Typography variant={'h4'} style={style.dividerHeader}>
          Stories
        </Typography>

        <div style={{ padding: '0px 8px' }}>
          {map(allStories, story => (
            <StoryButton
              key={story.id}
              isMobile={isMobile}
              onClick={() => {
                if (currentPathname === '/home') {
                  navigate('/')
                }
                selectStoryId(story.id)
              }}
              label={story.name}
              isActive={
                currentPathname !== '/home' && selectedStoryId === story.id
              }
              edit
              editStoryName={newName => editStoryName(story.id, newName)}
              deleteStory={() => deleteStory(story.id)}
            />
          ))}
          <hr style={{ border: '1px solid #616AAA', margin: '6px' }} />
          <StoryButton
            isMobile={isMobile}
            onClick={() => {
              const storyId = nanoid()
              addStory({
                id: storyId,
                name: 'New Story',
              })
              selectStoryId(storyId)
            }}
            newStory
            label={'New story'}
          />
        </div>
      </div>
    </Box>
  )
}

export default NavBar
