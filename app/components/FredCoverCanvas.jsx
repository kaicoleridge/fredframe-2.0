"use client";

import { useRef, useEffect, useState } from "react";


export default function FredCoverCanvas() {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [gradientOption, setGradientOption] = useState(""); 
  const fileInputRef = useRef(null);
  
  const gradientOptions = [
    { key: "AL1", label: "Actual Life 1", gradient: "linear-gradient(to top right, #ff5050, #c80000)" },
    { key: "AL2", label: "Actual Life 2", gradient: "linear-gradient(to top right, #ffa578, #cc7e1f)" },
    { key: "AL3", label: "Actual Life 3", gradient: "linear-gradient(to top right, #0078ff, #003cc8)" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
     const maxSize = 5 * 1024 * 1024; // 5MB
     if (file.size > maxSize) {
    alert("File is too large. Please upload an image smaller than 5MB.");
    return;
  }
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target.result);
    reader.readAsDataURL(file);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0,10); 
    link.download = `fredframe-${date}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Canvas Rendering Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasSize = 1200 // Internal resolution matches display size
    canvas.width = canvasSize;
    canvas.height = canvasSize;


    //no image display this canvas
    if (!imageSrc) {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.font = "900 50px sans-serif";
      ctx.fillStyle = "#555";
      ctx.textAlign = "center";
      ctx.fillText("Upload image", canvasSize / 2, canvasSize / 2);
      return;
    }

    // Draw image and gradient overlay
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
const size = Math.min(img.width, img.height);
const sourceX = (img.width - size) / 2;
const sourceY = (img.height - size) / 2;

ctx.drawImage(img, sourceX, sourceY, size, size, 0, 0, canvasSize, canvasSize);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize);
      switch (gradientOption) {
        case "AL1":
          gradient.addColorStop(0, "rgba(255, 80, 80, 0.6)");
          gradient.addColorStop(1, "rgba(200, 0, 0, 0.6)");
          break;
        case "AL2":
          gradient.addColorStop(0, "rgba(255, 165, 120, 0.6)");
          gradient.addColorStop(1, "rgba(204, 126, 31, 0.6)");
          break;
        case "AL3":
          gradient.addColorStop(0, "rgba(0, 120, 255, 0.6)");
          gradient.addColorStop(1, "rgba(0, 60, 200, 0.2)");
          break;
        default:
          gradient.addColorStop(0, "rgba(0,0,0,0.25)");
          gradient.addColorStop(1, "rgba(0,0,0,0.2)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    };
  }, [imageSrc, gradientOption]);

  return (
    <div className="flex flex-col items-center text-white p-10 pt-5">
      {/* Header */}
      

      {/* Main Layout */}
      <main className="flex flex-col md:flex-row w-full max-w-5xl justify-between gap-6">
        
{/* Controls */}
<div className="flex flex-col gap-6 w-full md:w-1/2 items-center mt-2 md:mt-42 pb-8">
  {/* Upload + Gradient side by side */}
  <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
   {/* Upload Button */}
<div className="flex-1 flex flex-col items-center">
  <button
    onClick={handleUploadClick}
    className="w-full md:w-auto px-12 py-4 rounded-full bg-white text-black border-4 border-neutral-800 text-xl font-black tracking-tighter transition hover:bg-neutral-800 hover:text-white"
  >
    upload.
  </button>
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: "none" }}
  />
  <div className="flex items-center gap-2 mt-2">
    
{/*
<div>
  <input
    type="checkbox"
    id="uploadCheckbox"
    onChange={(e) => setUploadToS3(e.target.checked)}
    className={`w-4 h-4 accent-white ${imageSrc ? 'hidden' : ''}`}
  />
  <label htmlFor="uploadCheckbox" className={`text-white font-semibold` + (imageSrc ? ' hidden' : '')}>
    Upload to cloud
  </label>
</div>
*/}
  </div>
</div>




    {/* Gradient Select Menu */}
<div className="flex-1 flex justify-center">
  <select
    value={gradientOption || ""}
    onChange={(e) => setGradientOption(e.target.value)}
    className="w-full md:w-auto px-12 py-4 rounded-full bg-transparent border-4 appearance-none border-neutral-800 text-xl font-black tracking-tighter text-white transition hover:bg-neutral-800"
  >
    {/* Placeholder / label option */}
    <option value="" disabled>
     choose filter. ⬇️
    </option>

    {/* Actual gradient options */}
    {gradientOptions.map((option) => (
      <option key={option.key} value={option.key} className="text-black">
        {option.label}
      </option>
    ))}
  </select>
</div>
  </div>

  {/* Download Button underneath */}
  <button
    onClick={handleDownload}
    className={`w-full p-3 mt-4 text-xl rounded-lg text-black font-black tracking-tighter transition ${
      imageSrc 
        ? 'bg-white hover:bg-neutral-200' 
        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed hidden'
    }`}
  >
    Download Cover
  </button>
</div>


        {/* Canvas Preview (Right) */}
        <div className="w-full md:w-1/2 flex justify-center items-center md:ml-32 relative ">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className={`w-80 h-80 md:w-96 md:h-96 border-neutral-900 bg-neutral-900 rounded-xl shadow-lg ${!imageSrc ? 'border-6' : 'border-white border-6'}`}
          />

          {/* Example overlay under canvas */}
          <img
            src="/fred.png"
            alt="FredFrame Example"
            className={`absolute -bottom-5 left-50 transform -translate-x-1/2 w-64 md:w-96 opacity-80 pointer-events-none select-none ${imageSrc ? 'hidden' : ''}`}
          />
        </div>
      </main>

      {/* Footer */}
     {/* Footer */}
<footer className="mt-72 text-center text-sm text-neutral-700 mt-10">
  <p className="text-gray-600 font-semibold text-lg">
    made by <a href="https://coleridge.dev" className="font-black text-xl tracking-tighter">kai</a>
  </p>
  <p className="m-2 font-mono">
    This app has <span className="font-bold">no affiliation</span> with Fred again.
  </p>
</footer>

    </div>
  );
}
