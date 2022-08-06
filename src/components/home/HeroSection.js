import React from "react";
import HeroImg from "../../assets/hero-img.jpg";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="hero flex flex-col md:flex-row md:items-end bg-[#EDECE1] p-10">
      <div className="h-auto w-full md:order-2">
        <Image
          src={HeroImg}
          alt="hero"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="z-10 p-4">
        <h1 className="text-xl font-semibold">
          YEEZY BOOST 350 V2 ONYX AND BONE
        </h1>
        <Link href="/products">
          <button className="btn-black-outlined mt-4">FIND OUT MORE</button>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
