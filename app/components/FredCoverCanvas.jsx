"use client";

import { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function FredCoverCanvas() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const waterMarkRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [gradientOption, setGradientOption] = useState("");
  const [currentSaying, setCurrentSaying] = useState("");
  const [loading, setLoading] = useState(false);

  const gradientOptions = [
    { key: "AL1", label: "Actual Life 1" },
    { key: "AL2", label: "Actual Life 2" },
    { key: "AL3", label: "Actual Life 3" },
    { key: "USB", label: "USB (EXCLUSIVE) ⭐"}
  ];

const buildVersion = "v2.0.1";

const sayings = [
  "Look at this masterpiece",
  "Master at work",
  "Style suits you",
  "I found (your image)",
  "I adore your image",
  "Let's see that photo",
  "Killer in the jungle",
  "You made the city",
  "Ten out of ten",
  "Dancing through the pixels",
  "Caught in the Fred Frame",
  "Lil Yachty would approve",
  "Stayinit",
  "Show this to everybody",
  "Everybody!!",
  "Actual Life vibes",
  "Kyle Beats on repeat",
  "Brighter days ahead",
  "Turn the lights down low",
  "Feeling alive",
  "Late night in London",
  "From the studio to you",
  "This is my actual life",
  "Spinning through the night",
  "Lift me up",
  "We’ll never sleep",
  "Memories captured",
  "Everything changed",
  "Heartbeat sync",
  "Another banger",
  "Lost in the sound",
  "Sunsets & beats",
  "Catch me outside",
  "Mood on 100",
  "All the feels",
  "Fred would approve",
  "Night city energy",
  "This hits different",
  "Replay forever",
  "Straight from the studio",
  "A moment to remember",
  "Voices in the dark",
  "Dance like no one’s watching",
  "Lights, music, life"
];


  // Preload watermark
  useEffect(() => {
    const logo = new Image();
    logo.src = "/water.png";
    logo.crossOrigin = "anonymous";
    waterMarkRef.current = logo;
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setLoading(true);

      const randomIndex = Math.floor(Math.random() * sayings.length);
      setCurrentSaying(sayings[randomIndex]);

      setTimeout(() => {
        setImageSrc(event.target.result);
        setLoading(false);
      }, 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleDownload = () => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.download = `fredframe-${date}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const canvasSize = 2000;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    if (imageSrc) {
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
            gradient.addColorStop(0, "rgba(255, 80, 80, 0.5)");
            gradient.addColorStop(1, "rgba(200, 0, 0, 0.5)");
            break;
          case "AL2":
            gradient.addColorStop(0, "rgba(255, 165, 120, 0.5)");
            gradient.addColorStop(1, "rgba(204, 126, 31, 0.5)");
            break;
          case "AL3":
            gradient.addColorStop(0, "rgba(0, 0, 255, 0.5)");
            gradient.addColorStop(1, "rgba(0, 60, 200, 0.5)");
            break;
          case "USB":
  // make image black & white first
  ctx.filter = "grayscale(100%) contrast(110%) brightness(90%)";
  ctx.drawImage(img, sourceX, sourceY, size, size, 0, 0, canvasSize, canvasSize);

  // add subtle dark tint (like USB album)
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.filter = "none"
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  break;

          default:
            gradient.addColorStop(0, "rgba(0,0,0,0.25)");
            gradient.addColorStop(1, "rgba(0,0,0,0.2)");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        if (waterMarkRef.current) {
          const logoSize = canvasSize * 0.4;
          ctx.globalAlpha = 0.2;
          ctx.drawImage(
            waterMarkRef.current,
            canvasSize - logoSize - -150,
            canvasSize - logoSize - -270,
            logoSize,
            logoSize
          );
          ctx.globalAlpha = 1;
        }
      };
    } else {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
  }, [imageSrc, gradientOption]);

  return (
    <div className="flex flex-col items-center text-white p-10 pt-5">
      <main className="flex flex-col md:flex-row w-full max-w-5xl justify-between gap-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 items-center mt-2 md:mt-42 pb-8">
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <div className="flex-1 flex flex-col items-center">
              <button
                onClick={handleUploadClick}
                className="w-full md:w-auto px-12 py-4 rounded-full bg-white text-black border-4 border-neutral-800 text-lg font-black tracking-tighter transition hover:bg-neutral-800 hover:text-white"
              >
                upload.
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 flex justify-center">
              <select
                value={gradientOption || ""}
                onChange={(e) => setGradientOption(e.target.value)}
                className="w-full md:w-auto px-12 text-center py-4 rounded-full bg-transparent border-4 appearance-none border-neutral-800 text-lg font-black tracking-tighter text-white transition hover:bg-neutral-800"
              >
                <option value="" disabled>
                  choose filter. ⬇️
                </option>
                {gradientOptions.map((opt) => (
                  <option key={opt.key} value={opt.key} className="text-black">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className={`w-full p-3 mt-4 text-xl rounded-lg font-black tracking-tighter transition ${
              imageSrc && gradientOption ? "bg-white text-black hover:bg-neutral-800 hover:text-white" : "bg-neutral-800 text-neutral-500 cursor-not-allowed hidden"
            }`}
          >
            Download Cover
          </button>
        </div>

        {/* Canvas + Sayings + Fred */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:ml-32 relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="w-80 h-80 md:w-96 md:h-96 border-neutral-900 bg-neutral-900 rounded-xl shadow-lg"
          />

          {/* Fred example image */}
          {!imageSrc && (
            <img
              src="/fred.png"
              alt="FredFrame Example"
              className={`absolute w-full left-[-50px] bottom-[-81px] md:w-96 opacity-80 pointer-events-none select-none${loading ? " hidden" : ""}`}
            />
          )}

          {/* Fake processing overlay */}
          {loading && (
            <div className="absolute w-80 h-80 md:w-96 md:h-96 flex items-center justify-center bg-neutral-900 text-2xl font-black rounded-xl tracking-tighter animate-pulse">
              Processing your image...
            </div>
          )}

          {/* Confetti */}
          {imageSrc && gradientOption && (() => {
            confetti({ particleCount: 1000, spread: 1000, origin: { y: 0 } });
          })()}

          {/* Sayings */}
          {!loading && imageSrc && gradientOption && (
            <p className="mt-4 text-4xl border-4 border-dashed text-center font-black bg-neutral-800/20 p-8 tracking-tighter rounded-lg">
              {currentSaying}
            </p>
          )}
        </div>
      </main>

      <footer className="mt-72 text-center text-sm text-neutral-700 mt-10">
        <p className="text-gray-600 font-semibold text-lg">
          made by <a href="https://coleridge.dev" className="font-black text-xl tracking-tighter">kai</a>
        </p>
        <p className="mt-4 tracking-tighter text-[17px]">
          This app has <span className="font-bold">no affiliation</span> with <a className="font-bold" href="https://open.spotify.com/artist/4oLeXFyACqeem2VImYeBFe">Fred again..</a>
        </p>

        <p className="text-sm font-mono bg-neutral-800/20 mt-4 px-2 py-1 inline-block rounded">
    Version: {buildVersion}
  </p>
      </footer>
    </div>
  );
}
