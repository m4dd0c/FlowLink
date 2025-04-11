import SignupForm from "@/components/forms/Signup";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const Signup = () => {
  return (
    <div className="grid grid-cols-2 place-items-center max-md:grid-cols-1 mt-24 container mx-auto space-y-8">
      <div className="space-y-4">
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
      <div className="w-5/6">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
