"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { RiWebhookLine } from "react-icons/ri";
import { SiSolana } from "react-icons/si";

const Node = ({
  id,
  icon,
  action,
  trigger,
}: {
  id: number;
  icon: React.ReactNode;
  action?: Record<string, string>;
  trigger?: Record<string, string>;
}) => {
  if ((!action && !trigger) || (action && trigger)) return null;

  const title = action ? action.title : trigger?.title;
  const label = action ? action.label : trigger?.label;

  const handleDeleteAction = () => {
    // Handle delete action
    if (!action) return;
    const confirmation = window.confirm(
      "Are you sure you want to delete this action?",
    );
    if (!confirmation) return;
    console.log("Delete action");
  };

  return (
    <div className="ring-2 rounded-lg px-4 py-2">
      <div className="flex justify-between">
        <div className="flex place-items-center gap-2">
          {icon}
          <p>{title}</p>
        </div>
        <div className="flex place-items-center gap-1">
          <Button variant="ghost" size="icon">
            <FiEdit2 className="cursor-pointer size-4" />
          </Button>
          {action && (
            <Button
              onClick={() => handleDeleteAction()}
              variant={"ghost"}
              size="icon"
            >
              <HiTrash className="cursor-pointer text-red-500 size-4" />
            </Button>
          )}
        </div>
      </div>
      <div>
        <p>
          <strong>{id}.&nbsp;&nbsp;</strong>
          <span>{label}</span>
        </p>
      </div>
    </div>
  );
};

const initialNodes = [
  {
    id: 1,
    icon: <RiWebhookLine />,
    trigger: {
      title: "Webhook",
      label: "New Comment on Github",
    },
  },
  {
    id: 2,
    icon: <BiLogoGmail />,
    action: {
      title: "Gmail",
      label: "Send Email",
    },
  },
  {
    id: 3,
    icon: <SiSolana />,
    action: {
      title: "Solana",
      label: "Send Solana",
    },
  },
];
const PublishZap = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold my-4">Publish Zap</h1>
      <div className="space-y-14 mx-auto w-1/4">
        {initialNodes.map(({ id, icon, trigger, action }) => {
          return (
            <Node
              key={id}
              icon={icon}
              id={id}
              trigger={trigger ? trigger : undefined}
              action={action ? action : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PublishZap;
