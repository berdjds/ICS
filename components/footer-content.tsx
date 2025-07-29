"use client";

import {
  Youtube,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FooterContent() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <motion.div
      className="text-center flex flex-col items-center gap-6 md:gap-8 max-w-4xl mx-auto w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-3 md:gap-4"
      >
        <Image
          src="/logos/iNTEL-CS logo-02.png"
          alt="Intel CS Logo"
          width={180}
          height={120}
          className="object-contain"
        />
        <p className="text-sm md:text-base text-white-500 font-bold max-w-md mx-auto">
          Advanced Cloud & AI Solutions for Digital Transformation
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full">
        <h3 className="text-xl md:text-2xl font-bold text-[#006398] mb-2 md:mb-2">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-3 md:mb-4">
          <motion.a
            href="https://maps.app.goo.gl/inWsM7kYLExKMp729"
            target="_black"
            className="flex cursor-pointer flex-col items-center gap-2 md:gap-3 p-3 md:p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/30 rounded-lg border border-gray-800 backdrop-blur-sm"
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#006398]" />
            <div className="text-center">
              <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                Location
              </h4>
              <p className="text-gray-300 text-xs md:text-sm">
                Office 2508, Concord Tower, Dubai Media City, Dubai United Arab
                Emirates
              </p>
            </div>
          </motion.a>

          <motion.div
            className={`flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/30 rounded-lg border border-gray-800 backdrop-blur-sm ${
              isMobile
                ? "hover:border-[#006398] cursor-pointer"
                : "pointer-events-none opacity-70"
            } `}
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#006398]" />
            <div className="text-center">
              <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                Phone
              </h4>
              <p className="text-gray-300 text-xs md:text-sm">
                (+971) 4 835 8795
              </p>
            </div>
          </motion.div>

          <motion.a
            href="mailto:info@intel-cs.com"
            target="_blank"
            className="flex cursor-pointer flex-col items-center gap-2 md:gap-3 p-3 md:p-4 hover:border-[#006398] transition-all duration-300 bg-gray-900/30 rounded-lg border border-gray-800 backdrop-blur-sm"
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#006398]" />
            <div className="text-center">
              <h4 className="font-semibold text-white mb-1 text-sm md:text-base">
                Email
              </h4>
              <p className="text-gray-300 text-xs md:text-sm">
                info@intel-cs.com
              </p>
            </div>
          </motion.a>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-4 md:gap-6">
        <Link href="https://www.instagram.com/intelligencecloudsphere/">
          <Instagram className="w-5 h-5 md:w-6 md:h-6 hover:text-[#006398] transition-colors cursor-pointer" />
        </Link>
        <Link href="https://www.linkedin.com/company/intel-cs">
          <Linkedin className="w-5 h-5 md:w-6 md:h-6 hover:text-[#006398] transition-colors cursor-pointer" />
        </Link>
        <Link href="https://www.youtube.com/@iNTEL-CS-w9e">
          <Youtube className="w-5 h-5 md:w-6 md:h-6 hover:text-[#006398] transition-colors cursor-pointer" />
        </Link>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border-t border-gray-800 pt-2 w-full text-center"
      >
        <p className="text-xs md:text-sm text-white-500 font-bold">
          © 2025 iNTEL-CS. All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  );
}
