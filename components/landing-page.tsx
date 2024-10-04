'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { PlusSquare, ChevronDown, Facebook, Mail, Menu, X } from 'lucide-react'
import { EnhancedFeaturesSectionComponent } from './enhanced-features-section'
import EnhancedTeamSection from './enhanced-team-section'
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
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
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

export default function EnhancedMobileFriendlyLandingPageComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const aboutUsRef = useRef<HTMLElement>(null)

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
    setIsMenuOpen(false)
  }

  const scrollToNextSection = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' })
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
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white">
            Try Now
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-16 bg-gray-900 shadow-lg p-4 md:hidden z-40"
        >
          <nav className="flex flex-col space-y-4">
            {['home', 'about-us', 'team', 'features', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm hover:text-blue-400 transition-colors py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              Try Now
            </Button>
          </nav>
        </motion.div>
      )}

      <main className="pt-16">
        <AnimatedSection id="home">
          <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center">
                <motion.div
                  className="w-full md:w-1/2 mb-10 md:mb-0"
                  initial="hidden"
                  animate="visible"
                  variants={slideIn}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome to FUOJ
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-300">
                    Empowering developers with cutting-edge tools for seamless coding experiences.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="w-full md:w-1/2"
                  initial="hidden"
                  animate="visible"
                  variants={zoomIn}
                >
                  <div className="relative aspect-video">
                    <Image
                      src="/FUOJ.png"
                      alt="FUOJ Illustration"
                      fill
                      className="rounded-lg shadow-2xl object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={scrollToNextSection}
                aria-label="Scroll to next section"
              >
                <ChevronDown className="w-8 h-8" />
              </motion.button>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection id="about-us">
          <section ref={aboutUsRef} className="py-20 bg-gray-800 bg-opacity-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                About Us
              </h2>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                <div className="lg:w-1/2">
                  <p className="text-base md:text-lg mb-6 text-gray-300">
                    At FUOJ, we are driven by the vision of becoming the leading platform for programming skill learning and assessment at FPT University. Our goal is to create an effective and innovative learning environment that empowers students and supports educators.
                  </p>
                  <p className="text-base md:text-lg mb-6 text-gray-300">
                    Our mission is threefold:
                  </p>
                  <ul className="list-disc list-inside text-base md:text-lg mb-6 text-gray-300">
                    <li>Provide rapid and accurate automated grading tools for programming assignments.</li>
                    <li>Foster student&apos;s programming mindset through regular hands-on practice.</li>
                    <li>Offer educators an efficient and user-friendly system for managing and grading assignments.</li>
                  </ul>
                  <p className="text-base md:text-lg text-gray-300">
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
          <EnhancedTeamSection />
        </AnimatedSection>

        <AnimatedSection id="features">
          <EnhancedFeaturesSectionComponent />
        </AnimatedSection>

        <AnimatedSection id="contact">
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to elevate your coding experience?</h2>
              <p className="text-lg md:text-xl mb-8">Join thousands of developers who trust FUOJ for their projects.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
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