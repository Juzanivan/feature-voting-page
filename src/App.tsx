import { useKV } from '@github/spark/hooks'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/sonner'
import { PostCard } from '@/components/PostCard'
import { NewPostDialog } from '@/components/NewPostDialog'
import { EmptyState } from '@/components/EmptyState'
import type { Post, UserVote } from '@/lib/types'

function App() {
  const [posts, setPosts] = useKV<Post[]>('posts', [])
  const [userVotes, setUserVotes] = useKV<UserVote[]>('user-votes', [])
  
  const handleCreatePost = (title: string, description: string) => {
    const newPost: Post = {
      id: crypto.randomUUID(),
      title,
      description,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString()
    }
    
    setPosts((currentPosts) => [newPost, ...(currentPosts || [])])
  }
  
  const handleVote = (postId: string, vote: 'up' | 'down') => {
    const existingVote = (userVotes || []).find((v) => v.postId === postId)
    
    setPosts((currentPosts) =>
      (currentPosts || []).map((post) => {
        if (post.id !== postId) return post
        
        let newUpvotes = post.upvotes
        let newDownvotes = post.downvotes
        
        if (existingVote) {
          if (existingVote.vote === 'up') {
            newUpvotes -= 1
          } else {
            newDownvotes -= 1
          }
        }
        
        if (!existingVote || existingVote.vote !== vote) {
          if (vote === 'up') {
            newUpvotes += 1
          } else {
            newDownvotes += 1
          }
        }
        
        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes
        }
      })
    )
    
    setUserVotes((currentVotes) => {
      const filtered = (currentVotes || []).filter((v) => v.postId !== postId)
      
      if (!existingVote || existingVote.vote !== vote) {
        return [...filtered, { postId, vote }]
      }
      
      return filtered
    })
  }
  
  const sortedPosts = [...(posts || [])].sort((a, b) => {
    const scoreA = a.upvotes - a.downvotes
    const scoreB = b.upvotes - b.downvotes
    return scoreB - scoreA
  })
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Features Vote
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Share ideas and vote on what matters most
            </p>
          </div>
          
          <NewPostDialog onCreatePost={handleCreatePost} />
        </div>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          {sortedPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4 pr-4">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userVote={(userVotes || []).find((v) => v.postId === post.id)}
                  onVote={handleVote}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App