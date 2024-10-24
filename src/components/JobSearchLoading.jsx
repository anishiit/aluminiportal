"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Search } from "lucide-react"

const SkeletonJob = () => (
  <Card className="mb-8 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
    <CardContent className="p-0">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <motion.div 
            className="w-full h-48 bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="lg:w-2/3 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 bg-gray-300" />
              <div>
                <motion.div 
                  className="h-4 w-24 bg-gray-300 rounded"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="h-3 w-20 bg-gray-200 rounded mt-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
          <motion.div 
            className="h-6 w-3/4 bg-gray-300 rounded mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="h-4 w-1/2 bg-gray-200 rounded mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="h-4 w-full bg-gray-200 rounded mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="h-4 w-3/4 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function JobSearchLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Find Your Dream</h1>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Job
          </motion.div>
        </motion.div>
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for jobs, companies, or locations..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg"
              disabled
            />
          </div>
          <div className="flex justify-center space-x-4">
            {['All', 'Jobs', 'Internships'].map((type, index) => (
              <motion.div
                key={type}
                className="h-6 w-20 bg-gray-200 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              />
            ))}
          </div>
        </div>
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <SkeletonJob />
          </motion.div>
        ))}
      </div>
    </div>
  )
}