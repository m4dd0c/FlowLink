"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { iSliceState } from "@/types";
import { ZapCreateSchema } from "@/lib/schema/schema";
import { useCreateZapMutation } from "@/store/api/zaps";
import { IoPersonOutline } from "react-icons/io5";
import { ToggleThemeMode } from "../ui/ToggleThemeMode";

const CanvasHeader = () => {
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

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
      const { data: zapId } = await createZapMutation(validation.data).unwrap();
      // TODO: show popup success
      router.push(`/zaps/${zapId}`);
    } catch (error) {
      console.error("Error creating zap", error);
    }
  };

  return (
    <div
      className={`flex transition-all duration-300 fixed top-0 inset-x-0 z-50 justify-between items-center py-3 px-4 ${scroll && "bg-background/80 backdrop-blur-md"}`}
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
            className="bg-orange-500 rounded-full px-3 py-1 text-white"
          >
            Publish
          </button>
        ) : (
          <div className="flex place-items-center gap-3">
            <button className="hover:bg-foreground/10 text-orange-500 px-3 py-1 rounded-sm">
              <Link href="/zaps/manage">Manage Zaps</Link>
            </button>
            <button className="bg-orange-500 rounded-full px-3 py-1">
              <Link href="/zaps/publish">New Zap </Link>
            </button>
          </div>
        )}
        <button className="bg-foreground/10 hover:bg-foreground/20 p-2 rounded-full">
          <Link href="/me">
            <IoPersonOutline />
          </Link>
        </button>

        <ToggleThemeMode />
      </div>
    </div>
  );
};

export default CanvasHeader;
