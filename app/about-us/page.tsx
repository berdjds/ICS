"use client";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";
import { StaticScene } from "@/components/scene/static-scene";
import { FooterContent } from "@/components/footer-content";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background Scene - LOWEST z-index */}
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

      {/* Header - HIGH z-index */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* All Content - MEDIUM z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-8">
                About <span className="text-[#00A8E0]">Intel-CS</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
                Pioneering Digital Transformation in the UAE and Beyond
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Born in the cloud and thriving at the edge of innovation,
                iNTEL-CS transforms businesses through comprehensive IT
                modernization. Our team of certified experts delivers
                cutting-edge solutions that drive sustainable growth and
                competitive advantage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Left Content - 35% like your split */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5"
              >
                <h2 className="text-4xl font-bold mb-8 text-[#006398]">
                  Our Story
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Located in Dubai, United Arab Emirates, iNTEL-CS has
                    established itself as a trusted partner for businesses
                    seeking comprehensive digital transformation. We combine
                    deep technical expertise with local market understanding to
                    deliver solutions that address real business challenges.
                  </p>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 mt-8">
                    <h3 className="text-xl font-bold text-[#00A8E0] mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-300">
                      To empower businesses through innovative IT solutions,
                      enhancing their capabilities and driving growth in a
                      rapidly evolving digital landscape.
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-xl font-bold text-[#00A8E0] mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-300">
                      To be a leading provider of comprehensive IT modernization
                      services, recognized for our expertise, customer-centric
                      approach, and commitment to excellence.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Visualization - 65% like your split */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-7"
              >
                <div className="relative h-96 bg-gradient-to-br from-[#006398]/20 to-[#00A8E0]/20 rounded-3xl border border-gray-800 overflow-hidden">
                  {/* Simulated particle background */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00A8E0] rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content overlay */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-8 text-center">
                      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="text-4xl font-bold text-[#00A8E0] mb-2">
                          Dubai
                        </div>
                        <div className="text-gray-300">Headquarters</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="text-4xl font-bold text-[#00A8E0] mb-2">
                          UAE
                        </div>
                        <div className="text-gray-300">Market Focus</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="text-4xl font-bold text-[#00A8E0] mb-2">
                          20+
                        </div>
                        <div className="text-gray-300">Tech Partnerships</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="text-4xl font-bold text-[#00A8E0] mb-2">
                          ISO
                        </div>
                        <div className="text-gray-300">Certified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-20 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                What Sets Us <span className="text-[#00A8E0]">Apart</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Cloud-Born Expertise",
                  description:
                    "Native cloud understanding with proven methodologies across AWS, Azure, and Google Cloud platforms.",
                  icon: "☁️",
                },
                {
                  title: "Regional Focus",
                  description:
                    "Deep understanding of UAE market dynamics, regulatory requirements, and business culture.",
                  icon: "🌍",
                },
                {
                  title: "End-to-End Solutions",
                  description:
                    "Comprehensive services from strategy and assessment through implementation and ongoing optimization.",
                  icon: "🔄",
                },
                {
                  title: "Proven Partnerships",
                  description:
                    "AWS Advanced Partner status and strategic relationships with leading technology providers.",
                  icon: "🤝",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#00A8E0]/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Our <span className="text-[#00A8E0]">Values</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description:
                    "Pioneering new solutions and approaches to IT challenges",
                  icon: "💡",
                },
                {
                  title: "Integrity",
                  description:
                    "Conducting business ethically and transparently",
                  icon: "🛡️",
                },
                {
                  title: "Excellence",
                  description:
                    "Striving for highest standards in every service aspect",
                  icon: "⭐",
                },
                {
                  title: "Collaboration",
                  description:
                    "Working closely with clients to achieve shared goals",
                  icon: "🤝",
                },
                {
                  title: "Inclusivity",
                  description:
                    "Embracing diversity and promoting supportive environments",
                  icon: "🌟",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#00A8E0]/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Partnerships Section */}
        <section className="py-20 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-white mb-8">
                  Certifications &{" "}
                  <span className="text-[#00A8E0]">Partnerships</span>
                </h2>

                <div className="space-y-6">
                  {[
                    "AWS Advanced Consulting Partner",
                    "Microsoft Azure Partner",
                    "Google Cloud Partner",
                    "20+ Technology Partnerships",
                    "ISO Certified Processes",
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-[#006398] to-[#00A8E0] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-lg text-white">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-[#006398]/20 to-[#00A8E0]/20 rounded-3xl p-8 border border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Team Excellence
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Our team consists of certified cloud architects, data
                    scientists, AI specialists, and automation engineers who are
                    passionate about helping clients leverage technology for
                    growth and innovation.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                      <div className="text-3xl font-bold text-[#00A8E0] mb-2">
                        Expert
                      </div>
                      <div className="text-gray-400 text-sm">Team</div>
                    </div>
                    <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                      <div className="text-3xl font-bold text-[#00A8E0] mb-2">
                        Certified
                      </div>
                      <div className="text-gray-400 text-sm">Professionals</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-5xl font-bold text-white mb-8">
                Ready to Transform Your{" "}
                <span className="text-[#00A8E0]">Enterprise?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let's discuss how our advanced cloud and AI solutions can
                accelerate your digital transformation
              </p>
              <button className="bg-gradient-to-r from-[#006398] to-[#00A8E0] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#00A8E0]/25 transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-4">
                <span className="text-[#006398]">Intel</span>-
                <span className="text-[#00A8E0]">CS</span>
              </div>
              <p className="text-gray-400 mb-6">
                Advanced Cloud & AI Solutions
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00A8E0] transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00A8E0] transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00A8E0] transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer> */}
        <FooterContent />
      </div>
    </div>
  );
};

export default AboutPage;
