import React, { CSSProperties } from 'react'
import Typography from '@mui/material/Typography'
import { AnyFunction, type Comment } from '../../../../lib/type'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'

interface ChatCommentProps {
  isMobile: boolean
  comment: Comment
  likeComment: AnyFunction
}

const ChatComment = ({ isMobile, comment, likeComment }: ChatCommentProps) => {
  const getMessageStyle = (otherUser: boolean): CSSProperties => {
    return {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: isMobile ? '75%' : '65%',
      minWidth: '250px',
      marginLeft: !otherUser ? 'auto' : 'null',
      marginRight: otherUser ? 'auto' : 'null',
      marginBottom: '35px',
      color: '#CFCED9',
      background: otherUser ? '#242526' : '#616AAA',
      padding: '10px 16px',
      borderRadius: '15px',
      width: 'fit-content',
      wordWrap: 'break-word',
    }
  }

  return (
    <div style={getMessageStyle(comment.author !== '')}>
      {comment.author !== '' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '6px',
          }}
        >
          <PersonIcon
            sx={{
              height: '18px',
              width: '18px',
              marginRight: '8px',
              color: '#7b84c5',
            }}
          />
          <Typography variant={'h5'} sx={{ color: '#7b84c5' }}>
            {comment.author}
          </Typography>
        </div>
      )}
      <Typography variant={'h6'}>{comment.contents}</Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{ borderRadius: '5px', padding: '4px 8px' }}
          onClick={() => likeComment(comment.id)}
        >
          <Typography variant={'caption'} sx={{ marginRight: '5px' }}>
            {comment.likesCount}
          </Typography>
          <FavoriteIcon
            sx={{
              height: '15px',
              width: '15px',
              color: comment.userLiked ? 'red' : '#CFCED9',
            }}
          />
        </IconButton>
      </div>
    </div>
  )
}

export default ChatComment
