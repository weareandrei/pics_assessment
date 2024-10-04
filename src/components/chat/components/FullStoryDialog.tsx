import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'

interface FullStoryDialogProps {
  comments: string[]
  storyName: string
  isMobile: boolean
  open: boolean
  handleClose: () => void
}

const FullStoryDialog: React.FC<FullStoryDialogProps> = ({
  comments,
  storyName,
  isMobile,
  open,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={!isMobile}
      aria-labelledby="full-story-dialog-title"
      PaperProps={{
        sx: {
          backgroundColor: '#18191A',
          width: '600px',
          height: '500px',
          maxWidth: '90%',
          maxHeight: '90%',
        },
      }}
    >
      <DialogTitle
        id="full-story-dialog-title"
        sx={{
          color: 'white',
          position: 'relative',
          paddingRight: '48px',
          background: '#242526',
        }}
      >
        <Typography variant="h4" component="div" sx={{ color: '#D0D0D0' }}>
          {storyName}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{ whiteSpace: 'pre-line', maxHeight: '60vh', overflowY: 'auto' }}
        >
          {comments.map((comment, index) => (
            <Typography
              key={index}
              variant="h5"
              component="p"
              sx={{ color: '#D0D0D0', marginBottom: '8px' }}
            >
              {comment}
            </Typography>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default FullStoryDialog
