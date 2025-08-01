"use client";
import React, { Suspense } from "react";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/header";
import { Canvas } from "@react-three/fiber";
import {
  Facebook,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { StaticScene } from "@/components/scene/static-scene";
import { FooterContent } from "@/components/footer-content";
import Link from "next/link";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Mohammad Darras",
      title: "Chief Executive Officer",
      subtitle: "& Managing Director",
      image: "/team/MD.jpg",
      social: {
        linkedin: "#",
      },
    },
    {
      name: "Ameen Abodabash",
      title: "Chief Technology Officer",
      subtitle: "",
      image: "/team/AA.jpg",
      social: {
        linkedin: "#",
      },
    },
    {
      name: "Mohammad Mohiealdeen",
      title: "Cloud Operational Officer",
      subtitle: "",
      image: "/team/mohammad-mohiealdeen.jpg",
      social: {
        linkedin: "#",
      },
    },
  ];
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
                About <span className="text-[#00A8E0]">iNTEL-CS</span>
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

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border hover:border-[#006398] transition-all duration-300 border-gray-800 mt-8">
                    <h3 className="text-xl font-bold text-[#00A8E0] mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-300">
                      To empower businesses through innovative IT solutions,
                      enhancing their capabilities and driving growth in a
                      rapidly evolving digital landscape.
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border hover:border-[#006398] transition-all duration-300 border-gray-800">
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

        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <p className="text-[#006398] font-bold mb-10 tracking-wide text-2xl">
                Our Team
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white  md:mb-6 mb-6">
                We Have A Dynamic And Genius Team To{" "}
                <span className="text-[#006398]">Serve You.</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="text-center group flex flex-col h-full"
                  variants={cardVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-6 inline-block">
                    <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={member.image}
                        alt={`${member.name} profile`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.currentTarget;
                          const nextSibling =
                            target.nextElementSibling as HTMLElement | null;

                          target.style.display = "none";
                          if (nextSibling) {
                            nextSibling.style.display = "flex";
                          }
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="w-full h-full bg-gray-200  items-center justify-center text-gray-500 font-semibold text-lg ">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Name and Title */}
                  <div className="mb-4 flex flex-col justify-between flex-grow">
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#006398] transition-colors duration-300 text-center">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 font-medium leading-tight text-center">
                        {member.title}
                      </p>
                      {member.subtitle && (
                        <p className="text-gray-400 font-medium leading-tight text-center">
                          {member.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-4 mt-auto">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-gray-100 hover:bg-[#006398] text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                <span className="text-[#00A8E0]">Business?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let's discuss how our advanced cloud and AI solutions can
                accelerate your digital transformation
              </p>
              <Link
                href={"mailto:Hr@intel-cs.com"}
                className="bg-gradient-to-r from-[#006398] to-[#00A8E0] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#00A8E0]/25 transition-all duration-300 transform hover:scale-105"
              >
                Meet Our Team
              </Link>
              <Link
                href={"/contact-us"}
                className="ml-4 bg-gradient-to-r from-[#006398] to-[#00A8E0] text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#00A8E0]/25 transition-all duration-300 transform hover:scale-105"
              >
                Schedule Consultation
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}

        <FooterContent />
      </div>
    </div>
  );
};

export default AboutPage;
