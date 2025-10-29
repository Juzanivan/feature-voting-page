import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

type NewPostDialogProps = {
  onCreatePost: (title: string, description: string) => void
}

export function NewPostDialog({ onCreatePost }: NewPostDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('Please enter a title for your idea')
      return
    }
    
    onCreatePost(title.trim(), description.trim())
    setTitle('')
    setDescription('')
    setOpen(false)
    toast.success('Idea created successfully!')
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Idea
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share Your Idea</DialogTitle>
          <DialogDescription>
            Submit a new feature suggestion for the community to vote on.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Brief, descriptive title for your idea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Explain your idea in detail (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-base min-h-[120px] resize-none"
              maxLength={1000}
            />
            <p className="text-sm text-muted-foreground">
              {description.length}/1000 characters
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Idea
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
