"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const services = [
  {
    title: "24/7 Managed Services",
    desc: "Comprehensive cloud infrastructure monitoring and optimization with round-the-clock support",
  },
  {
    title: "Outsourced IT Operations",
    desc: "Complete IT operations management leveraging cutting-edge cloud-native technologies",
  },
  {
    title: "Complete Cloud Ecosystems",
    desc: "We architect comprehensive cloud platforms enabling accelerated time-to-market and streamlined implementation processes",
  },
];

export function CloudExcellenceSection() {
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
            Cloud Excellence & Management
          </h2>

          <motion.div className="mb-6 md:mb-8" variants={sectionVariants}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
              Our mission centers on developing intelligent, robust cloud
              solutions that empower individuals and organizations to achieve
              sustainable growth.
            </p>

            <div className="space-y-3 md:space-y-4">
              {services.map((service, index) => (
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
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Link href="/cloud-services/cloud-solution">
              <Button
                size="lg"
                className="bg-[#006398] hover:bg-[#004d7a] text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold rounded-full"
              >
                Explore Cloud Solutions
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
