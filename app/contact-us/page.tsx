<<<<<<< HEAD
"use client";

import type React from "react";
import { JSX, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { FooterContent } from "@/components/footer-content";
import { StaticScene } from "@/components/scene/static-scene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  Globe,
  Users,
  Settings,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { sendContactEmail } from "@/lib/emailService";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
=======
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
>>>>>>> main

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
<<<<<<< HEAD
};

// Type definitions
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "success" | "error" | null;

export default function ContactUsPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const resetStatusMessage = (): void => {
    setSubmitStatus(null);
  };
=======
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
>>>>>>> main

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
<<<<<<< HEAD
            style={{ width: "100%", height: "100%" }}
=======
            style={{ width: '100%', height: '100%' }}
>>>>>>> main
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
<<<<<<< HEAD
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Contact <span className="text-[#00A8E0]">Us</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
                Ready to Begin Your Digital Transformation?
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Connect with our experts to discuss your specific challenges and
                discover how our cloud, AI, and automation solutions can
                accelerate your business growth. Schedule a consultation or
                reach out directly.
=======
            <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={sectionVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your business? Get in touch with our experts and let's discuss your next project.
>>>>>>> main
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
<<<<<<< HEAD
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Send us a Message
                </h2>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 bg-green-900/30 border border-green-600/50 rounded-lg backdrop-blur-sm mb-6"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 font-medium">
                          Message sent successfully!
                        </p>
                        <p className="text-green-300 text-sm">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={resetStatusMessage}
                        className="ml-auto text-green-400 hover:text-green-300 transition-colors"
                        aria-label="Close success message"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-600/50 rounded-lg backdrop-blur-sm mb-6"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-medium">
                          Failed to send message
                        </p>
                        <p className="text-red-300 text-sm">
                          Please try again or contact us directly at
                          info@intel-cs.com
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={resetStatusMessage}
                        className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Close error message"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
=======
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
>>>>>>> main
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
<<<<<<< HEAD
                        className={`bg-gray-800 border-gray-600 text-white focus:border-[#006398] ${
                          errors.name
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
=======
                        className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
>>>>>>> main
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
<<<<<<< HEAD
                        className={`bg-gray-800 border-gray-600 text-white focus:border-[#006398] ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        placeholder="your.email@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
=======
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
>>>>>>> main
                    </div>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
=======
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
>>>>>>> main
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
<<<<<<< HEAD
                      className={`bg-gray-800 border-gray-600 text-white focus:border-[#006398] ${
                        errors.subject
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="What can we help you with?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
=======
                      className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
>>>>>>> main
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
<<<<<<< HEAD
                      className={`bg-gray-800 border-gray-600 text-white focus:border-[#006398] ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
=======
                      className="bg-gray-800 border-gray-600 text-white focus:border-[#006398]"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
>>>>>>> main
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#006398] hover:bg-[#004d7a] text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
<<<<<<< HEAD
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
=======
                      <>Sending...</>
>>>>>>> main
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
<<<<<<< HEAD
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
=======
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  We're here to help you navigate your digital transformation journey. Reach out to us through any of
                  the channels below.
                </p>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
>>>>>>> main
                    variants={cardVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <MapPin className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
<<<<<<< HEAD
                      <h3 className="font-semibold mb-1">Dubai Headquarters</h3>
                      <p className="text-gray-300">
                        iNTEL-CS Dubai, United Arab Emirates
                      </p>
=======
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-300">Dubai, United Arab Emirates</p>
                      {/* <p className="text-sm text-gray-400 mt-1"></p> */}
>>>>>>> main
                    </div>
                  </motion.div>

                  <motion.div
<<<<<<< HEAD
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
=======
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
>>>>>>> main
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <Phone className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-300">(+971) 4 835 8795</p>
<<<<<<< HEAD
                      <p className="text-sm text-gray-400 mt-1">
                        Available during business hours
                      </p>
=======
                      <p className="text-sm text-gray-400 mt-1">Available during business hours</p>
>>>>>>> main
                    </div>
                  </motion.div>

                  <motion.div
<<<<<<< HEAD
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
=======
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
>>>>>>> main
                    variants={cardVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <Mail className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-300">info@intel-cs.com</p>
<<<<<<< HEAD
                      <p className="text-sm text-gray-400 mt-1">
                        We'll respond within 24 hours
                      </p>
=======
                      <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours</p>
>>>>>>> main
                    </div>
                  </motion.div>

                  <motion.div
<<<<<<< HEAD
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.5 }}
=======
                    className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.4 }}
>>>>>>> main
                  >
                    <Clock className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <div className="text-gray-300 space-y-1">
<<<<<<< HEAD
                        <p>Sunday - Thursday: 9:00 AM - 6:00 PM (GST)</p>
                        <p className="text-sm text-[#00A8E0]">
                          24/7 Emergency Support Available
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Get Started Options Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Get Started <span className="text-[#00A8E0]">Options</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#00A8E0]/50 transition-all duration-300 flex flex-col h-full"
                variants={cardVariants}
                transition={{ delay: 0.1 }}
              >
                <Settings className="w-12 h-12 text-[#006398] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Free Cloud Assessment
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  Comprehensive evaluation of your current infrastructure with
                  migration roadmap and cost analysis.
                </p>
                <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white mt-auto">
                  Schedule Assessment
                </Button>
              </motion.div>

              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#00A8E0]/50 transition-all duration-300 flex flex-col h-full"
                variants={cardVariants}
                transition={{ delay: 0.2 }}
              >
                <MessageSquare className="w-12 h-12 text-[#006398] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  AI Readiness Consultation
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  Discover AI opportunities specific to your industry and
                  business processes.
                </p>
                <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white mt-auto">
                  Book AI Consultation
                </Button>
              </motion.div>

              <motion.div
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#00A8E0]/50 transition-all duration-300 flex flex-col h-full"
                variants={cardVariants}
                transition={{ delay: 0.3 }}
              >
                <Users className="w-12 h-12 text-[#006398] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Custom Solution Workshop
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  Collaborative session to design solutions aligned with your
                  business objectives.
                </p>
                <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white mt-auto">
                  Request Workshop
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Service <span className="text-[#00A8E0]">Areas</span>
                </h2>

                <div className="space-y-6">
                  <div className="bg-black/40 backdrop-blur-sm hover:border-[#006398] transition-all duration-300 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Primary Markets
                    </h3>
                    <p className="text-gray-300">
                      UAE, Saudi Arabia, Kuwait, Oman, Bahrain, Qatar
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl hover:border-[#006398] transition-all duration-300 p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Expertise Delivery
                    </h3>
                    <p className="text-gray-300">
                      Global (Remote and On-site Available)
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl hover:border-[#006398] transition-all duration-300 p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Partnership Inquiries
                    </h3>
                    <p className="text-gray-300 mb-3">
                      Interested in becoming a technology partner or reseller?
                      Contact our partnership team to explore collaboration
                      opportunities.
                    </p>
                    <p className="text-[#00A8E0]">
                      Email: partnerships@intel-cs.com
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-[#006398]/20 to-[#00A8E0]/20 rounded-3xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Support Center
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Existing clients can access our support portal for technical
                    assistance, resource requests, and service updates.
                  </p>
                  <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white mb-6">
                    Client Portal Login
                  </Button>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-[#00A8E0] mb-4">
                      Let's Transform Your Business Together
                    </h4>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#006398] to-[#00A8E0] hover:from-[#004d7a] hover:to-[#007bb8] text-white py-3 text-lg font-semibold"
                    >
                      Start Conversation
                    </Button>
                  </div>
                </div>
=======
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
>>>>>>> main
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
<<<<<<< HEAD
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Need Immediate Assistance?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                For urgent inquiries or immediate support, don't hesitate to
                call us directly.
=======
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Need Immediate Assistance?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                For urgent inquiries or immediate support, don't hesitate to call us directly.
>>>>>>> main
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
<<<<<<< HEAD
  );
}
=======
  )
}
>>>>>>> main
