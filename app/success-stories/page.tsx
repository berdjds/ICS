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
  TrendingUp,
  Award,
  Target,
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

export default function SuccessStoriesPage() {
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
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    quote:
                      "tNTEL-CS transformed our entire IT infrastructure while ensuring zero business disruption. Their expertise and dedication exceeded our expectations.",
                    author: "CTO, Leading Financial Institution",
                  },
                  {
                    quote:
                      "The AI-powered solutions delivered by tNTEL-CS have revolutionized our customer experience and operational efficiency.",
                    author: "CEO, E-commerce Platform",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-gray-700 backdrop-blur-sm"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    transition={{ delay: (index + 1) * 0.2 }}
                  >
                    <div className="mb-6">
                      <div className="text-4xl text-[#006398] mb-4">"</div>
                      <p className="text-base md:text-lg text-gray-300 italic leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold text-[#006398]">
                        - {testimonial.author}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                  Join our growing list of successful clients and transform your
                  business with proven solutions.
                </p>
                <Button
                  size="lg"
                  className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
                >
                  Start Your Transformation
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
