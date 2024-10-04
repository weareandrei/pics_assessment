import React, { CSSProperties, useState, useRef, useEffect } from 'react'
import { Button, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import DescriptionIcon from '@mui/icons-material/Description'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { AnyFunction } from '../../../../lib/type'

interface StoryButtonProps {
  isMobile: boolean
  onClick: () => void
  label: string
  isActive?: boolean
  edit?: boolean
  newStory?: boolean
  editStoryName?: AnyFunction
  deleteStory?: AnyFunction
}

const StoryButton = ({
  isMobile,
  onClick,
  label,
  isActive = false,
  edit = false,
  newStory = false,
  deleteStory,
  editStoryName,
}: StoryButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedLabel, setEditedLabel] = useState(label)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    // Prevents the button click event from firing
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleRename = () => {
    setIsEditing(true)
    handleMenuClose()
  }

  const handleDelete = () => {
    console.log('Delete action triggered')
    if (deleteStory) {
      deleteStory()
    }
    handleMenuClose()
  }

  const style: { [key: string]: CSSProperties } = {
    horizontalFlex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainButton: {
      width: '100%',
      justifyContent: 'space-between',
      padding: '6px',
      marginTop: '2px',
    },
    iconStyle: {
      height: isMobile ? '28px' : '20px',
      width: 'auto',
      color: isHovered ? '#D9D9D9' : '#858585',
    },
    textStyle: {
      marginLeft: '15px',
      color: isHovered ? '#FFFFFF' : '#D0D0D0',
      fontSize: isMobile ? '14px' : '13px',
      fontWeight: isMobile ? '400' : '300',
      textTransform: 'none',
    },
    inputStyle: {
      marginLeft: '15px',
      fontSize: isMobile ? '14px' : '13px',
      fontWeight: isMobile ? '400' : '300',
      backgroundColor: '#3A3B3C',
      border: 'none',
      color: '#FFFFFF',
      outline: 'none',
      width: '100%',
    },
    editIconStyle: {
      height: '12px',
      marginRight: '8px',
    },
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        editStoryName
      ) {
        setIsEditing(false)
      }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && editStoryName) {
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  useEffect(() => {
    if (editedLabel !== label && editStoryName) {
      editStoryName(editedLabel)
    }
  }, [isEditing])

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...style.horizontalFlex,
        ...style.mainButton,
        '&:hover': {
          backgroundColor: '#3A3B3C',
        },
        backgroundColor: isActive ? '#3A3B3C' : 'auto',
      }}
    >
      <div style={{ ...style.horizontalFlex, justifyContent: 'start' }}>
        {newStory ? (
          <AddCircleIcon
            style={{
              ...style.iconStyle,
              color: isHovered ? '#6E76C4' : '#616AAA',
            }}
          />
        ) : (
          <DescriptionIcon style={style.iconStyle} />
        )}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedLabel}
            onChange={e => setEditedLabel(e.target.value)}
            style={style.inputStyle}
            autoFocus
          />
        ) : (
          <Typography
            variant={'h6'}
            style={{
              ...style.textStyle,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'left',
              width: '100px',
            }}
          >
            {editedLabel}
          </Typography>
        )}
      </div>
      {edit && (
        <>
          <IconButton
            onClick={handleMenuClick}
            sx={{ borderRadius: '5px' }}
            onMouseDown={e => e.stopPropagation()} // prevent triggering parent click
          >
            <MoreVertIcon style={style.iconStyle} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={e => e.stopPropagation()}
          >
            <MenuItem onClick={handleRename}>
              <ListItemIcon>
                <CreateIcon style={style.editIconStyle} />
              </ListItemIcon>
              <Typography variant="h5">Rename</Typography>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon style={style.editIconStyle} />
              </ListItemIcon>
              <Typography variant="h5">Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </Button>
  )
}

export default StoryButton
