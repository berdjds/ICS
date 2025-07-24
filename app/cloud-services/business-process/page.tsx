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
  Cog,
  RefreshCw,
  Workflow,
  Code,
  Headphones,
  TrendingUp,
  Clock,
  DollarSign,
  Shield,
  Zap,
} from "lucide-react";
import Head from "next/head";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function BusinessProcessAutomationPage() {
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
          <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                  Streamline Operations, Amplify Results
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Eliminate manual processes and accelerate business outcomes
                  through intelligent automation solutions. From legacy system
                  modernization to low-code development, we create efficient,
                  scalable processes that drive organizational success.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Automation Solutions Section */}
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
                  Automation Solutions
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    icon: RefreshCw,
                    title: "Legacy System Modernization",
                    features: [
                      "VMware to containerization migration",
                      "Mainframe modernization strategies",
                      "API integration and system connectivity",
                      "Gradual transformation roadmaps",
                    ],
                  },
                  {
                    icon: Workflow,
                    title: "Workflow Automation",
                    features: [
                      "Business process mapping and optimization",
                      "Robotic Process Automation (RPA) implementation",
                      "Document management and approval workflows",
                      "Integration platform development",
                    ],
                  },
                  {
                    icon: Code,
                    title: "Custom Application Development",
                    features: [
                      "Low-code/no-code platform implementation",
                      "Mobile application development",
                      "Web application modernization",
                      "Third-party system integrations",
                    ],
                  },
                  {
                    icon: Headphones,
                    title: "Outsourced IT Operations",
                    features: [
                      "Complete IT operations management",
                      "Service desk and user support",
                      "Infrastructure monitoring and maintenance",
                      "Vendor management and coordination",
                    ],
                  },
                ].map((solution, index) => {
                  const IconComponent = solution.icon;
                  return (
                    <motion.div
                      key={solution.title}
                      className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      transition={{ delay: (index + 1) * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        {solution.title}
                      </h3>
                      <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                        {solution.features.map((feature, featureIndex) => (
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
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Automation Benefits Section */}
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
                  Automation Benefits
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  {
                    icon: Clock,
                    metric: "60%",
                    title: "Average Process Time Reduction",
                    description:
                      "Streamlined workflows and automated processes",
                  },
                  {
                    icon: DollarSign,
                    metric: "40%",
                    title: "Cost Savings",
                    description: "Through operational efficiency",
                  },
                  {
                    icon: Shield,
                    metric: "99.9%",
                    title: "Uptime",
                    description: "With proactive monitoring",
                  },
                  {
                    icon: Zap,
                    metric: "24/7",
                    title: "Operations",
                    description: "Without human intervention",
                  },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm text-center"
                      variants={cardVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-[#006398] mx-auto mb-4" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {benefit.metric}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        {benefit.description}
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
                  Ready to Automate Your Business Processes?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Transform your operations with intelligent automation
                  solutions that drive efficiency and growth.
                </p>
                <Button
                  size="lg"
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
                >
                  Start Your Automation Journey
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
  );
}
