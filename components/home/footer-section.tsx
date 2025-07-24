"use client"

import { FooterContent } from "@/components/footer-content"

export function FooterSection() {
  return (
    <section className="min-h-[80vh] md:min-h-[60vh] flex items-center justify-center py-20 md:py-24 mb-20 md:mb-0">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-2 flex items-center justify-center">
        <FooterContent />
      </div>
    </section>
  )
}