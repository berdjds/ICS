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
  Cloud,
  Server,
  Shield,
  Zap,
  Database,
  Cog,
  RefreshCw,
  Award,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CloudSolutionsPage() {
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
                  Cloud Excellence That Accelerates Your Digital Journey
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                  Transform your infrastructure with enterprise-grade cloud
                  solutions designed for rapid deployment, maximum scalability,
                  and continuous innovation. From AWS Advanced Partner expertise
                  to 24/7 managed services, we deliver cloud transformation that
                  drives measurable business results.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Core Cloud Services Section */}
          <section className="py-4 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                  Core Cloud Services
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    icon: Cloud,
                    title: "AWS Migration & Modernization",
                    features: [
                      "AWS Migration Acceleration Program (MAP) implementation.",
                      "Comprehensive assessment of your current IT infrastructure and Legacy systems.",
                      "Multi-cloud strategy development and execution.",
                      "Infrastructure Modernization through Serverless and Microservices Architecture.",
                    ],
                  },
                  {
                    icon: Cog,
                    title: "Managed Cloud Operations",
                    features: [
                      "24/7 Advanced Cloud infrastructure monitoring.",
                      "Cloud Infrastructure Managment and support.",
                      "Security compliance and governance.",
                      "Cost optimization and FinOps implementation.",
                    ],
                  },
                  {
                    icon: Server,
                    title: "Cloud Modernization",
                    features: [
                      "Containerization and Kubernetes orchestration.",
                      "DevSecOps pipeline implementation.",
                      "CI/CD and DevOps solutions.",
                      "Microservices transformation.",
                    ],
                  },
                  {
                    icon: Shield,
                    title: "Disaster Recovery & Backup",
                    features: [
                      "Multi-region backup strategies.",
                      "Business continuity and disaster recovery planning.",
                      "Real-time data replication.",
                      "Recovery time optimization.",
                    ],
                  },
                ].map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      transition={{ delay: (index + 1) * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mb-4 md:mb-6" />
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        {service.title}
                      </h3>
                      <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                        {service.features.map((feature, featureIndex) => (
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
              </div>
            </div>
          </section>

          {/* Technology Partnerships Section */}
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
                  Technology Partnerships
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
              >
                {[
                  {
                    icon: Award,
                    title: "AWS Advanced Partner",
                    description: "Certified expertise across all AWS services",
                  },
                  {
                    icon: Cloud,
                    title: "Microsoft Azure",
                    description: "Comprehensive Azure cloud solutions",
                  },
                  {
                    icon: Database,
                    title: "Google Cloud Platform",
                    description: "Multi-cloud deployment capabilities",
                  },
                ].map((partnership, index) => {
                  const IconComponent = partnership.icon;
                  return (
                    <motion.div
                      key={partnership.title}
                      className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-gray-700 hover:border-[#006398] transition-colors backdrop-blur-sm text-center"
                      variants={cardVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-[#006398] mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {partnership.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        {partnership.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Cloud Benefits Section */}
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
                  Why Choose Our Cloud Solutions
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Experience the power of enterprise-grade cloud transformation
                  with proven results.
                </p>
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
                    icon: Zap,
                    title: "Rapid Deployment",
                    description:
                      "Fast-track your cloud migration with proven methodologies",
                  },
                  {
                    icon: Scale,
                    title: "Maximum Scalability",
                    description:
                      "Auto-scaling infrastructure that grows with your business",
                  },
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description:
                      "Bank-grade security with compliance and governance",
                  },
                  {
                    icon: RefreshCw,
                    title: "24/7 Support",
                    description:
                      "Round-the-clock monitoring and expert support",
                  },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-[#006398] transition-all duration-300 backdrop-blur-sm text-center"
                      variants={cardVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#006398] mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-3">
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
                  Ready to Transform Your Cloud Infrastructure?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Transform your infrastructure with enterprise-grade cloud
                  solutions that deliver measurable results.
                </p>
                <Link
                  href={"/contact-us"}
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
                >
                  Schedule Cloud Assessment
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
