"use client";

import FredCoverCanvas from "./components/FredCoverCanvas";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Banner/>
      <FredCoverCanvas />
    </div>
  );
}
