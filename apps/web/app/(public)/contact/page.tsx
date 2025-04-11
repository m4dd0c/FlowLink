import ContactForm from "@/components/forms/Contact";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="grid grid-cols-2 place-items-center max-md:grid-cols-1 mt-24 container mx-auto space-y-8">
      <div className="space-y-4">
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
      <div className="">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
