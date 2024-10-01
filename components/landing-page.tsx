'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusSquare, Code, Zap, Users, Globe, Shield, Puzzle, Smartphone, ChevronDown, Facebook, Mail } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
}

const zoomIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } }
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
}

const AnimatedSection = ({ children, id }: AnimatedSectionProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function EnhancedLandingPageComponent() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <PlusSquare className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">
              <AnimatedText text="theseven++" />
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {['home', 'about-us', 'team', 'features', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Try Now
          </Button>
        </div>
      </header>

      <main>
        <AnimatedSection id="home">
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <motion.div
                  className="md:w-1/2 mb-10 md:mb-0"
                  initial="hidden"
                  animate="visible"
                  variants={slideIn}
                >
                  <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome to FUOJ
                  </h1>
                  <p className="text-xl mb-8 text-gray-300">
                    Empowering developers with cutting-edge tools for seamless coding experiences.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="md:w-1/2"
                  initial="hidden"
                  animate="visible"
                  variants={zoomIn}
                >
                  <div className="relative h-64 md:h-96">
                    <Image
                      src="/placeholder.svg?height=384&width=384"
                      alt="FUOJ Illustration"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg shadow-2xl"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-8 h-8 text-blue-400" />
            </motion.div>
          </section>
        </AnimatedSection>

        <AnimatedSection id="about-us">
          <section className="py-20 bg-gray-800 bg-opacity-50">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                About Us
              </h2>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                <div className="lg:w-1/2">
                  <p className="text-lg mb-6 text-gray-300">
                    At FUOJ, we are driven by the vision of becoming the leading platform for programming skill learning and assessment at FPT University. Our goal is to create an effective and innovative learning environment that empowers students and supports educators.
                  </p>
                  <p className="text-lg mb-6 text-gray-300">
                    Our mission is threefold:
                  </p>
                  <ul className="list-disc list-inside text-lg mb-6 text-gray-300">
                    <li>Provide rapid and accurate automated grading tools for programming assignments.</li>
                    <li>Foster student&apos; programming mindset through regular hands-on practice.</li>
                    <li>Offer educators an efficient and user-friendly system for managing and grading assignments.</li>
                  </ul>
                  <p className="text-lg text-gray-300">
                    By focusing on these key areas, we aim to revolutionize the way programming is taught and learned at FPT University, preparing students for successful careers in the ever-evolving world of technology.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="rounded-lg overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="/team.jpg"
                      alt="Our Vision"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection id="team">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: 'Alice Johnson', role: 'Founder & CEO', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Bob Smith', role: 'Lead Developer', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Carol Williams', role: 'UX Designer', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'David Brown', role: 'Backend Engineer', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Eva Martinez', role: 'Frontend Developer', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Frank Lee', role: 'DevOps Specialist', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Grace Kim', role: 'Product Manager', image: '/placeholder.svg?height=200&width=200' },
                  { name: 'Henry Nguyen', role: 'QA Engineer', image: '/placeholder.svg?height=200&width=200' },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="p-6 text-center bg-gray-800 bg-opacity-50 border-2 border-blue-400 hover:border-purple-500 transition-colors duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto mb-4 border-4 border-blue-400"
                      />
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-gray-400">{member.role}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection id="features">
          <section className="py-20 bg-gray-800 bg-opacity-50">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <Code className="h-12 w-12 mb-4 text-blue-400" />, title: 'Smart Coding', description: 'AI-powered code suggestions and auto-completion.' },
                  { icon: <Zap className="h-12 w-12 mb-4 text-blue-400" />, title: 'Lightning Fast', description: 'Optimized performance for seamless development.' },
                  { icon: <Users className="h-12 w-12 mb-4 text-blue-400" />, title: 'Collaboration', description: 'Real-time collaboration tools for team projects.' },
                  { icon: <Globe className="h-12 w-12 mb-4 text-blue-400" />, title: 'Cross-Platform', description: 'Work seamlessly across different devices and operating systems.' },
                  { icon: <Shield className="h-12 w-12 mb-4 text-blue-400" />, title: 'Secure', description: 'Advanced security measures to protect your code and data.' },
                  { icon: <Puzzle className="h-12 w-12 mb-4 text-blue-400" />, title: 'Extensible', description: 'Easily extend functionality with a robust plugin system.' },
                  { icon: <Smartphone className="h-12 w-12 mb-4 text-blue-400" />, title: 'Mobile-Friendly', description: 'Access your projects on-the-go with our mobile app.' },
                  { icon: <Code className="h-12 w-12 mb-4 text-blue-400" />, title: 'Multi-Language', description: 'Support for a wide range of programming languages and frameworks.' },
                ].map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-gray-900 bg-opacity-50 border-2 border-blue-400 hover:border-purple-500">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </motion.div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection id="contact">
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold mb-6">Ready to elevate your coding experience?</h2>
              <p className="text-xl mb-8">Join thousands of developers who trust FUOJ for their projects.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started Now
                </Button>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <PlusSquare className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">theseven++</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="mailto:thesevenplusplus@gmail.com" className="hover:text-blue-400 transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} theseven++. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}