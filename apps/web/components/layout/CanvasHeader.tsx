"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { iSliceState } from "@/types";
import { ZapCreateSchema } from "@/lib/schema/schema";
import { useCreateZapMutation } from "@/store/api/zaps";

const CanvasHeader = () => {
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const { trigger, actions } = useSelector(
    (state: iSliceState) => state.ancillarySlice,
  );

  const [createZapMutation] = useCreateZapMutation();
  const publishZap = async () => {
    if (!trigger || !actions)
      return console.log("Please add actions and trigger to zap");

    // Forming zap object to be sent to the server
    const zap = {
      title: trigger.title,
      availableTriggerId: trigger.availableTriggerId,
      triggerMetadata: trigger.triggerMetadata,
      actions: actions.map((action) => ({
        title: action.title,
        actionMetadata: action.actionMetadata,
        availableActionId: action.availableActionId,
      })),
    };

    // Validate zap
    const validation = ZapCreateSchema.safeParse(zap);
    if (!validation.success) {
      return console.error("Invalid zap", validation.error.format());
    }

    // Create zaps
    try {
      await createZapMutation(validation.data);
      router.push("/zaps/manage");
    } catch (error) {
      console.error("Error creating zap", error);
    }
  };

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
