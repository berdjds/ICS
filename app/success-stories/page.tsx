"use client";

import { SetStateAction, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Header } from "@/components/header";
import { FooterContent } from "@/components/footer-content";
import { StaticScene } from "@/components/scene/static-scene";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Users,
  Scale,
  Gamepad2,
  ArrowRight,
  CheckCircle,
  Loader2,
  DollarSign,
  Heart,
  Building,
  ShoppingCart,
  Factory,
  GraduationCap,
  TrendingUp,
  Award,
  Target,
  Zap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
export default function SuccessStoriesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0,
    },
  };

  const partners = [
    {
      name: "AWS",
      logo: "/partners/advanced tier.png",
      description: "Amazon Web Services Partner",
    },
    {
      name: "Microsoft",
      logo: "/partners/microsoft.png",
      description: "Microsoft Solutions Partner",
    },
    {
      name: "Google Cloud",
      logo: "/partners/google.webp",
      description: "Google Cloud Partner",
    },
    {
      name: "Oracle",
      logo: "/partners/oracle.png",
      description: "Oracle Partner",
    },
    {
      name: "Palo Alto Networks.",
      logo: "/partners/palo.webp",
      description: "Palo Alto Networks Partner",
    },
    {
      name: "Fortinet",
      logo: "/partners/fortinet-partner.png",
      description: "Fortinet Partner",
    },
    {
      name: "Veeam",
      logo: "/partners/veeam.png",
      description: "Veeam Partner",
    },
    {
      name: "Commvault",
      logo: "/partners/commvault.webp",
      description: "Commvault Partner",
    },
    {
      name: "CrowdStrike",
      logo: "/partners/crowd.png",
      description: "CrowdStrike Partner",
    },
    {
      name: "AFI.AI",
      logo: "/partners/afi-ai-partner.png",
      description: "AFI.AI Partner",
    },
    {
      name: "Peer",
      logo: "/partners/peer-partner.png",
      description: "Peer Partner",
    },
    {
      name: "Nasuni",
      logo: "/partners/nasuni-logo-primary-blue-RGB.png",
      description: "Nasuni Partner",
    },
  ];

  const customers = [
    {
      name: "Binghatti",
      logo: "/customers/binghatti-logo.png",
      projects: [
        "Pixel Interactive Property Showcase",
        "Infrastructure Cloud Modernization",
        "Website Cloud Migration",
      ],
    },
    {
      name: "Bloom",
      logo: "/customers/New-Bloom.png",
      projects: ["AI document processing"],
    },
    {
      name: "Infrastructure Client",
      logo: "/customers/infrastructure-client-logo.png",
      projects: [
        "Infrastructure Cloud Modernization",
        "Open shift",
        "On-prem to cloud migration",
      ],
    },
    {
      name: "Shamal Holding",
      logo: "/customers/shamal-holding-logo.png",
      projects: ["22 Websites Migrated to the cloud"],
    },
    {
      name: "Samcom",
      logo: "/customers/samcom-logo.png",
      projects: ["Supplier Portal hosted on cloud"],
    },
    {
      name: "TTSEC",
      logo: "/customers/ttsec-logo.png",
      projects: ["Infrastructure migration"],
    },
    {
      name: "EGMA Lense",
      logo: "/customers/egma-lense-logo.png",
      projects: ["Infrastructure Migration and Modernization"],
    },
  ];

  const testimonials = [
    {
      quote:
        "Working with Intel CS has been an outstanding experience. Their cloud services have been nothing short of exceptional, with a dedicated team of professionals who ensured everything was tailored to our needs.",
      fullQuote:
        "From seamless integration to ongoing support, their commitment to delivering top notch solutions has truly elevated our operations. We are extremely satisfied with the results and look forward to continuing our collaboration for future projects.",
      author: "Sufyan Areed",
      position: "CTO",
      company: "Access Insurance Brokers",
      service: "Cloud Solutions",
    },
    {
      quote:
        "Intel CS impressed us with their professionalism and speed. We recently collaborated with Intel CS for our cloud solution optimizations.",
      fullQuote:
        "I was impressed with their professionalism and timely completion of job. All the jobs I really recommend them as a technology partner.",
      author: "Shajan Thomas",
      position: "CTO",
      company: "LogisEye Solutions FZCO",
      service: "Cloud Solution Modernization",
    },
    {
      quote:
        "Intel CS delivered a seamless, customized portal that transformed our operations and client service.",
      fullQuote:
        "Intel CS team demonstrated not only technical expertise but also a deep understanding of our specific needs. Their collaborative approach made the entire process seamless, allowing us to achieve our vision effectively. We now have a powerful tool that streamlines our operation and enhances our customer interaction.",
      author: "Said Saqer",
      position: "CEO",
      company: "Samcom Group",
      service: "Custom Portal Development",
    },
    {
      quote:
        "Intel CS helped us streamline operations with tailored, cost effective and reliable support.",
      fullQuote:
        "Intel CS provided exactly the support we needed to optimize our systems. They understood our unique needs and delivered a smooth, efficient solution. Their team's dedication and responsiveness made the entire process easy and stress-free.",
      author: "Eng. Sanad A. Qader Al Hashimi",
      position: "Business Development Manager",
      company: "THTC",
      service: "Cloud Migration & Modernization",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };
  return (
    <>
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
          <section className="pt-24 md:pt-32 pb-6 md:pb-2 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                  Proven Results Across Industries and Scales
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  From startup acceleration to enterprise transformation, our
                  success stories demonstrate measurable impact through
                  innovative cloud and AI solutions. Discover how we've helped
                  organizations achieve their digital transformation goals.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Featured Case Studies Section */}
          <section className="py-4  px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Featured Case Studies
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    icon: DollarSign,
                    title: "Financial Services Transformation",
                    client: "Regional Banking Institution",
                    challenge:
                      "Legacy system modernization with regulatory compliance",
                    solution:
                      "AWS-based core banking migration with enhanced security",
                    results:
                      "60% faster transaction processing, 40% cost reduction, 99.9% uptime",
                  },
                  {
                    icon: ShoppingCart,
                    title: "E-commerce Platform Scaling",
                    client: "UAE Retail Chain",
                    challenge:
                      "Seasonal traffic spikes causing system failures",
                    solution:
                      "Auto-scaling cloud infrastructure with AI-powered inventory management",
                    results:
                      "300% traffic capacity increase, 25% inventory optimization, 45% faster page loads",
                  },
                  {
                    icon: Heart,
                    title: "Healthcare Data Analytics",
                    client: "Private Healthcare Group",
                    challenge:
                      "Patient data insights for improved care delivery",
                    solution:
                      "HIPAA-compliant data lake with AI-powered analytics",
                    results:
                      "30% improved diagnostic accuracy, 20% reduced readmission rates",
                  },
                  {
                    icon: Factory,
                    title: "Manufacturing IoT Implementation",
                    client: "Industrial Equipment Manufacturer",
                    challenge:
                      "Predictive maintenance and operational efficiency",
                    solution:
                      "IoT sensors with cloud-based analytics and automated alerts",
                    results:
                      "35% reduction in unplanned downtime, 28% maintenance cost savings",
                  },
                ].map((caseStudy, index) => {
                  const IconComponent = caseStudy.icon;
                  return (
                    <motion.div
                      key={caseStudy.title}
                      className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      transition={{ delay: (index + 1) * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        {caseStudy.title}
                      </h3>
                      <div className="space-y-3 mb-4 md:mb-6">
                        <div>
                          <span className="font-semibold text-[#006398]">
                            Client:{" "}
                          </span>
                          <span className="text-sm md:text-base text-gray-300">
                            {caseStudy.client}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#006398]">
                            Challenge:{" "}
                          </span>
                          <span className="text-sm md:text-base text-gray-300">
                            {caseStudy.challenge}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#006398]">
                            Solution:{" "}
                          </span>
                          <span className="text-sm md:text-base text-gray-300">
                            {caseStudy.solution}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#006398]">
                            Results:{" "}
                          </span>
                          <span className="text-sm md:text-base text-gray-300">
                            {caseStudy.results}
                          </span>
                        </div>
                      </div>
                      {/* <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white text-sm md:text-base">
                        Read Full Case Study{" "}
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Button> */}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Client Testimonials Section */}
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Client Testimonials
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Hear from our satisfied clients about their transformation
                  journey with Intel CS
                </p>
              </motion.div>

              <motion.div
                className="relative max-w-4xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Main Carousel Container */}
                <div className="relative overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      className="bg-gray-800/50 p-8 md:p-12 border hover:border-[#006398] transition-all duration-300 border-gray-700 backdrop-blur-sm rounded-xl"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      {/* Quote Icon */}
                      <div className="text-6xl text-[#006398] mb-6 leading-none">
                        "
                      </div>

                      {/* Main Quote */}
                      <div className="mb-8">
                        <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed mb-4">
                          {testimonials[currentIndex].quote}
                        </p>
                        <p className="text-base md:text-lg text-gray-400 italic leading-relaxed">
                          {testimonials[currentIndex].fullQuote}
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="border-t border-gray-700 pt-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <p className="font-bold text-white text-lg">
                              {testimonials[currentIndex].author}
                            </p>
                            <p className="text-[#006398] font-semibold">
                              {testimonials[currentIndex].position}
                            </p>
                            <p className="text-gray-300">
                              {testimonials[currentIndex].company}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Service:</p>
                            <p className="text-sm text-[#006398] font-medium">
                              {testimonials[currentIndex].service}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows - Positioned Outside Cards */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-[#006398] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-[#006398] hidden lg:block"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-[#006398] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-[#006398] hidden lg:block"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Mobile Navigation - Below Card */}
                <div className="flex justify-center mt-6 gap-4 lg:hidden">
                  <button
                    onClick={prevSlide}
                    className="bg-gray-800/80 hover:bg-[#006398] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-[#006398]"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="bg-gray-800/80 hover:bg-[#006398] text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-[#006398]"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center mt-8 space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-[#006398] scale-125"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-[#006398] h-1 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentIndex + 1) / testimonials.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Client Logos Section */}
              <motion.div
                className="mt-16 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <p className="text-gray-400 mb-8">
                  Trusted by leading organizations
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="text-gray-500 font-semibold text-sm hover:text-[#006398] transition-colors cursor-pointer"
                      onClick={() => goToSlide(index)}
                    >
                      {testimonial.company}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
                  Our Trusted Partners & References
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
                  We collaborate with leading technology partners to deliver
                  comprehensive solutions that meet the highest industry
                  standards and exceed client expectations.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    className="bg-white/95 p-4 md:p-6 rounded-xl border border-gray-200 hover:border-[#006398] hover:shadow-lg transition-all duration-300 backdrop-blur-sm group"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-full h-16 md:h-20 flex items-center justify-center mb-3 md:mb-4">
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                          {/* Placeholder for partner logos */}
                          <Image
                            alt={partner.name}
                            src={partner.logo}
                            width={110}
                            height={55}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
                  Our Valued Customers
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
                  Trusted by leading organizations across the UAE for their
                  digital transformation and cloud modernization initiatives.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {customers.map((customer, index) => (
                  <motion.div
                    key={customer.name}
                    className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm group h-full"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col h-full">
                      {/* Logo Section */}
                      <div className="mb-4 md:mb-6">
                        <div className="w-full h-16 md:h-20 bg-white/95 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                          {/* Logo placeholder - replace with actual logos */}

                          <Image
                            alt={customer.name}
                            src={`${customer.logo}`}
                            width={110}
                            height={55}
                            className="text-sm md:text-base font-bold text-gray-800 px-2 text-center"
                          ></Image>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white text-center group-hover:text-[#006398] transition-colors">
                          {customer.name}
                        </h3>
                      </div>

                      {/* Projects Section */}
                      <div className="flex-grow">
                        <ul className="space-y-3">
                          {customer.projects.map((project, projectIndex) => (
                            <li
                              key={projectIndex}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className="w-4 h-4 text-[#006398] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300 leading-relaxed">
                                {project}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Success Metrics Section */}
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Success Metrics
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  {
                    icon: Award,
                    metric: "50+",
                    label: "Projects completed successfully",
                  },
                  {
                    icon: TrendingUp,
                    metric: "99.5%",
                    label: "Client Satisfaction rate",
                  },
                  {
                    icon: Target,
                    metric: "40%",
                    label: "Average Cost Reduction achieved",
                  },
                  {
                    icon: Zap,
                    metric: "60%",
                    label: "Average Performance Improvement",
                  },
                  {
                    icon: CheckCircle,
                    metric: "Zero",
                    label: "Security Incidents across all implementations",
                  },
                ].map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm text-center"
                      variants={cardVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-[#006398] mx-auto mb-4" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {metric.metric}
                      </div>
                      <div className="text-sm md:text-base text-gray-300">
                        {metric.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Industry Impact Section */}
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Industry Impact
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Our solutions have transformed operations across:
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  {
                    icon: DollarSign,
                    industry: "Financial Services",
                    count: "15+ projects",
                  },
                  {
                    icon: Heart,
                    industry: "Healthcare",
                    count: "10+ implementations",
                  },
                  {
                    icon: ShoppingCart,
                    industry: "Retail & E-commerce",
                    count: "20+ platforms",
                  },
                  {
                    icon: Factory,
                    industry: "Manufacturing",
                    count: "12+ IoT deployments",
                  },
                  {
                    icon: Building,
                    industry: "Government",
                    count: "8+ digital transformation initiatives",
                  },
                ].map((impact, index) => {
                  const IconComponent = impact.icon;
                  return (
                    <motion.div
                      key={impact.industry}
                      className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm text-center"
                      variants={cardVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-[#006398] mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {impact.industry}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        {impact.count}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-4xl text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Ready to Start Your Success Story?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Join our growing list of successful clients and transform your
                  business with proven solutions.
                </p>
                <Link
                  href={"/contact-us"}
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
                >
                  Request Proposal
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <section className="py-12 md:py-20 px-4 md:px-8">
            <FooterContent />
          </section>
        </div>
      </div>
    </>
  );
}
