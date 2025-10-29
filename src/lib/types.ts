export type Post = {
  id: string
  title: string
  description: string
  upvotes: number
  downvotes: number
  createdAt: string
}

export type UserVote = {
  postId: string
  vote: 'up' | 'down'
}
