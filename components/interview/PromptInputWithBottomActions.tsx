// "use client";

// import React, { useState } from "react";
// import { Button } from "@heroui/react";
// import { Icon } from "@iconify/react";

// import PromptInput from "./PromptInput";
// import toast from "react-hot-toast";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== "undefined" &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// export default function PromptInputWithBottomActions({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (value: string) => void;
// }) {
//   const [prompt, setPrompt] = useState<string>(value);

//   const handleValueChange = (value: string) => {
//     setPrompt(value);
//     onChange(value);
//   };

//   const handleVoiceInput = () => {
//     if (!SpeechRecognition) {
//       return toast.error("Voice input is not supported in this browser");
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       handleValueChange(prompt + " " + transcript);
//     };

//     recognition.onerror = (event: any) => {
//       console.log("Error occurred in recognition: ", event?.error);
//     };

//     recognition.start();
//   };

//   return (
//     <div className="flex w-full flex-col gap-4">
//       <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
//         <PromptInput
//           classNames={{
//             inputWrapper: "!bg-transparent shadow-none",
//             innerWrapper: "relative",
//             input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
//           }}
//           minRows={3}
//           radius="lg"
//           value={prompt}
//           variant="flat"
//           onValueChange={handleValueChange}
//         />
//         <div className="flex w-full items-center justify-between gap-2 overflow-scroll px-4 pb-4">
//           <div className="flex w-full gap-1 md:gap-3">
//             <Button
//               size="sm"
//               startContent={
//                 <Icon
//                   className="text-default-500"
//                   icon="solar:soundwave-linear"
//                   width={18}
//                 />
//               }
//               variant="flat"
//               onPress={handleVoiceInput}
//             >
//               Type with Voice
//             </Button>
//           </div>
//           <p className="py-1 text-tiny text-default-400">
//             Chars:{prompt?.length}
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import toast from "react-hot-toast";
// import PromptInput from "./PromptInput";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== "undefined" &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// export default function PromptInputWithBottomActions({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (value: string) => void;
// }) {
//   const [prompt, setPrompt] = useState<string>(value);

//   const handleValueChange = (value: string) => {
//     setPrompt(value);
//     onChange(value);
//   };

//   const handleVoiceInput = () => {
//     if (!SpeechRecognition) {
//       return toast.error("Voice input is not supported in this browser");
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       handleValueChange(prompt + " " + transcript);
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Error occurred in recognition: ", event?.error);
//     };

//     recognition.start();
//   };

//   return (
//     <div className="flex w-full flex-col gap-4">
//       <form className="flex w-full flex-col items-start rounded-xl border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100">
//         <PromptInput
//           className="bg-transparent shadow-none p-3 w-full text-gray-800 rounded-xl"
//           value={prompt}
//           onChange={(e) => handleValueChange(e.target.value)}
//           rows={4}
//         />

//         <div className="flex w-full items-center justify-between gap-2 px-4 pb-3">
//           <div className="flex w-full gap-2 md:gap-3">
//             <button
//               type="button"
//               onClick={handleVoiceInput}
//               className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200 transition"
//             >
//               <Icon
//                 className="text-gray-500"
//                 icon="solar:soundwave-linear"
//                 width={18}
//               />
//               Type with Voice
//             </button>
//           </div>
//           <p className="py-1 text-xs text-gray-500">
//             Chars: {prompt?.length}
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }




// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import toast from "react-hot-toast";
// import PromptInput from "./PromptInput";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== "undefined" &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// export default function PromptInputWithBottomActions({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (value: string) => void;
// }) {
//   const [prompt, setPrompt] = useState<string>(value);
//   const [isListening, setIsListening] = useState(false);
//   const [isVideoActive, setIsVideoActive] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const recognitionRef = useRef<any>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const handleValueChange = (value: string) => {
//     setPrompt(value);
//     onChange(value);
//   };

//   // ✅ Voice input
//   const handleVoiceInput = async () => {
//     if (!SpeechRecognition) return toast.error("Browser not supported");

//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//     } catch {
//       return toast.error("Please allow microphone access");
//     }

