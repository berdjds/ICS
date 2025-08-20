"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const modernizationServices = [
  {
    title: "VMware to Containerization",
    desc: "Seamless migration solutions from traditional VMware environments to modern containerized architectures"
  },
  {
    title: "Legacy System Modernization",
    desc: "Comprehensive transformation of outdated systems into efficient, scalable modern solutions"
  },
  {
    title: "Serverless Architectures",
    desc: "Advanced serverless solutions that scale automatically and reduce operational overhead"
  },
  {
    title: "Intuitive User Experiences",
    desc: "User-centric design and development serving businesses throughout the UAE and broader region"
  }
]

export function SystemModernizationSection() {
  return (
    <section className="min-h-screen h-auto flex justify-center items-center py-20 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-2 flex justify-end items-center">
        <motion.div
          className="w-full md:w-7/12 lg:w-7/12 text-left z-10 pl-2 md:pl-8 lg:pl-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            Simplification For Smarter Tomorrow
          </h2>

          <motion.div className="mb-6 md:mb-8" variants={sectionVariants}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
              At{" "}
              <span className="text-white font-bold">iNTEL-CS</span>, we believe the ultimate purpose
              of system modernization, digital transformation, and infrastructure innovation is enabling
              organizational success.
            </p>

            <div className="space-y-4 mb-4 md:mb-6">
              {modernizationServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="border-l-4 border-[#006398] pl-3 md:pl-4"
                  variants={listItemVariants}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm md:text-xl text-gray-300">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-gradient-to-r from-[#006398]/20 to-transparent p-3 md:p-4 rounded-lg border-l-4 border-[#006398]"
              variants={sectionVariants}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm md:text-base text-white font-medium">
                Driving efficiency and innovation across the UAE and the broader region through strategic
                digital transformation initiatives.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Link href="/cloud-services">
              <Button
                size="lg"
                className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
              >
                Modernize Your Systems
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}