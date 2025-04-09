import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="container mx-auto h-screen overflow-hidden">
      <div className="flex justify-between items-center max-md:flex-col mt-16">
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
            <Button variant="outline" className="rounded-full">
              Learn More
            </Button>
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 bg-accent rounded-full px-5 py-1"
            >
              <p>✨ Get Started</p>
              <FaArrowRightLong className="animate-bounce-x" />
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
            alt="homepage-hero"
            height={500}
            width={500}
            className="h-auto w-5/6 object-contain float-right rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
