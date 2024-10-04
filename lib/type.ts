type AsyncFunction = (...args: any[]) => Promise<any>
type AnyFunction = (...args: any[]) => any

type Comment = {
  id: string
  storyId: string
  contents: string
  author: string
  likesCount: number
  userLiked: boolean
}

interface Story {
  id: string
  name: string
}

export {
  type AsyncFunction,
  type AnyFunction,
  type Comment,
  type Story
}
