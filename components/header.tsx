"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCloudDropdownOpen, setIsCloudDropdownOpen] = useState(false);
  const [isMobileCloudOpen, setIsMobileCloudOpen] = useState(false);

  const cloudServices = [
    { name: "Cloud Solutions", href: "/cloud-services/cloud-solution" },
    { name: "AI & Data Solutions", href: "/cloud-services/ai&data" },
    {
      name: "Business Process Automation",
      href: "/cloud-services/business-process",
    },
  ];

  const handleDropdownEnter = () => {
    setIsCloudDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsCloudDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-1 md:p-4 lg:p-5 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/__white logo.png"
            alt="Intel CS Logo"
            width={200}
            height={160}
            // className="object-contain w-[140px] md:w-[160px] lg:w-[180px] h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Home
            </Button>
          </Link>
          <Link href="/about-us">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              About Us
            </Button>
          </Link>
          <Link href="/ai-solutions">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Solutions
            </Button>
          </Link>

          {/* Cloud Services Dropdown - Fixed Version */}
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2 flex items-center gap-1">
              Services
              <ChevronDown className="w-4 h-4" />
            </Button>

            {isCloudDropdownOpen && (
              <div className="absolute top-full left-0 mt-0 w-64 bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg py-2">
                {cloudServices.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-3 text-sm text-white hover:bg-[#006398]/20 hover:text-[#006398] transition-colors"
                    onClick={() => setIsCloudDropdownOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/success-stories">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Success Stories
            </Button>
          </Link>
          
          <Link href="/contact-us">
            <Button className="bg-[#006398] hover:bg-[#004d7a] text-white rounded-full text-sm px-4 py-2">
              Contact Us
            </Button>
          </Link>
          <Link
            href="https://intel-cs-support.atlassian.net/servicedesk/customer/user/login?destination=portals"
            target="_blank"
            className="bg-[#006398] hover:bg-[#004d7a] text-white flex items-center rounded-full text-sm px-4 py-2"
          >
            {/* <Image
              src="/support.png"
              alt="Intel CS support"
              width={60}
              height={50}
              className="mr-6"
            /> */}
            Customer Support Portal
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
                Solutions
              </Button>
            </Link>
            <Link href="/about-us" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full">
                About Us
              </Button>
            </Link>

            {/* Mobile Cloud Services Dropdown */}
            <div className="w-full">
              <Button
                className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full flex items-center justify-between"
                onClick={() => setIsMobileCloudOpen(!isMobileCloudOpen)}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileCloudOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {isMobileCloudOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {cloudServices.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileCloudOpen(false);
                      }}
                      className="block py-2 px-4 text-sm text-white hover:text-[#006398] border-l-2 border-gray-700 hover:border-[#006398] transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/success-stories" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#006398] hover:bg-[#004d7a] text-white rounded-full">
                Success Stories
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
