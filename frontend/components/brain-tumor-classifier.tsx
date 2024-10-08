'use client'

import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Brain } from "lucide-react"

export function BrainTumorClassifierComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleImageUpload = async(event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
    const url = process.env.ROOT_URL || ''
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({image: file})
    
  });
    if(!response.ok){
      setMessage("Error processing the message, please try again.")
    }

    const data = await response.json()
    setMessage(`The image corresponds to ${data}`)
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-bold">Brain Tumor Classifier</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardDescription className="text-center">
              Upload an MRI scan image to detect and classify brain tumors using advanced AI technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <span className="block text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </span>
                    <span className="block text-xs text-gray-500">
                      Supported formats: JPEG, PNG, GIF
                    </span>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
              </div>
              {selectedImage && (
                <div className="mt-4">
                  <img src={selectedImage} alt="Uploaded MRI Scan" className="max-w-full h-auto mx-auto rounded-lg" />
                </div>
              )}
              <Button className="w-full" type="submit">
                Analyze Image
              </Button>
            </form>
            {message && (<div>{message}</div>)}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}