"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
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
    console.log("Delete action", id);
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
          <strong>{id + 1}.&nbsp;&nbsp;</strong>
          <span>{label}</span>
        </p>
      </div>
    </div>
  );
};

let initialNodes = [
  {
    id: 0,
    icon: <RiWebhookLine />,
    trigger: {
      title: "Webhook",
      label: "New Comment on Github",
    },
  },
  {
    id: 1,
    icon: <BiLogoGmail />,
    action: {
      title: "Gmail",
      label: "Send Email",
    },
  },
  {
    id: 2,
    icon: <SiSolana />,
    action: {
      title: "Solana",
      label: "Send Solana",
    },
  },
];

const PublishZap = () => {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    setNodes(initialNodes);
  }, []);

  const handleAddActionNode = (id: number) => {
    const newNodeIndex = id + 1;
    // Handle add action node
    const newNode = {
      id: newNodeIndex,
      icon: <BiLogoGmail />,
      action: {
        title: "Solanasdfasdfasdfadfa",
        label: "Send Solanasdfasdfasdfadfsa",
      },
    };
    const updatedIndexNodes = nodes.map((node) => {
      // trigger node idx, should not be changed
      if (node.id === 0) {
        return node;
      }
      // Updating id of nodes after newNodeIndex
      if (newNodeIndex <= node.id) {
        return {
          ...node,
          id: node.id + 1,
        };
      } else {
        return node;
      }
    });
    updatedIndexNodes.splice(newNodeIndex, 0, newNode);

    // const newNodesArray = updatedIndexNodes.splice(id, 0, newNode);
    setNodes(updatedIndexNodes);
  };

  console.log(nodes);
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold my-4">Publish Zap</h1>
      <div className="mx-auto w-1/4">
        {nodes.map(({ id, icon, trigger, action }) => {
          return (
            <div key={id}>
              <Node
                icon={icon}
                id={id}
                trigger={trigger ? trigger : undefined}
                action={action ? action : undefined}
              />
              <div>
                <span className="block mx-auto h-8 w-1 rounded-full bg-foreground" />
                <div className="mx-auto w-fit">
                  <Button
                    size="icon"
                    onClick={() => handleAddActionNode(id)}
                    className="my-1 rounded-full"
                  >
                    <FaPlus />
                  </Button>
                </div>
                <span className="block mx-auto h-8 w-1 rounded-full bg-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublishZap;
