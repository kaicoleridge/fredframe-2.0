"use client";

import FredCoverCanvas from "./components/FredCoverCanvas";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div className="flex flex-col mt-4 items-center justify-center">
      <Banner />
      <FredCoverCanvas />
    </div>
  );
}
