import ContactForm from "@/components/forms/Contact";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="flex mt-24 max-md:flex-col h-screen container mx-auto space-y-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">Get in Touch with Us</h1>
        <ul className="space-y-2">
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>24/7 Customer Support</p>
          </li>
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>Reach us via email or phone</p>
          </li>
          <li className="flex gap-1 items-center">
            <IoCheckmarkCircle />
            <p>Dedicated support for premium users</p>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
