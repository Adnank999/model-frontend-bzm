"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const tabs = [
  { id: "sample", label: "Sample" },
  { id: "clothes", label: "Clothes" },
  { id: "models", label: "Models" },
]

export default function ProfessionalVisuals() {
  const [activeTab, setActiveTab] = useState("sample")
  const [sliderPosition, setSliderPosition] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Handle mouse/touch events for slider
  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const sliderRect = sliderRef.current.getBoundingClientRect()

    const sliderWidth = sliderRect.width


    // Get clientX from either mouse or touch event
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX

    // Calculate position as percentage
    let position = ((clientX - sliderRect.left) / sliderWidth) * 100

    // Clamp position between 0 and 100
    position = Math.max(0, Math.min(100, position))

    setSliderPosition(position)
  }

  // Add and remove event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    document.addEventListener("mouseup", handleMouseUpGlobal)
    document.addEventListener("touchend", handleMouseUpGlobal)

    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal)
      document.removeEventListener("touchend", handleMouseUpGlobal)
    }
  }, [])

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Create Professional Models</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-md p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-3xl mx-auto">
          <div
            ref={sliderRef}
            className="relative rounded-lg overflow-hidden h-[500px] select-none cursor-col-resize"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleMouseMove}
          >
            {/* Before Image (Original) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/style1/sample1.jpg"
                alt="Original image"
                width={800}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            {/* After Image (with new background) */}
            <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <Image
                src="/images/style1/sampleOutput1.png"
                alt="Image with new background"
                width={800}
                height={500}
                className="w-full h-full object-contain"
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
              />
            </div>

            {/* Slider Control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-md cursor-col-resize z-10 flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="flex">
                  <ChevronLeft className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
              After
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p>Drag the slider to compare before and after images</p>
          </div>
        </div>
      </div>
    </section>
  )
}
