'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Plus, X } from "lucide-react"
import Link from 'next/link'
import ImageUploader from './ImageUploader'
import { useGradioWebSocket } from '@/hooks/useGradioWebSocket'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SecondWebSocketHandler from './SecondWebSocket'

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [blob, setBlob] = useState<any>();
  const [outputImageURL, setOutputImageURL] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState('male');
  const [loading, setLoading] = useState(false)

  // WebSocket
  const { connected, message, sendMessage } = useGradioWebSocket("ws://127.0.0.1:8888/queue/join");


  const newHash = Math.random().toString(36).substring(2);
  // Sequence control
  const [step, setStep] = useState<null | "idle" | "waiting_estimation" | "waiting_send_data" | "waiting_process_start" | "waiting_process_completed" | "waiting_second_send_hash" | "waiting_second_send_data" | "waiting_second_process_start" | "waiting_second_process_completed" | "done">("idle");
  const [sessionHash, setSessionHash] = useState<string>(newHash);
  const [sequenceResult, setSequenceResult] = useState<any>(null);
  const [openSecondSocket, setOpenSecondSocket] = useState(false);

  // For stable references in effects
  const imageAllData = useRef<any>(null);
  const imagePreviewData = useRef<any>(null);

  const fnIndex67 = useRef<any>(null);
  const fnIndex68 = useRef<any>(null);

  // Create a preview when file is selected
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setOutputImageURL(null);
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const getImageBlob = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blobImage = new Blob([reader.result as ArrayBuffer], { type: selectedFile.type });
        setBlob(blobImage);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  useEffect(() => {
    getImageBlob();
  }, [selectedFile]);



  const functionData1 = { "fn_index": 67, "session_hash": sessionHash }
  const functionData2 = { "fn_index": 68, "session_hash": sessionHash }

  fnIndex67.current = functionData1;
  fnIndex68.current = functionData2

  // Main orchestrator: handle WebSocket message sequence
  useEffect(() => {
    if (!message) return;
    let msgObj;
    try {
      msgObj = typeof message === "string" ? JSON.parse(message) : message;
    } catch {
      return;
    }
    // Step orchestration
    if (step === "waiting_estimation" && msgObj.msg === "estimation") {
      setStep("waiting_send_data");
      // console.log("estimation step")
    } else if (step === "waiting_send_data" && msgObj.msg === "send_data") {
      // console.log("send data step")
      sendMessage(JSON.stringify(imageAllData.current));
      setStep("waiting_process_start");
    } else if (step === "waiting_process_start" && msgObj.msg === "process_starts") {
      // console.log("process start steps")
      setStep("waiting_process_completed");
    } else if (step === "waiting_process_completed" && msgObj.msg === "process_completed") {
      // console.log("process completed steps")
      setSequenceResult(msgObj.output);
      // Start second sequence
      setStep("waiting_second_send_hash");
      setOpenSecondSocket(true);
    }

  }, [message, step, sendMessage]);


  const prompt = selectedGender === 'male'
    ? "Create a photorealistic portrait of a male model with black hair and brown eyes,capturing a full body shot inside studio lighting.She stands in a front post,exuding a sense of warmth and friendliness.The image should be in 8k HDR to ensure high quality,with a focus on realism"
    : "Create a photorealistic portrait of a female model with black hair and brown eyes,capturing a full body shot inside studio lighting.She stands in a front post,exuding a sense of warmth and friendliness.The image should be in 8k HDR to ensure high quality,with a focus on realism";

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  // Start sequence: prepare session hash and data payloads
  const handleStartSequence = async () => {
    setLoading(true);
    const base64Image = await getBase64(blob);


    const d1 = {
      "data": [
        null,
        false,
        prompt,
        "",
        [
          "Fooocus V2",
          "Fooocus Enhance",
          "Fooocus Sharp",
          "Foocus Photograph"
        ],
        "Extreme Speed",
        "1152×896 <span style=\"color: grey;\"> ∣ 9:7</span>",
        1,
        "png",
        "8010890410716430589",
        false,
        2,
        4,
        "juggernautXL_v8Rundiffusion.safetensors",
        "None",
        0.5,
        true,
        "sd_xl_offset_example-lora_1.0.safetensors",
        0.1,
        true,
        "None",
        1,
        true,
        "None",
        1,
        true,
        "None",
        1,
        true,
        "None",
        1,
        true,
        "ip",
        "Disabled",
        null,
        [],
        null,
        "",
        null,
        false,
        false,
        false,
        false,
        1.5,
        0.8,
        0.3,
        7,
        2,
        "dpmpp_2m_sde_gpu",
        "karras",
        "Default (model)",
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        false,
        false,
        false,
        false,
        64,
        128,
        "joint",
        0.25,
        false,
        1.01,
        1.02,
        0.99,
        0.95,
        false,
        false,
        "v2.6",
        1,
        0.618,
        false,
        false,
        0,
        false,
        false,
        "fooocus",
        base64Image,
        0.5,
        0.6,
        "ImagePrompt",
        null,
        0.5,
        0.6,
        "ImagePrompt",
        null,
        0.5,
        0.6,
        "ImagePrompt",
        null,
        0.5,
        0.6,
        "ImagePrompt",
        false,
        0,
        false,
        null,
        false,
        "Disabled",
        "Before First Enhancement",
        "Original Prompts",
        false,
        "",
        "",
        "",
        "sam",
        "full",
        "vit_b",
        0.25,
        0.3,
        0,
        false,
        "v2.6",
        1,
        0.618,
        0,
        false,
        false,
        "",
        "",
        "",
        "sam",
        "full",
        "vit_b",
        0.25,
        0.3,
        0,
        false,
        "v2.6",
        1,
        0.618,
        0,
        false,
        false,
        "",
        "",
        "",
        "sam",
        "full",
        "vit_b",
        0.25,
        0.3,
        0,
        false,
        "v2.6",
        1,
        0.618,
        0,
        false
      ],
      "event_data": null,
      "fn_index": 67,
      "session_hash": sessionHash
    };
    const d2 = {
      data: [null],
      event_data: null,
      fn_index: 68,
      session_hash: sessionHash
    };
    imageAllData.current = d1;
    imagePreviewData.current = d2;

    sendMessage(JSON.stringify(functionData1));
    setStep("waiting_estimation");
  };

  const handleSecondProcessCompleted = (output) => {
    setSequenceResult(output);
    setStep("done");
    setOpenSecondSocket(false);

  };



  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        {/* Left side - Example Image */}


        <div className="flex justify-center w-full">
          {/* Combined preview & loading container */}

          <div className="mt-2 relative mb-16">
            {/* Preview image section */}
            {preview && (
              <>
                <h3 className="text-sm font-medium mb-2">Image Preview:</h3>
                <div className="relative aspect-video rounded-md overflow-hidden border border-gray-200">
                  <div className={`relative ${loading ? 'opacity-50 blur-sm' : ''} transition-all duration-300`}>
                    <img src={preview} alt="Preview" className="object-contain w-full h-full" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}


            {loading && preview && (



              <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                <div className="spinner-container flex flex-col items-center gap-2">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-900 rounded-full"></div>
                  <span className="text-sm text-gray-700">Generating...</span>
                </div>
              </div>

            )
            }
          </div>


          {/* Results display */}
          {sequenceResult && (
            <div className="mt-4">
              <div className="image-preview mt-4">
                {sequenceResult.data
                  .filter(item => item?.visible && item?.value)
                  .map((item, index) => (
                    <div key={index} className="image-item mb-2">
                      {item.value.map((img, imgIndex) => (
                        <div key={imgIndex} className="image-container mb-2">
                          <img
                            src={`http://127.0.0.1:8888/file=${img.name.replace(/\\/g, '/')}`}
                            alt={`Generated Image ${index + 1}`}
                            className="preview-image w-full rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>



        {/* Right side - Upload Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Generate your Model</h2>
            <p className="text-xl text-gray-700">With AI - Free & Fast</p>
          </div>

          <>

            <ImageUploader handleFileChange={handleFileChange} />
            <p className="text-gray-600">or drop a file</p>
          </>

          <div>
            <h1>Choose Gender</h1>
            <RadioGroup value={selectedGender} onValueChange={handleGenderChange} >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="option-one" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="option-two" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Button className="col-span-1" onClick={handleStartSequence} disabled={step !== "idle" && step !== "done"}>
              Generate Image
            </Button>
          </div>



          <div className="text-sm text-gray-600">
            <p>
              By uploading an image or URL, you agree to our{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
              . To learn more about how maskbg.ai handles your personal data, check out{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {openSecondSocket && (
            <SecondWebSocketHandler
              fnIndex68={fnIndex68}
              imagePreviewData={imagePreviewData}
              onProcessCompleted={handleSecondProcessCompleted}
              setLoading={setLoading}
              setPreview={setPreview}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default UploadSection