"use client";

import FredCoverCanvas from "./components/FredCoverCanvas";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
<p className="w-full text-center font-black bg-gradient-to-r from-neutral-800 to-black py-3 text-md text-neutral-300 tracking-tighter shadow-md rounded-b-xl">
  🚀 V2.0 — better, faster, built from the ground up.
</p>


      <Banner/>
      <FredCoverCanvas />
    </div>
  );
}
