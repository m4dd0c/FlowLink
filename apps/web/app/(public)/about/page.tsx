import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="grid pt-24 container mx-auto grid-cols-2 space-y-8 md:space-y-24 gap-8 place-items-center">
      <div>
        <h1 className="font-bold text-6xl">
          We&apos;re humans who think computers should do more work
        </h1>
      </div>
      <div>
        <video
          autoPlay
          controls={false}
          loop
          src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/v1678395005/About/about-allcompanyretreats_q2nbsq.mp4"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1673392510/About/All_Company_1_1_asxamc.png"
          alt="image0some"
          height="500"
          width="500"
          className=""
        />
      </div>
      <div>
        <h1 className="font-bold text-2xl">FlowLink at a glance</h1>
        <p>
          We&apos;re on a mission to make automation work for everyone.
          <br />
          As the leader in easy automation, FlowLink empowers businesses to
          automate workflows and move data across 7,000+ apps. We work with what
          you work with, across your apps and tech stack, so you can make magic
          happen.
        </p>
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          We’ve been working remotely since day one
        </h1>
        <p>
          We&apos;re 800+ people across 38 countries, committed to helping you
          streamline your most important work. Come join us.
        </p>
        <Button>Browse more</Button>
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1677628764/About/about_us_hero_bfy4pq.png"
          alt="image0some0"
          height="500"
          width="500"
          className=""
        />
      </div>
    </div>
  );
};

export default Page;
