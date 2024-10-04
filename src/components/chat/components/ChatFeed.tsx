import { map } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { AnyFunction, type Comment } from '../../../../lib/type'
import ChatComment from './ChatComment'

interface ChatFeedProps {
  isMobile: boolean
  selectedComments: Comment[]
  likeComment: AnyFunction
}

export const ChatFeed = ({
  isMobile,
  selectedComments,
  likeComment,
}: ChatFeedProps) => {
  const feedEndRef = useRef<HTMLDivElement | null>(null)
  const [previousCommentsCount, setPreviousCommentsCount] = useState(0)

  useEffect(() => {
    if (feedEndRef.current && selectedComments.length > previousCommentsCount) {
      feedEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    setPreviousCommentsCount(selectedComments.length)
  }, [selectedComments])

  return (
    <div
      style={{
        minHeight: '0',
        marginTop: 'auto',
        overflow: 'scroll',
        overscrollBehavior: 'contain',
        padding: '24px 14%',
      }}
    >
      {map(selectedComments, comment => (
        <ChatComment
          key={comment.id}
          comment={comment}
          isMobile={isMobile}
          likeComment={likeComment}
        />
      ))}
      <div ref={feedEndRef} />
    </div>
  )
}
