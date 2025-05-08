"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "sample", label: "Sample" },
  { id: "clothes", label: "Clothes" },
  { id: "models", label: "Models" },
]

// Sample data for each tab
const tabContent = {
  sample: [
    {
      id: 1,
      sampleImage: "/images/style1/sample1.jpg",
      outputImage: "/images/style1/sampleOutput1.png",
      title: "Sample 1",
    },
    {
      id: 2,
      sampleImage: "/images/style2/sample2.png",
      outputImage: "/images/style2/sampleOutput2.png",
      title: "Sample 2",
    },
  ],
  clothes: [
    {
      id: 1,
      sampleImage: "/images/clothes/clothe1.jpg",
      outputImage: "/images/clothes/clothe2.jpg",
      title: "Clothes ",
    },
    // {
    //   id: 2,
    //   sampleImage: "/placeholder.svg?height=500&width=400",
    //   outputImage: "/placeholder.svg?height=500&width=400",
    //   title: "Clothes 2",
    // },
  ],
  models: [
    {
      id: 1,
      sampleImage: "/images/models/model1.png",
      outputImage: "/images/models/model2.png",
      title: "Model 1",
    },
    {
      id: 2,
      sampleImage: "/images/models/model3.png",
      outputImage: "/images/models/model4.png",
      title: "Model 1",
    },
    {
      id: 3,
      sampleImage: "/images/models/model5.png",
      outputImage: "/images/models/model6.png",
      title: "Model 1",
    },
    {
      id: 4,
      sampleImage: "/images/models/model7.png",
      outputImage: "/images/models/model8.png",
      title: "Model 1",
    },
    {
      id: 5,
      sampleImage: "/images/models/model9.png",
      outputImage: "/images/models/model10.png",
      title: "Model 1",
    },
    

  ],
}

export default function ProfessionalVisualsWorking() {
  const [activeTab, setActiveTab] = useState("sample")

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

        {/* Image Comparisons */}
        <div className="space-y-16">
          {tabContent[activeTab as keyof typeof tabContent].map((item) => (
            <div key={item.id} className="space-y-6">
              {activeTab === "sample" && <h3 className="text-2xl font-semibold text-center">{item.title}</h3>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sample Image */}
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden border border-gray-200 bg-white p-4">
                    <div className="relative h-[400px] w-full">
                      <Image
                        src={item.sampleImage || "/placeholder.svg"}
                        alt={`Sample image for ${item.title}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {activeTab === "sample" && <div className="text-center">
                    <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
                      Sample Image
                    </span>
                  </div>}
                </div>

                {/* Output Image */}
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden border border-gray-200 bg-white p-4">
                    <div className="relative h-[400px] w-full">
                      <Image
                        src={item.outputImage || "/placeholder.svg"}
                        alt={`Output image for ${item.title}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {activeTab === "sample" && <div className="text-center">
                    <span className="inline-block bg-gray-800 text-white px-4 py-2 rounded-full font-medium">
                      Output Image
                    </span>
                  </div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
