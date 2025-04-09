import LoginForm from "@/components/forms/Login";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen container mx-auto border">
      <div className="flex-1">
        <h1 className="text-4xl font-bold">Automate across your teams</h1>
        <p>
          Zapier Enterprise empowers everyone in your business to securely
          automate their work in minutes, not months—no coding required.
        </p>
        <button className="border rounded-full px-4 py-1">
          Explore Zapier Enterprise
        </button>
      </div>
      <div className="flex-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
