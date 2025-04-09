import SignupForm from "@/components/forms/Login";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const Login = () => {
  return (
    <div className="h-screen container mx-auto border">
      <div className="flex-1">
        <h1 className="text-4xl font-bold">
          Join millions worldwide who automate their work using Zapier.
        </h1>
        <ul>
          <li>
            <IoCheckmarkCircle />
            <p>Easy setup, no coding required</p>
          </li>
          <li>
            <IoCheckmarkCircle />
            <p>Free forever for core features</p>
          </li>
          <li>
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

export default Login;
