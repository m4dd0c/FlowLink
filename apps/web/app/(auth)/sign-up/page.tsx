import SignupForm from "@/components/forms/Signup";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const Signup = () => {
  return (
    <div className="flex mt-24 max-md:flex-col h-screen container mx-auto space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">
          Join millions worldwide who automate their work using FlowLink.
        </h1>
        <ul className="space-y-2">
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>Easy setup, no coding required</p>
          </li>
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>Free forever for core features</p>
          </li>
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>14-day trial of premium features & apps</p>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
