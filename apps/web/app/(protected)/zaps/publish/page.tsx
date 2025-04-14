"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { RiWebhookLine } from "react-icons/ri";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { SiSolana } from "react-icons/si";
import Node from "./Node";
import { DrawerComp } from "./Drawer";

const initialNodes = [
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

    // Creating new action node
    const newNode = {
      id: newNodeIndex,
      icon: <BsFillLightningChargeFill />,
      action: {
        title: "Action",
        label: "Add New Action",
      },
    };

    // Updating indeces of exisiting nodes
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
        // Node stays unchanged, If it is before newNodeIndex
      } else {
        return node;
      }
    });

    // Appending new node
    updatedIndexNodes.splice(newNodeIndex, 0, newNode);
    setNodes(updatedIndexNodes);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const onEdit = (nodeId: number) => {
    setIsDrawerOpen(!isDrawerOpen);
    setSelectedNode(nodes.find((node) => node.id === nodeId));
  };
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
                onEdit={onEdit}
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
