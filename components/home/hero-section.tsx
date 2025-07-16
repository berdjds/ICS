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

const keyValuePoints = [
  { title: "Faster Time-to-Market", desc: "Accelerated implementation timelines" },
  { title: "Serverless Architecture", desc: "Modern, scalable cloud solutions" },
  { title: "AWS Advanced Partner", desc: "Certified expertise and proven results" },
  { title: "24/7 Support", desc: "Continuous monitoring and optimization" },
]

export function HeroSection() {
  return (
    <section className="min-h-screen h-auto flex justify-center items-center py-20 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-2 flex justify-start items-center">
        <motion.div
          className="w-full md:w-7/12 lg:w-7/12 text-left z-10 pr-2 md:pr-8 lg:pr-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            Advanced Cloud & AI Solutions
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
            Transform your business with cutting-edge cloud and artificial intelligence technology. Experience
            accelerated digital transformation through intelligent solutions designed for rapid deployment and
            maximum impact.
          </p>

          <motion.div className="mb-6 md:mb-8" variants={sectionVariants}>
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white">Key Value Points</h3>
            <div className="space-y-3 md:space-y-4">
              {keyValuePoints.map((item, index) => (
                <motion.div
                  key={index}
                  className="border-l-4 border-[#006398] pl-3 md:pl-4"
                  variants={listItemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col gap-3 md:gap-4" variants={sectionVariants}>
            <p className="text-sm md:text-base font-bold text-white">
              Get expert consultation on your cloud and AI journey
            </p>
            <Link href="/contact-us">
              <Button
                size="lg"
                className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
              >
                Start Your Transformation
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}