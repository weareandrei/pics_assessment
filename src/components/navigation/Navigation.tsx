import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Drawer, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

import { find } from 'lodash'
import NavBar from './components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'

import {
  addStory,
  deleteStory,
  editStoryName,
  selectStoryId,
} from '../../store/slices/storiesSlice'

interface NavigationProps {
  isMobile: boolean
}

const useReduxData = () => {
  const allStories = useSelector((state: RootState) => state.stories.stories)
  const selectedStoryId = useSelector(
    (state: RootState) => state.stories.selectedStoryId
  )
  const selectedStory = find(allStories, story => story.id === selectedStoryId)

  return {
    allStories,
    selectedStoryId,
    selectedStory,
  }
}

const Navigation = ({ isMobile }: NavigationProps) => {
  const [mobileNavDrawerOpen, setMobileNavDrawerOpen] = React.useState(false)

  const { allStories, selectedStoryId, selectedStory } = useReduxData()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const changeDrawerState = () => {
    setMobileNavDrawerOpen(!mobileNavDrawerOpen)
  }

  if (isMobile) {
    return (
      <React.Fragment>
        <MobileTopNav
          changeDrawerState={changeDrawerState}
          selectedStory={selectedStory?.name as string}
          currentPathname={location.pathname}
        />

        <Drawer
          variant="temporary"
          open={mobileNavDrawerOpen}
          onClose={() => setMobileNavDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            minHeight: 0,
            // flexGrow: 1,
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '80vw',
            },
          }}
        >
          <NavBar
            isMobile={isMobile}
            currentPathname={location.pathname}
            allStories={allStories}
            selectedStoryId={selectedStoryId as string}
            navigate={navigate}
            editStoryName={story => dispatch(editStoryName(story))}
            selectStoryId={id => dispatch(selectStoryId(id))}
            addStory={story => dispatch(addStory(story))}
            deleteStory={id => dispatch(deleteStory(id))}
            changeDrawerState={changeDrawerState}
          />
        </Drawer>
      </React.Fragment>
    )
  }
  return (
    <NavBar
      isMobile={isMobile}
      currentPathname={location.pathname}
      allStories={allStories}
      selectedStoryId={selectedStoryId as string}
      navigate={navigate}
      editStoryName={(id, name) => dispatch(editStoryName({ id, name }))}
      selectStoryId={id => dispatch(selectStoryId(id))}
      addStory={story => dispatch(addStory(story))}
      deleteStory={id => dispatch(deleteStory(id))}
      changeDrawerState={changeDrawerState}
    />
  )
}

interface MobileTopNavProps {
  changeDrawerState: (isOpen: boolean) => void
  selectedStory: string
  currentPathname: string
}

const MobileTopNav = ({
  changeDrawerState,
  selectedStory,
  currentPathname,
}: MobileTopNavProps) => {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 0,
        minHeight: 0,
        padding: '0px 18px',
        height: '55px',
        alignItems: 'center',
        background: '#181818',
        borderBottom: '1px solid #282636',
      }}
    >
      <div style={{ flexGrow: '1' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => changeDrawerState(true)}
          style={{ height: '35px', width: 'auto' }}
        >
          <MenuIcon
            style={{ height: '35px', width: 'auto', color: '#858585' }}
          />
        </IconButton>
      </div>

      {currentPathname === '/home' ? (
        <Typography
          // @ts-ignore
          variant={'h5_mobile'}
          style={{
            marginLeft: '12px',
            fontSize: '20px',
            textTransform: 'none',
            color: '#858585',
          }}
        >
          Home
        </Typography>
      ) : (
        <Typography
          // @ts-ignore
          variant={'h5_mobile'}
          style={{
            marginLeft: '12px',
            fontSize: '20px',
            textTransform: 'none',
            color: '#858585',
          }}
        >
          {selectedStory}
        </Typography>
      )}
    </nav>
  )
}

export default Navigation
