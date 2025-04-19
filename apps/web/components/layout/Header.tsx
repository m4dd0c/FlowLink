"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { ToggleThemeMode } from "../ui/ToggleThemeMode";
import { useMeQuery } from "@/store/api/user";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isLoading, data } = useMeQuery(null);
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();
  const isZapsCanvasRoute = pathname.startsWith("/zaps/");

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex transition-all duration-300 fixed top-0 inset-x-0 z-50 justify-between items-center py-1 px-4 ${scroll && "bg-background/80 backdrop-blur-md"} ${isZapsCanvasRoute && "hidden"}`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={logo}
            alt="logo"
            className="h-14 w-14 invert-100"
            height={1080}
            width={1080}
          />
          <h1 className="text-3xl font-bold">FlowLink</h1>
        </div>
      </Link>
      <div className="flex gap-4 px-8 max-md:px-4">
        {!isLoading && data?.data ? (
          <ul className="flex items-center gap-4 font-semibold">
            <li className="hover:bg-foreground/10 px-3 py-1 rounded-sm">
              <Link href="/zaps/publish">Publish New Zap</Link>
            </li>
            <li className="hover:bg-foreground/10 text-orange-500 px-3 py-1 rounded-sm">
              <Link href="/zaps/manage">Manage Zaps</Link>
            </li>
            <li className="bg-foreground/10 hover:bg-foreground/20 p-2 rounded-full">
              <Link href="/me">
                <IoPersonOutline />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-4 font-semibold">
            <li className="hover:bg-foreground/10 px-2 py-1 rounded-sm">
              <Link href="/log-in">Log in</Link>
            </li>
            <li className="bg-orange-500 rounded-full px-3 py-1 text-white">
              <Link href="/sign-up">Sign up</Link>
            </li>
          </ul>
        )}

        <ToggleThemeMode />
      </div>
    </div>
  );
};

export default Header;
