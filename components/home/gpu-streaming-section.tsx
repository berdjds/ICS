"use client";

import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function GpuStreamingSection() {
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
            Stepping into the Future
          </h2>

          <motion.div className="mb-4 md:mb-6" variants={sectionVariants}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
              Stream GPU-Powered Experiences From Render to Reality, No
              Hardware, No Limits.
            </h3>
          </motion.div>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            Create immersive metaverse platforms with interactive 3D
            environments, real-time social engagement, and virtual commerce
            without requiring high-end hardware. With fully managed, AI-enhanced
            GPU infrastructure powered by Amazon GameLift Streams, you can
            deliver virtual events, mini-games, and dynamic experiences
            instantly to standard devices, scaling globally with ease.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
