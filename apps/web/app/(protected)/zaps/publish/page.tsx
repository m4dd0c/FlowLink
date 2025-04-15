"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { RiWebhookLine } from "react-icons/ri";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { SiSolana } from "react-icons/si";
import { LuPlugZap } from "react-icons/lu";
import Node from "./Node";
import { DrawerComp } from "./Drawer";
import { useSelector } from "react-redux";
import { iAncillarySliceState, iSliceState } from "@/types";

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

//   title: z.string()
//   availableTriggerId: z.string(),
//   triggerMetadata: z.any().optional(),
//   actions: [
//       availableActionId: z.string(),
//       actionMetadata: z.any().optional(),
//   ]
// https://localhost:4001/hooks/catch/:uId/:zapId/

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

    // opening drawer once the node is created
    onEdit(newNodeIndex);
  };
  const handleDeleteActionNode = (id: number) => {
    // Handle delete action
    const confirmation = window.confirm(
      "Are you sure you want to delete this action?",
    );
    if (!confirmation) return;
    console.log("Delete action", id);
  };

  const { trigger, actions } = useSelector(
    (state: iSliceState) => state.ancillarySlice,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onEdit = (nodeId: number) => {
    setIsDrawerOpen(!isDrawerOpen);
    const nodes = [trigger, ...actions];
    setSelectedNode(nodes.find((node) => node.id === nodeId));
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold my-4">Publish Zap</h1>
      <div className="mx-auto w-1/4">
        {/* Trigger Node */}
        {trigger && (
          <Node
            onEdit={onEdit}
            trigger={trigger}
            handleAddActionNode={handleAddActionNode}
          />
        )}
        {/* Action Nodes */}
        {actions &&
          actions?.map((action) => {
            return (
              <div key={action.id}>
                <Node
                  action={action}
                  onEdit={onEdit}
                  handleAddActionNode={handleAddActionNode}
                  handleDeleteActionNode={handleDeleteActionNode}
                />
              </div>
            );
          })}
      </div>
      <DrawerComp
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        node={selectedNode}
      />
    </div>
  );
};

export default PublishZap;
