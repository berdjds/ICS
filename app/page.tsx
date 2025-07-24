"use client"

import { Suspense, useEffect, useState } from "react"
import { Scroll, ScrollControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Scene } from "@/components/scene"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { GpuStreamingSection } from "@/components/home/gpu-streaming-section"
import { CloudExcellenceSection } from "@/components/home/cloud-excellence-section"
import { SystemModernizationSection } from "@/components/home/system-modernization-section"
import { ProvenExecutionSection } from "@/components/home/proven-execution-section"
import { FooterSection } from "@/components/home/footer-section"
import { Loader2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const isMobile = useIsMobile()
  const [scrollPages, setScrollPages] = useState(5.9)

  useEffect(() => {
    if (isMobile) {
      setScrollPages(5.5)
    } else {
      const dpr = window.devicePixelRatio || 1
      if (dpr === 1.25) {
        setScrollPages(5.9)
      } else if (dpr >= 1.5) {
        setScrollPages(6.3)
      } else {
        setScrollPages(5.9)
      }
    }
  }, [isMobile])

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto md:overflow-hidden bg-black">
      <Header />
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <Loader2 className="w-12 h-12 animate-spin text-[#006398]" />
          </div>
        }
      >
        <Canvas shadows camera={{ position: [0, 0, 12], fov: 30 }}>
          <ScrollControls pages={scrollPages} damping={0.1}>
            <Scene />
            <Scroll html>
              <div className="w-screen">
                <HeroSection />
                <GpuStreamingSection />
                <CloudExcellenceSection />
                <SystemModernizationSection />
                <ProvenExecutionSection />
                <FooterSection />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </div>
  )
}
