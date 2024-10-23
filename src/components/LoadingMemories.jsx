"use client"

import { motion } from "framer-motion"

const PostSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full mx-auto">
    <div className="flex items-center space-x-4 mb-4">
      <motion.div
        className="w-12 h-12 bg-gray-300 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="h-4 bg-gray-300 rounded w-1/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <motion.div
      className="w-full h-64 bg-gray-300 rounded-lg mb-4"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="h-4 bg-gray-300 rounded w-3/4 mb-2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="h-4 bg-gray-300 rounded w-1/2"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
)

const ChatSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4 max-w-sm w-full mx-auto mt-8">
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`h-8 bg-gray-300 rounded-full w-${i === 2 ? '3/4' : '2/3'} ${
            i % 2 === 0 ? 'ml-auto' : ''
          }`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  </div>
)

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <PostSkeleton />
        <ChatSkeleton />
      </div>
    </div>
  )
}