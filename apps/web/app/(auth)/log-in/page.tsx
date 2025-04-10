import LoginForm from "@/components/forms/Login";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaRegCompass } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="flex mt-24 max-md:flex-col h-screen container mx-auto space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">Automate across your teams</h1>
        <p className="text-xl">
          FlowLink empowers everyone in your business to securely automate their
          work in minutes, not months—no coding required.
        </p>
        <Button>
          <Link href="/" className="flex place-items-center gap-1">
            <FaRegCompass />
            <p>Explore FlowLink</p>
          </Link>
        </Button>
      </div>
      <div className="flex-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
