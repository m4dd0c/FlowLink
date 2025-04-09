import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="container mx-auto h-screen overflow-hidden">
      <div className="flex justify-between items-center pt-20 max-md:flex-col mt-16">
        <div className="flex-1">
          <h1 className="text-6xl max-md:text-4xl font-bold">
            Workflow automation software for everyone.
          </h1>
          <p className="text-xl mt-2">
            Turn chaos into smooth operations by automating workflows
            yourself—no developers, no IT tickets, no delays. The only limit is
            your imagination.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 bg-foreground/10 rounded-full px-5 py-1 text-white"
            >
              <p>✨ Get Started</p>
              <FaArrowRightLong className="animate-bounce-x" />
            </Link>
            <button className="border-foreground/20 border-1 rounded-full px-5 py-1">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
            alt="homepage-hero"
            height={500}
            width={500}
            className="h-auto w-5/6 object-contain invert-100 float-right"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
