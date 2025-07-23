"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4 lg:p-5 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/iNTEL-CS logo-02.png"
            alt="Intel CS Logo"
            width={180}
            height={120}
            className="object-contain w-[140px] md:w-[160px] lg:w-[180px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/ai-solutions">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              AI Solutions
            </Button>
          </Link>
          <Link href="/about-us">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              About Us
            </Button>
          </Link>
          <Link href="/cloud-services">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Cloud Services
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <nav className="flex flex-col p-4 space-y-3">
            <Link href="/ai-solutions" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full">
                AI Solutions
              </Button>
            </Link>
            <Link href="/cloud-services" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full">
                Cloud Services
              </Button>
            </Link>
            <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full">
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
