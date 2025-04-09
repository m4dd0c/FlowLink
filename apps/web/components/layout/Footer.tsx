import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="px-8 max-md:px-4 py-4">
      <div>
        <h1 className="text-9xl font-extrabold text-foreground/10 text-center select-none my-24 transition-colors duration-[5000ms] hover:text-foreground/90">
          FlowLink
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center justify-center />">
          <p className="px-1">Follow us</p>
          <Link href="https://facebook.com/m4dd0c">
            <FaFacebook size={20} />
          </Link>
          <Link href="https://linkendin.com/in/m4dd0c">
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://x.com/m4dd0c">
            <FaX size={20} />
          </Link>
          <Link href="https://youtube.com/m4dd0c">
            <FaYoutube size={20} />
          </Link>
          <Link href="https://github.com/m4dd0c">
            <FaGithub size={20} />
          </Link>
          <Link href="https://instagram.com/m4dd0c_">
            <FaInstagram size={20} />
          </Link>
        </div>
        <ul className="flex gap-2">
          <li className="cursor-pointer hover:underline">Pricing</li>
          <li className="cursor-pointer hover:underline">Help</li>
          <li className="cursor-pointer hover:underline">Developer</li>
          <li className="cursor-pointer hover:underline">Platform</li>
          <li className="cursor-pointer hover:underline">Press</li>
          <li className="cursor-pointer hover:underline">Jobs</li>
          <li className="cursor-pointer hover:underline">Enterprise</li>
          <li className="cursor-pointer hover:underline">Templates</li>{" "}
          <li className="cursor-pointer hover:underline">App Integrations</li>
        </ul>
      </div>
      <div className="flex items-center gap-2 justify-between  py-5">
        <h1 className="text-2xl font-bold text-orange-500">
          <Link href="/">FlowLink</Link>
        </h1>
        <div className="flex gap-4">
          <p>© 2025 Flowlink Inc.</p>
          <Link href="/legal">Legal</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
