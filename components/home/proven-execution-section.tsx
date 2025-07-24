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

const executionPoints = [
  {
    title: "AWS MAP Implementation",
    desc: "Accelerated migration programs with proven methodologies and best practices"
  },
  {
    title: "Certified Cloud Architects",
    desc: "Expert team with proven track record across all project scales"
  },
  {
    title: "Risk Mitigation",
    desc: "Significantly reduced implementation risks through proven methodologies"
  }
]

export function ProvenExecutionSection() {
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
          <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            Proven Execution
          </h2>

          <motion.div className="mb-6 md:mb-8" variants={sectionVariants}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
              We have successfully navigated challenging projects, delivering some of the most innovative and
              impactful cloud transformation initiatives. From AWS Migration Acceleration Program (MAP)
              implementations to rapid cloud deployments, our expert team of certified cloud architects
              consistently delivers exceptional solutions across all scales.
            </p>

            <motion.div
              className="bg-gradient-to-r from-[#006398]/20 to-transparent p-4 md:p-6 rounded-lg border-l-4 border-[#006398] mb-4 md:mb-6"
              variants={sectionVariants}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm md:text-base text-white font-medium leading-relaxed">
                Our commitment to accelerated migration timelines and proven AWS best practices ensures faster
                time-to-market while significantly reducing implementation risks for our valued clients.
              </p>
            </motion.div>

            <div className="space-y-4 mb-4 md:mb-6">
              {executionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="border-l-4 border-[#006398] pl-3 md:pl-4"
                  variants={listItemVariants}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                    {point.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-300">
                    {point.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Link href="/success-stories">
              <Button
                size="lg"
                className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
              >
                View Our Success Stories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}