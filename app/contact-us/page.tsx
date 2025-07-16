"use client"

import type React from "react"

import Head from "next/head"
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { FooterContent } from "@/components/footer-content"
import { StaticScene } from "@/components/scene/static-scene"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-black text-white relative">
      <div className="fixed inset-0 z-0">
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
              <Loader2 className="w-12 h-12 animate-spin text-[#006398]" />
            </div>
          }
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, 12], fov: 30 }}
            style={{ width: '100%', height: '100%' }}
          >
            <StaticScene />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={sectionVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your business? Get in touch with our experts and let's discuss your next project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#006398] hover:bg-[#004d7a] text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  We're here to help you navigate your digital transformation journey. Reach out to us through any of
                  the channels below.
                </p>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <MapPin className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-300">Dubai, United Arab Emirates</p>
                      {/* <p className="text-sm text-gray-400 mt-1"></p> */}
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <Phone className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-300">(+971) 4 835 8795</p>
                      <p className="text-sm text-gray-400 mt-1">Available during business hours</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <Mail className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-300">info@intel-cs.com</p>
                      <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.4 }}
                  >
                    <Clock className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <div className="text-gray-300 space-y-1">
                        <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                        <p>Friday - Saturday: Closed</p>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">UAE Time (GMT+4)</p>
                    </div>
                  </motion.div>
                </div>

                {/* Map Placeholder */}
                <motion.div
                  className="mt-8 bg-gray-800/50 rounded-lg border border-gray-700 h-64 flex items-center justify-center backdrop-blur-sm"
                  variants={cardVariants}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#006398] mx-auto mb-2" />
                    <p className="text-gray-300">Interactive Map</p>
                    <p className="text-sm text-gray-400">Dubai, UAE Location</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Need Immediate Assistance?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                For urgent inquiries or immediate support, don't hesitate to call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-8 py-3 text-lg font-semibold rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (+971) 4 835 8795
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#006398] text-[#006398] hover:bg-[#006398] hover:text-white px-8 py-3 text-lg font-semibold rounded-full bg-transparent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <FooterContent />
        </section>
      </div>
    </div>
  )
}