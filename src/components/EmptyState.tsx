import { motion } from 'framer-motion'
import { Lightbulb } from '@phosphor-icons/react'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="bg-accent/10 rounded-full p-8 mb-6">
        <Lightbulb className="h-16 w-16 text-accent" weight="duotone" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-3">
        No Ideas Yet
      </h2>
      
      <p className="text-lg text-muted-foreground max-w-md mb-6">
        Be the first to share a feature suggestion! Click "New Idea" to get started.
      </p>
    </motion.div>
  )
}
