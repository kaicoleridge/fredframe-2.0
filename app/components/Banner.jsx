import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <header className="w-full mb-10 rounded-b-xl">
      <div className="max-w-5xl mx-auto text-center mt-6">
        <Image
          src="/fred_logo.png"
          alt="FredFrame Logo"
          width={360}
          height={360}
          className="mx-auto mb-4"
        />
      </div>
    </header>
  );
}
