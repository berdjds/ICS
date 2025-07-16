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
import { Cloud, Server, Shield, Zap, ArrowRight, CheckCircle, Users, Clock, Award, Loader2 } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function CloudServicesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Cloud Services</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Accelerate your digital transformation with comprehensive cloud solutions, AWS migration services, and
                24/7 managed support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cloud Offerings Overview */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Our Cloud Offerings</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                From migration to management, we provide end-to-end cloud solutions tailored to your business needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* AWS Migration */}
              <motion.div
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                transition={{ delay: 0.1 }}
              >
                <Cloud className="w-12 h-12 text-[#006398] mb-4" />
                <h3 className="text-xl font-bold mb-3">AWS Migration</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Seamless migration to AWS with minimal downtime and maximum efficiency.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Assessment & Planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Data Migration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Application Modernization</span>
                  </li>
                </ul>
              </motion.div>

              {/* Managed Services */}
              <motion.div
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                transition={{ delay: 0.2 }}
              >
                <Server className="w-12 h-12 text-[#006398] mb-4" />
                <h3 className="text-xl font-bold mb-3">Managed Services</h3>
                <p className="text-gray-300 text-sm mb-4">
                  24/7 monitoring and management of your cloud infrastructure.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Infrastructure Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Cost Management</span>
                  </li>
                </ul>
              </motion.div>

              {/* Security & Compliance */}
              <motion.div
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                transition={{ delay: 0.3 }}
              >
                <Shield className="w-12 h-12 text-[#006398] mb-4" />
                <h3 className="text-xl font-bold mb-3">Security & Compliance</h3>
                <p className="text-gray-300 text-sm mb-4">Enterprise-grade security with compliance frameworks.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Security Assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Compliance Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Threat Detection</span>
                  </li>
                </ul>
              </motion.div>

              {/* DevOps & Automation */}
              <motion.div
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                transition={{ delay: 0.4 }}
              >
                <Zap className="w-12 h-12 text-[#006398] mb-4" />
                <h3 className="text-xl font-bold mb-3">DevOps & Automation</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Streamlined deployment and continuous integration pipelines.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>CI/CD Pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Infrastructure as Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-[#006398]" />
                    <span>Automated Scaling</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Migration Process Diagram */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Our Migration Process</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                A proven 6-step methodology ensuring successful cloud transformation.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              {[
                { step: "01", title: "Assessment", desc: "Current state analysis" },
                { step: "02", title: "Strategy", desc: "Migration planning" },
                { step: "03", title: "Design", desc: "Architecture design" },
                { step: "04", title: "Migration", desc: "Data & app migration" },
                { step: "05", title: "Testing", desc: "Validation & testing" },
                { step: "06", title: "Optimization", desc: "Performance tuning" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm"
                  variants={cardVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-[#006398] mb-2">{item.step}</div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <motion.div variants={cardVariants} transition={{ delay: 0.1 }}>
                <Users className="w-12 h-12 text-[#006398] mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-gray-300">Successful Migrations</p>
              </motion.div>
              <motion.div variants={cardVariants} transition={{ delay: 0.2 }}>
                <Clock className="w-12 h-12 text-[#006398] mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <p className="text-gray-300">Uptime Guarantee</p>
              </motion.div>
              <motion.div variants={cardVariants} transition={{ delay: 0.3 }}>
                <Award className="w-12 h-12 text-[#006398] mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">AWS</div>
                <p className="text-gray-300">Advanced Partner</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Form Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Cloud Journey?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get a free consultation and custom migration strategy for your business.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 max-w-2xl mx-auto backdrop-blur-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Tell us about your cloud migration needs..."
                />
              </div>
              <Button type="submit" className="w-full bg-[#006398] hover:bg-[#004d7a] text-white py-3">
                Get Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <FooterContent />
        </section>
      </div>
    </div>
  )
}