//     if (isListening) {
//       recognitionRef.current?.stop();
//       setIsListening(false);
//       toast.success("Voice typing stopped");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsListening(true);
//       toast.success("Voice typing started...");
//     };

//     recognition.onresult = (event: any) => {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i)
//         transcript += event.results[i][0].transcript;
//       handleValueChange(prompt + " " + transcript);
//     };

//     recognition.onerror = () => toast.error("Speech recognition failed");
//     recognition.onend = () => setIsListening(false);
//     recognition.start();
//   };

//   // ✅ Video + speech input (fixed)
//   const handleVideoInput = async () => {
//     if (isVideoActive) {
//       recognitionRef.current?.stop();
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//       setIsVideoActive(false);
//       setIsListening(false);
//       toast.success("Video stopped");
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 320, height: 240 },
//         audio: true,
//       });
//       streamRef.current = stream;

//       // 🟢 Ensure video element is ready before assigning stream
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play().catch((err) => {
//           console.error("Video play error:", err);
//         });
//       }

//       setIsVideoActive(true);
//       toast.success("Video interview started!");

//       if (!SpeechRecognition) {
//         toast.error("Speech recognition not supported");
//         return;
//       }

//       const recognition = new SpeechRecognition();
//       recognitionRef.current = recognition;
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = "en-US";

//       recognition.onresult = (event: any) => {
//         let transcript = "";
//         for (let i = event.resultIndex; i < event.results.length; ++i)
//           transcript += event.results[i][0].transcript;
//         handleValueChange(prompt + " " + transcript);
//       };

//       recognition.onerror = () => toast.error("Speech recognition failed");
//       recognition.onend = () => setIsListening(false);
//       recognition.start();
//       setIsListening(true);
//     } catch (err) {
//       console.error("Camera/Mic error:", err);
//       toast.error("Please allow camera & mic permissions");
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       recognitionRef.current?.stop();
//       if (streamRef.current)
//         streamRef.current.getTracks().forEach((track) => track.stop());
//     };
//   }, []);

//   return (
//     <div className="flex w-full flex-col gap-4">
//       <form className="flex w-full flex-col items-start rounded-xl border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100">
//         {/* ✅ Video Preview */}
//         <div className="w-full flex justify-center p-3">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             className={`rounded-lg border border-gray-300 w-72 h-56 object-cover bg-black transition-opacity duration-500 ${
//               isVideoActive ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         </div>

//         <PromptInput
//           className="bg-transparent shadow-none p-3 w-full text-gray-800 rounded-xl"
//           value={prompt}
//           onChange={(e) => handleValueChange(e.target.value)}
//           rows={4}
//         />

//         <div className="flex w-full items-center justify-between gap-2 px-4 pb-3">
//           <div className="flex w-full gap-2 md:gap-3">
//             {/* Voice Input */}
//             <button
//               type="button"
//               onClick={handleVoiceInput}
//               className={`flex items-center gap-2 rounded-lg border ${
//                 isListening
//                   ? "border-blue-500 bg-blue-100"
//                   : "border-gray-300 bg-white"
//               } px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200 transition`}
//             >
//               <Icon
//                 className="text-gray-500"
//                 icon="solar:soundwave-linear"
//                 width={18}
//               />
//               {isListening ? "Stop Voice" : "Type with Voice"}
//             </button>

//             {/* Video Input */}
//             <button
//               type="button"
//               onClick={handleVideoInput}
//               className={`flex items-center gap-2 rounded-lg border ${
//                 isVideoActive
//                   ? "border-green-500 bg-green-100"
//                   : "border-gray-300 bg-white"
//               } px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200 transition`}
//             >
//               <Icon
//                 className="text-gray-500"
//                 icon="solar:videocamera-record-linear"
//                 width={18}
//               />
//               {isVideoActive ? "Stop Video" : "Video Interview"}
//             </button>
//           </div>
//           <p className="py-1 text-xs text-gray-500">Chars: {prompt?.length}</p>
//         </div>
//       </form>
//     </div>
//   );
// }





"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import PromptInput from "./PromptInput";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function PromptInputWithBottomActions({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [prompt, setPrompt] = useState<string>(value);
  const [isListening, setIsListening] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [faceAlert, setFaceAlert] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const finalTranscriptRef = useRef<string>("");
  const faceDetectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const noFaceCounterRef = useRef<number>(0);
  const lookingDownCounterRef = useRef<number>(0);

  const handleValueChange = (value: string) => {
    setPrompt(value);
    onChange(value);
  };

  const resetFinalTranscript = () => {
    finalTranscriptRef.current = prompt;
  };

  // ✅ Face detection using TensorFlow.js - FIXED VERSION
  // const initializeFaceDetection = async () => {
  //   // Check if TensorFlow.js is available
  //   if (typeof window === 'undefined' || !window.navigator) return;

  //   try {
  //     // Dynamically import TensorFlow.js and face-landmarks-detection
  //     const [tf, faceLandmarksDetection] = await Promise.all([
  //       import('@tensorflow/tfjs'),
  //       import('@tensorflow-models/face-landmarks-detection')
  //     ]);

  //     await tf.ready();
      
  //     // FIX: Use the correct model name - mediapipe_face_mesh
  //     const model = await faceLandmarksDetection.load(
  //       faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
  //       { 
  //         maxFaces: 1,
  //         detectorModelUrl: undefined, // Use default model
  //         landmarkModelUrl: undefined  // Use default model
  //       }
  //     );

  //     return model;
  //   } catch (error) {
  //     console.error("Face detection initialization failed:", error);
  //     toast.error("Face detection unavailable - continuing without it");
  //     return null;
  //   }
  // };

  const initializeFaceDetection = async () => {
  try {
    const [tf, faceLandmarksDetection] = await Promise.all([
      import("@tensorflow/tfjs"),
      import("@tensorflow-models/face-landmarks-detection"),
    ]);

    await tf.ready();

    const model = await faceLandmarksDetection.createDetector(
  faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh as any,
  {
    runtime: "tfjs",
    maxFaces: 1,
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
  } as any
);

    return model;
  } catch (error) {
    console.error("Face detection initialization failed:", error);
    toast.error("Face detection unavailable - continuing without it");
    return null;
  }
};


  // ✅ Detect face position and orientation
  const detectFace = async (model: any) => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.readyState < 2) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
        predictIrises: false // Set to false for better performance
      });

      if (predictions.length === 0) {
        // No face detected
        noFaceCounterRef.current++;
        if (noFaceCounterRef.current > 10) { // ~2 seconds at 5fps
          setFaceAlert("Please position your face in the camera view");
        }
        lookingDownCounterRef.current = 0;
        return;
      }

      // Face detected, reset no face counter
      noFaceCounterRef.current = 0;

      const keypoints = predictions[0].scaledMesh;
      
      // Get important facial landmarks
      const noseTip = keypoints[1]; // Nose tip
      const leftEye = keypoints[33]; // Left eye corner
      const rightEye = keypoints[263]; // Right eye corner
      const chin = keypoints[152]; // Chin

      // Calculate face position and orientation
      const eyeMidpoint = [
        (leftEye[0] + rightEye[0]) / 2,
        (leftEye[1] + rightEye[1]) / 2
      ];

      // Check if face is centered
      const faceCenterX = noseTip[0];
      const videoCenterX = video.videoWidth / 2;
      const xOffset = Math.abs(faceCenterX - videoCenterX);

      if (xOffset > video.videoWidth * 0.3) {
        setFaceAlert("Please center your face in the camera");
        return;
      }

      // Check if looking down (based on nose-chin relationship)
      const verticalDistance = chin[1] - noseTip[1];
      const eyeNoseDistance = noseTip[1] - eyeMidpoint[1];

      if (verticalDistance > eyeNoseDistance * 2.5) {
        lookingDownCounterRef.current++;
        if (lookingDownCounterRef.current > 8) { // ~1.6 seconds at 5fps
          setFaceAlert("Please look straight at the camera");
        }
      } else {
        lookingDownCounterRef.current = 0;
        setFaceAlert("");
      }

      // Draw face landmarks for debugging (optional)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 1;
      
      // Draw face mesh (simplified)
      keypoints.forEach((point: number[]) => {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI);
        ctx.stroke();
      });
    } catch (error) {
      console.error("Face detection error:", error);
      // Don't show toast for every frame error
    }
  };

  // ✅ Start face detection
  const startFaceDetection = async () => {
    const model = await initializeFaceDetection();
    if (!model) return;

    faceDetectionIntervalRef.current = setInterval(() => {
      detectFace(model);
    }, 500); // Reduced to every 500ms for better performance
  };

  // ✅ Stop face detection
  const stopFaceDetection = () => {
    if (faceDetectionIntervalRef.current) {
      clearInterval(faceDetectionIntervalRef.current);
      faceDetectionIntervalRef.current = null;
    }
    noFaceCounterRef.current = 0;
    lookingDownCounterRef.current = 0;
    setFaceAlert("");
  };

  // ... rest of your code remains the same (voiceInput, videoInput functions)

  // ✅ Voice input
  const handleVoiceInput = async () => {
    if (!SpeechRecognition) return toast.error("Browser not supported");

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      return toast.error("Please allow microphone access");
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      toast.success("Voice typing stopped");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      resetFinalTranscript();
      toast.success("Voice typing started...");
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;
      handleValueChange(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Speech recognition failed");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // ✅ Video + speech input
  const handleVideoInput = async () => {
    if (isVideoActive) {
      recognitionRef.current?.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsVideoActive(false);
      setIsListening(false);
      stopFaceDetection();
      toast.success("Video stopped");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
        audio: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((err) => {
          console.error("Video play error:", err);
        });
      }

      setIsVideoActive(true);
      toast.success("Video interview started!");

      // Start face detection
      await startFaceDetection();

      if (!SpeechRecognition) {
        toast.error("Speech recognition not supported");
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        resetFinalTranscript();
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        finalTranscriptRef.current = finalTranscript;
        handleValueChange(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast.error("Speech recognition failed");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Camera/Mic error:", err);
      toast.error("Please allow camera & mic permissions");
    }
  };

  // Update final transcript when prompt changes manually
  useEffect(() => {
    if (!isListening && !isVideoActive) {
      finalTranscriptRef.current = prompt;
    }
  }, [prompt, isListening, isVideoActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
      stopFaceDetection();
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <form className="flex w-full flex-col items-start rounded-xl border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100">
        {/* ✅ Video Preview with Face Detection Alert */}
        <div className="w-full flex flex-col items-center p-3 relative">
          {faceAlert && (
            <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm text-center animate-pulse">
              ⚠️ {faceAlert}
            </div>
          )}
          
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`rounded-lg border border-gray-300 w-72 h-56 object-cover bg-black transition-opacity duration-500 ${
                isVideoActive ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Hidden canvas for face detection */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none opacity-0"
            />
          </div>
        </div>

        <PromptInput
          className="bg-transparent shadow-none p-3 w-full text-gray-800 rounded-xl"
          value={prompt}
          onChange={(e) => handleValueChange(e.target.value)}
          rows={4}
        />

        <div className="flex w-full items-center justify-between gap-2 px-4 pb-3">
          <div className="flex w-full gap-2 md:gap-3">
            {/* Voice Input */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`flex items-center gap-2 rounded-lg border ${
                isListening
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-white"
              } px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200 transition`}
            >
              <Icon
                className="text-gray-500"
                icon="solar:soundwave-linear"
                width={18}
              />
              {isListening ? "Stop Voice" : "Type with Voice"}
            </button>

            {/* Video Input */}
            <button
              type="button"
              onClick={handleVideoInput}
              className={`flex items-center gap-2 rounded-lg border ${
                isVideoActive
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300 bg-white"
              } px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-200 transition`}
            >
              <Icon
                className="text-gray-500"
                icon="solar:videocamera-record-linear"
                width={18}
              />
              {isVideoActive ? "Stop Video" : "Video Interview"}
            </button>
          </div>
          <p className="py-1 text-xs text-gray-500">Chars: {prompt?.length}</p>
        </div>
      </form>
    </div>
  );
}