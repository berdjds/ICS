<<<<<<< HEAD
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Head from "next/head";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
=======
"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { FooterContent } from "@/components/footer-content"
import { StaticScene } from "@/components/scene/static-scene"
import { Button } from "@/components/ui/button"
import { Brain, Users, Scale, Gamepad2, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import Head from "next/head"

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
=======
}
>>>>>>> main

export default function AISolutionsPage() {
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
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
<<<<<<< HEAD
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                  Tailored Solutions for Every Industry Challenge
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Every industry has unique requirements and regulatory demands.
                  Our proven solutions address specific challenges while
                  leveraging cutting-edge technology to deliver sustainable
                  competitive advantages across the UAE and broader region.
=======
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">AI Solutions</h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Transform your business operations with cutting-edge artificial intelligence solutions tailored for
                  HR, Legal, and Gaming industries.
>>>>>>> main
                </p>
              </motion.div>
            </div>
          </section>

<<<<<<< HEAD
          {/* Industry Solutions Section */}
=======
          {/* AI Use Cases Section */}
>>>>>>> main
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
<<<<<<< HEAD
                  Industry Solutions
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    icon: DollarSign,
                    title: "Financial Services",
                    features: [
                      "Cloud banking infrastructure with regulatory compliance",
                      "Fraud detection and risk management systems",
                      "Digital payment platform development",
                      "Data analytics for customer insights",
                    ],
                  },
                  {
                    icon: Heart,
                    title: "Healthcare & Life Sciences",
                    features: [
                      "HIPAA-compliant cloud infrastructure",
                      "Medical data analytics and AI diagnostics",
                      "Telemedicine platform development",
                      "Research data management solutions",
                    ],
                  },
                  {
                    icon: Building,
                    title: "Government & Public Sector",
                    features: [
                      "Secure government cloud implementation",
                      "Digital citizen services development",
                      "Data governance and compliance solutions",
                      "Smart city technology integration",
                    ],
                  },
                  {
                    icon: ShoppingCart,
                    title: "Retail & E-commerce",
                    features: [
                      "Scalable e-commerce platform development",
                      "Inventory management and supply chain optimization",
                      "Customer personalization engines",
                      "Omnichannel experience platforms",
                    ],
                  },
                  {
                    icon: Factory,
                    title: "Manufacturing & Logistics",
                    features: [
                      "IoT-enabled predictive maintenance",
                      "Supply chain visibility and optimization",
                      "Quality control automation",
                      "Real-time production monitoring",
                    ],
                  },
                  {
                    icon: GraduationCap,
                    title: "Education & Training",
                    features: [
                      "Learning management system development",
                      "Virtual classroom and collaboration tools",
                      "Student data analytics and insights",
                      "Campus infrastructure modernization",
                    ],
                  },
                ].map((industry, index) => {
                  const IconComponent = industry.icon;
                  return (
                    <motion.div
                      key={industry.title}
                      className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      transition={{ delay: (index + 1) * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        {industry.title}
                      </h3>
                      <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                        {industry.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                            <span className="text-xs md:text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white text-sm md:text-base">
                        Learn More{" "}
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Button> */}
                    </motion.div>
                  );
                })}
=======
                  Industry-Specific AI Solutions
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Discover how our AI solutions are revolutionizing key industries with intelligent automation and
                  data-driven insights.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* HR Solutions */}
                <motion.div
                  className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  transition={{ delay: 0.1 }}
                >
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">HR Intelligence</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    Streamline recruitment, employee engagement, and performance management with AI-powered insights.
                  </p>
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Automated Resume Screening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Predictive Employee Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Sentiment Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Performance Optimization</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white text-sm md:text-base">
                    Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </motion.div>

                {/* Legal Solutions */}
                <motion.div
                  className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  transition={{ delay: 0.2 }}
                >
                  <Scale className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Legal Tech</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    Enhance legal research, document analysis, and compliance monitoring with advanced AI capabilities.
                  </p>
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Contract Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Legal Research Automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Compliance Monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Document Classification</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white text-sm md:text-base">
                    Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </motion.div>

                {/* Gaming Solutions */}
                <motion.div
                  className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  transition={{ delay: 0.3 }}
                >
                  <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Gaming AI</h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                    Create immersive gaming experiences with intelligent NPCs, procedural content, and player behavior
                    analysis.
                  </p>
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Intelligent NPCs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Procedural Content Generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Player Behavior Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#006398] flex-shrink-0" />
                      <span className="text-xs md:text-sm">Dynamic Difficulty Adjustment</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white text-sm md:text-base">
                    Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                  </Button>
                </motion.div>
>>>>>>> main
              </div>
            </div>
          </section>

<<<<<<< HEAD
          {/* Solution Approach Section */}
=======
          {/* AI Technology Stack */}
>>>>>>> main
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
<<<<<<< HEAD
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Solution Approach
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  {
                    number: "1",
                    title: "Industry Assessment",
                    description: "Deep dive into sector-specific challenges",
                  },
                  {
                    number: "2",
                    title: "Compliance Mapping",
                    description: "Regulatory requirement alignment",
                  },
                  {
                    number: "3",
                    title: "Technology Selection",
                    description: "Best-fit solutions for industry needs",
                  },
                  {
                    number: "4",
                    title: "Phased Implementation",
                    description: "Risk-managed deployment approach",
                  },
                  {
                    number: "5",
                    title: "Ongoing Optimization",
                    description: "Continuous improvement and support",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="bg-gray-800/50 p-4 md:p-6 rounded-lg text-center border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#006398] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="font-bold text-white text-sm md:text-base">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm md:text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* AI Technology Stack */}
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
                  Our AI Technology Stack
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Built on cutting-edge technologies and frameworks for maximum
                  performance and scalability.
=======
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Our AI Technology Stack</h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Built on cutting-edge technologies and frameworks for maximum performance and scalability.
>>>>>>> main
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  "TensorFlow",
                  "PyTorch",
                  "OpenAI GPT",
                  "AWS SageMaker",
                  "Hugging Face",
                  "LangChain",
                  "Vector Databases",
                  "MLOps",
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="bg-gray-800/50 p-3 md:p-4 rounded-lg text-center border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Brain className="w-6 h-6 md:w-8 md:h-8 text-[#006398] mx-auto mb-2" />
<<<<<<< HEAD
                    <span className="font-semibold text-sm md:text-base">
                      {tech}
                    </span>
=======
                    <span className="font-semibold text-sm md:text-base">{tech}</span>
>>>>>>> main
                  </motion.div>
                ))}
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
<<<<<<< HEAD
                  Discover Your Industry Solution
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Let's discuss how our industry-specific solutions can drive
                  innovation and efficiency in your organization.
=======
                  Ready to Transform Your Business with AI?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Let's discuss how our AI solutions can drive innovation and efficiency in your organization.
>>>>>>> main
                </p>
                <Button
                  size="lg"
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
                >
<<<<<<< HEAD
                  Industry Consultation
=======
                  Schedule a Consultation
>>>>>>> main
                </Button>
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
<<<<<<< HEAD
  );
}
=======
  )
}
>>>>>>> main
