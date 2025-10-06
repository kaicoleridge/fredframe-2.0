import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <header className="w-full bg-neutral-900/20  shadow-lg mb-12 rounded-xl">
      <div className="max-w-5xl mx-auto text-center px-6 mt-6">
        <Image
            src="/fred_logo.png"
            alt="FredFrame Logo"    
            width={350}
            height={350}
            className="mx-auto mb-4"
        />
      </div>
    </header>
  );
}
