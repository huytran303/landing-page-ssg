'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from "@/components/ui/card"

const teamMembers = [
  { name: 'Nguyen Tuan Vu', role: 'Leader', image: '/tuanvu.jpg' },
  { name: 'Nguyen Dinh Phong', role: 'Developer Team', image: '/dinhphong.jpg' },
  { name: 'Nguyen Thanh Tung', role: 'Developer Team', image: '/tung.jpg' },
  { name: 'Tran Ngoc Huy', role: 'Sub Leader', image: '/ngochuy.jpg' },
  { name: 'Nguyen Chien Nguyen', role: 'Business Team', image: '/chiennguyen.jpg' },
  { name: 'Doan Cong Huy', role: 'Business Team', image: '/conghuy.jpg' },
  { name: 'Nguyen Xuan Kien', role: 'Business Team', image: '/kien.jpg' },
  { name: 'Khuat Dung An', role: 'Business Team', image: '/dungan.jpg' },
]

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
}

const MemberCard = ({ name, role, image }: MemberCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col items-center justify-between p-3 md:p-6 text-center bg-gray-800 bg-opacity-50 border-2 border-blue-400 hover:border-purple-500 transition-colors duration-300">
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto mb-2 md:mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover border-4 border-blue-400"
        />
      </div>
      <div>
        <h3 className="text-sm md:text-lg font-semibold mb-1">{name}</h3>
        <p className="text-xs md:text-sm text-gray-400">{role}</p>
      </div>
    </Card>
  </motion.div>
)

export default function EnhancedTeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Team
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <MemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}