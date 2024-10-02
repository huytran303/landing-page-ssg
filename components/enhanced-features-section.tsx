'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Puzzle, Zap, Users, Book } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-400 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
      <CardHeader>
        <div className="mb-4 p-3 bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl md:text-2xl mb-2 text-blue-400 group-hover:text-purple-400 transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
)

const features = [
  {
    icon: <Puzzle className="w-8 h-8 text-white" />,
    title: 'Diverse Problem Set',
    description: 'Explore a wide range of coding challenges across various difficulty levels and topics, designed to enhance your problem-solving skills.'
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: 'Real-time Feedback',
    description: 'Receive instant feedback on your code submissions, helping you identify and correct errors quickly for a more efficient learning experience.'
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: 'Competitive Contests',
    description: 'Participate in exciting coding competitions to challenge yourself, compete with peers, and improve your skills in a fun, engaging environment.'
  },
  {
    icon: <Book className="w-8 h-8 text-white" />,
    title: 'Learning Resources',
    description: 'Access a comprehensive library of tutorials, articles, and video lessons to support your learning journey and master new programming concepts.'
  },
]

export function EnhancedFeaturesSectionComponent() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}