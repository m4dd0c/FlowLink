"use client";

import React, { useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Node from "./Node";
import { DrawerComp } from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { iSliceState } from "@/types";
import { setActions } from "@/store/slices/ancillary";

//   title: z.string()
//   availableTriggerId: z.string(),
//   triggerMetadata: z.any().optional(),
//   actions: [
//   {
//       availableActionId: z.string(),
//       actionMetadata: z.any().optional(),
//   }
//   ]
// https://localhost:4001/hooks/catch/:uId/:zapId/

const PublishZap = () => {
  const { trigger, actions } = useSelector(
    (state: iSliceState) => state.ancillarySlice,
  );

  const dispatch = useDispatch();

  const handleAddActionNode = (id: number) => {
    const newNodeIndex = id + 1;

    // Creating new action node
    const newNode = {
      id: newNodeIndex,
      icon: BsFillLightningChargeFill,
      title: "New node Action" + newNodeIndex,
      availableActionId: "",
      actionMetadata: "",
    };

    // Updating indeces of exisiting nodes
    const updatedIndexNodes = actions.map((node) => {
      // Updating id of nodes after newNodeIndex
      if (newNodeIndex <= node?.id) {
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
    updatedIndexNodes.splice(newNodeIndex - 1, 0, newNode);
    // Updating Actions[]
    dispatch(setActions(updatedIndexNodes));
  };

  const handleDeleteActionNode = (id: number) => {
    // Handle delete action
    const confirmation = window.confirm(
      "Are you sure you want to delete this action?",
    );
    if (!confirmation) return;
    // Removing the Node
    const acts = actions.filter((action) => action?.id !== id);
    // Updating indeces of exisiting nodes
    const nodes = acts.map((node) => {
      if (node?.id > id) {
        return {
          ...node,
          id: node?.id - 1,
        };
      } else {
        return node;
      }
    });
    // Updating Actions[]
    dispatch(setActions(nodes));
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  const onEdit = (nodeId: number) => {
    if (nodeId === null || nodeId === undefined) {
      alert("Please select a node to edit, ERR: unknown nodeId");
    } else {
      setIsDrawerOpen(!isDrawerOpen);
      setSelectedNodeId(nodeId);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold my-4">Publish Zap</h1>
      <div className="mx-auto w-1/3 max-lg:w-1/2 max-md:w-5/6">
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
          actions?.map((action, idx) => {
            return (
              <div key={idx}>
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
        nodeId={selectedNodeId}
      />
    </div>
  );
};

export default PublishZap;
