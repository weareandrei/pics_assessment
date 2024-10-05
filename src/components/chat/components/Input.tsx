import React, { CSSProperties, useState } from 'react'
import { IconButton, InputBase, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CommentIcon from '@mui/icons-material/Comment'
import { AnyFunction, AsyncFunction } from '../../../../lib/type'

interface InputProps {
  isMobile: boolean
  placeholder?: string
  sx?: object
  onChange?: AnyFunction | AsyncFunction
  onSubmit?: AnyFunction | AsyncFunction
  onGetRandomComment?: AnyFunction | AsyncFunction
}

const Input = ({
  isMobile = false,
  placeholder = '',
  sx = {},
  onSubmit = (prompt: string) => {},
  onChange = () => {},
  onGetRandomComment = () => {},
}: InputProps) => {
  const [prompt, setPrompt] = useState('')

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.target.value)
    onChange(event.target.value)
  }

  const handleEnterPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      setPrompt('')
      onSubmit(prompt)
    }
  }

  const handleSendButtonClick = (event: any) => {
    setPrompt('')
    onSubmit(prompt)
  }

  const fetchRandomComment = async () => {
    try {
      const response = await fetch('https://dummyjson.com/comments')
      const data = await response.json()
      const randomComment =
        data.comments[Math.floor(Math.random() * data.comments.length)]
      onGetRandomComment({
        contents: randomComment.body,
        author: randomComment.user.username,
        likesCount: randomComment.likes,
      })
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  return (
    <div style={{ ...style.inputContainer, ...sx }}>
      <InputBase
        inputProps={{ 'data-testid': 'comment-input' }} // Add this line
        style={{
          flex: 1,
          color: '#CFCED9',
          fontSize: isMobile ? '16px' : '14px',
          fontWeight: '200',
          maxHeight: '150px',
          overflow: 'scroll',
          margin: '5px 12px',
          marginLeft: '12px',
        }}
        autoFocus
        fullWidth
        multiline
        placeholder={placeholder}
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={event => handleEnterPress(event)}
      />

      {isMobile ? (
        <IconButton
          type="button"
          sx={{
            height: '70%',
            width: 'auto',
            padding: '5px',
            margin: 'auto',
            marginRight: '5px',
            borderRadius: '5px',
          }}
          aria-label="get-random-comment"
          onClick={fetchRandomComment}
        >
          <CommentIcon style={{ color: '#616AAA' }} />
        </IconButton>
      ) : (
        <Button
          sx={{
            height: '70%',
            width: 'auto',
            padding: '5px',
            margin: 'auto',
            marginRight: '5px',
            borderRadius: '5px',
            fontSize: '12px',
            textTransform: 'none',
            color: '#616AAA',
          }}
          onClick={fetchRandomComment}
        >
          Get random comment
        </Button>
      )}

      <IconButton
        type="button"
        sx={{
          height: '70%',
          width: 'auto',
          padding: '5px',
          margin: 'auto',
          marginRight: '5px',
          borderRadius: '5px',
        }}
        aria-label="send"
        onClick={event => handleSendButtonClick(event)}
      >
        <SendIcon style={{ color: '#616AAA' }} />
      </IconButton>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0px 12px 0px',
    border: '1px solid #423F59',
    borderRadius: '5px',
    maxHeight: '550px',
  },
}

export type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

export default Input
