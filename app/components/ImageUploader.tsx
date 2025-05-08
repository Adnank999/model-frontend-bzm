"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

interface Props{
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({handleFileChange}:Props) {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       setImage(event.target?.result as string)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-green-600 bg-green-50" : "border-green-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="relative w-full h-64">
            <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-contain" />
          </div>
        ) : (
          <>
            <button
              onClick={handleButtonClick}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md flex items-center justify-center mx-auto mb-4"
            >
              <Plus className="mr-2 h-5 w-5" />
              Upload Image
            </button>
            <p className="text-gray-600">or drop a file</p>
          </>
        )}
      </div>

      {image && (
        <button
          onClick={() => setImage(null)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Remove Image
        </button>
      )}
    </div>
  )
}