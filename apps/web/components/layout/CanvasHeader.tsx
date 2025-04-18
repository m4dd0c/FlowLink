"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { iSliceState } from "@/types";

const CanvasHeader = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const publishZap = () => {};

  // const dispatch = useDispatch();
  const { trigger, actions } = useSelector(
    (state: iSliceState) => state.ancillarySlice,
  );
  useEffect(() => {
    if (trigger && actions) console.log(trigger, actions);
  }, [trigger, actions]);
  return (
    <div
      className={`flex transition-all duration-300 fixed top-0 py-2 inset-x-0 z-50 justify-between items-center py-1 px-4 ${scroll && "bg-background/80 backdrop-blur-md"}`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <h1>
            <span className="text-3xl font-bold">FlowLink</span>
            <small className="text-xs">&nbsp;Canvas</small>
          </h1>
        </div>
      </Link>
      <div className="flex gap-4 px-8 max-md:px-4">
        {pathname.startsWith("/zaps/publish") ? (
          <button
            onClick={publishZap}
            className="bg-orange-500 rounded-full px-3 py-1"
          >
            Publish
          </button>
        ) : (
          <button className="bg-orange-500 rounded-full px-3 py-1">
            <Link href="/zaps/publish">New Zap </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default CanvasHeader;
