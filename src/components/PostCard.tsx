import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CaretUp, CaretDown } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Post, UserVote } from '@/lib/types'
import { cn } from '@/lib/utils'

type PostCardProps = {
  post: Post
  userVote?: UserVote
  onVote: (postId: string, vote: 'up' | 'down') => void
}

export function PostCard({ post, userVote, onVote }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const score = post.upvotes - post.downvotes
  const isLongDescription = post.description.length > 200
  const displayDescription = isExpanded || !isLongDescription 
    ? post.description 
    : post.description.slice(0, 200) + '...'
  
  const hasVotedUp = userVote?.vote === 'up'
  const hasVotedDown = userVote?.vote === 'down'
  
  const handleVote = (vote: 'up' | 'down') => {
    onVote(post.id, vote)
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2 min-w-[60px]">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full transition-all",
                hasVotedUp 
                  ? "bg-upvote text-upvote-foreground hover:bg-upvote/90" 
                  : "hover:bg-muted text-muted-foreground hover:text-upvote"
              )}
              onClick={() => handleVote('up')}
            >
              <CaretUp className="h-6 w-6" weight={hasVotedUp ? 'fill' : 'regular'} />
            </Button>
            
            <Badge 
              variant={score > 0 ? 'default' : score < 0 ? 'destructive' : 'secondary'}
              className={cn(
                "font-semibold text-base px-3 py-1",
                score > 0 && "bg-upvote text-upvote-foreground",
                score === 0 && "bg-muted text-muted-foreground"
              )}
            >
              {score > 0 ? '+' : ''}{score}
            </Badge>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full transition-all",
                hasVotedDown 
                  ? "bg-downvote text-downvote-foreground hover:bg-downvote/90" 
                  : "hover:bg-muted text-muted-foreground hover:text-downvote"
              )}
              onClick={() => handleVote('down')}
            >
              <CaretDown className="h-6 w-6" weight={hasVotedDown ? 'fill' : 'regular'} />
            </Button>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              {post.title}
            </h2>
            
            <p className="text-base text-foreground/80 leading-relaxed mb-3 whitespace-pre-wrap">
              {displayDescription || <span className="text-muted-foreground italic">No description provided</span>}
            </p>
            
            {isLongDescription && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </Button>
            )}
            
            <div className="text-sm text-muted-foreground mt-3">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
