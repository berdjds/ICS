"use client";

import type React from "react";
import { JSX, Suspense, useEffect, useState } from "react";
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
  Briefcase,
} from "lucide-react";
import { sendContactEmail } from "@/lib/emailService";
import Link from "next/link";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
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
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }
  }, []);

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
            style={{ width: "100%", height: "100%" }}
          >
            <StaticScene />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-4 md:pb-2 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
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
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-6 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
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
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
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
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
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
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#006398] hover:bg-[#004d7a] text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  {/* Apply for a job */}
                  <motion.a
                    href="/form/job"
                    rel="noopener noreferrer"
                    className="flex items-center mx-auto gap-3 p-4 w-full max-w-sm hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <Briefcase className="w-5 h-5 text-[#006398] flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Apply for a Job
                      </h3>
                      <p className="text-sm text-gray-400">
                        Join our team and grow with us
                      </p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="/form/consultation"
                    rel="noopener noreferrer"
                    className="flex items-center mx-auto gap-3 p-4 w-full max-w-sm hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <Briefcase className="w-5 h-5 text-[#006398] flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">consultation</h3>
                      <p className="text-sm text-gray-400">
                        Request a Free Cloud Assessment
                      </p>
                    </div>
                  </motion.a>
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <motion.a
                    href="https://maps.app.goo.gl/inWsM7kYLExKMp729"
                    target="_blank"
                    className="flex cursor-pointer items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <MapPin className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Dubai Headquarters</h3>
                      <p className="text-gray-300">
                        Office 2508, Concord Tower, Dubai Media City, Dubai
                        United Arab Emirates
                      </p>
                    </div>
                  </motion.a>
                  <motion.a
                    href={isMobile ? "tel:+97148358795" : undefined}
                    className={`flex  transition-all duration-300 items-start gap-4 p-4 rounded-lg border  backdrop-blur-sm ${
                      isMobile
                        ? "hover:border-[#006398] cursor-pointer"
                        : "pointer-events-none opacity-70"
                    } bg-gray-900/50 border-gray-800`}
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <Phone className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-300">+971 4 5774534</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Available during business hours
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/971585821533" // WhatsApp link without leading 0 and no special characters
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <MessageSquare className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <p className="text-gray-300 flex items-center gap-2">
                        +971 58 582 1533
                        <MessageSquare className="w-4 h-4 text-green-500" />{" "}
                        {/* WhatsApp icon */}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Available during business hours
                      </p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="mailto:info@intel-cs.com"
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <Mail className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-300">info@intel-cs.com</p>
                      <p className="text-sm text-gray-400 mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://wa.me/971585821533"
                    target="_blank"
                    className="flex items-start gap-4 p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: 0.5 }}
                  >
                    <Clock className="w-6 h-6 text-[#006398] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <div className="text-gray-300 space-y-1">
                        <p>Monday - Friday: 8:30 AM - 5:30 PM (GST)</p>
                        <p className="text-sm text-[#00A8E0]">
                          24/7 Emergency Support Available
                        </p>
                      </div>
                    </div>
                  </motion.a>
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
                <Link
                  href={"/contact-us"}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#006398] to-[#00A8E0] hover:from-[#004d7a] hover:to-[#007bb8] text-white mt-auto py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#006398]/30 hover:scale-105"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Schedule Assessment
                </Link>
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
                <Link
                  href={"/contact-us"}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#006398] to-[#00A8E0] hover:from-[#004d7a] hover:to-[#007bb8] text-white mt-auto py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#00A8E0]/30 hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Book AI Consultation
                </Link>
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
                <Link
                  href={"/contact-us"}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#006398] to-[#00A8E0] hover:from-[#004d7a] hover:to-[#007bb8] text-white mt-auto py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#006398]/30 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Request Workshop
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <div className=" gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Service <span className="text-[#00A8E0]">Areas</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Primary Markets Card */}
                  <motion.div
                    className="bg-gradient-to-br from-[#006398]/20 to-[#00A8E0]/10 backdrop-blur-sm hover:border-[#006398] transition-all duration-300 rounded-2xl p-6 lg:p-8 border border-gray-800 hover:shadow-xl hover:shadow-[#006398]/20"
                    variants={cardVariants}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#006398]/20 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-[#00A8E0]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white">
                        Primary Markets
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      UAE, Saudi Arabia, Kuwait, Oman, Bahrain, Qatar
                    </p>
                  </motion.div>

                  {/* Expertise Delivery Card */}
                  <motion.div
                    className="bg-gradient-to-br from-[#00A8E0]/20 to-[#006398]/10 backdrop-blur-sm rounded-2xl hover:border-[#006398] transition-all duration-300 p-6 lg:p-8 border border-gray-800 hover:shadow-xl hover:shadow-[#00A8E0]/20"
                    variants={cardVariants}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#00A8E0]/20 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-[#006398]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white">
                        Expertise Delivery
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Global (Remote and On-site Available)
                    </p>
                  </motion.div>

                  {/* Partnership Inquiries Card */}
                  <motion.div
                    className="bg-gradient-to-br from-[#006398]/15 to-[#00A8E0]/15 backdrop-blur-sm rounded-2xl hover:border-[#006398] transition-all duration-300 p-6 lg:p-8 border border-gray-800 hover:shadow-xl hover:shadow-[#006398]/20 md:col-span-2 lg:col-span-1"
                    variants={cardVariants}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#00A8E0]/20 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-[#00A8E0]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white">
                        Partnership Inquiries
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Interested in becoming a technology partner or reseller?
                      Contact our partnership team to explore collaboration
                      opportunities.
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-[#00A8E0] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:partnerships@intel-cs.com"
                        className="text-[#00A8E0] hover:text-[#007bb8] transition-colors font-medium"
                      >
                        partnerships@intel-cs.com
                      </a>
                    </div>
                  </motion.div>
                </div>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Need Immediate Assistance?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                For urgent inquiries or immediate support, don't hesitate to
                call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:+97148358795"
                  className="flex items-center justify-center bg-[#006398] hover:bg-[#004d7a] text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#006398]/30"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (+971) 4 835 8795
                </Link>
                <Link
                  href={"mailto:info@intel-cs.com"}
                  className="flex items-center justify-center border-2 border-[#006398] text-[#006398] hover:bg-[#006398] hover:text-white px-8 py-3 text-lg font-semibold rounded-full bg-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#006398]/30"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Link>
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
  );
}
