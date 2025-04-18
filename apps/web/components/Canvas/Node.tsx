"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { iAncillarySliceState } from "@/types";
import { FiEdit2 } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import {
  useGetAvailableActionsQuery,
  useGetAvailableTriggersQuery,
} from "@/store/api/ancillary";
import { LuPlugZap } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Node = ({
  action,
  trigger,
  onEdit,
  onViewDetails,
  handleAddActionNode,
  handleDeleteActionNode,
}: {
  action?: iAncillarySliceState["actions"][number];
  trigger?: iAncillarySliceState["trigger"];
  onEdit?: (nodeId: number) => void;
  onViewDetails?: (node: any) => void;
  handleAddActionNode?: (nodeId: number) => void;
  handleDeleteActionNode?: (nodeId: number) => void;
}) => {
  const pathname = usePathname();
  const isPublishCanvasPath = pathname.startsWith("/zaps/publish");

  const title = action ? action?.title : trigger?.title;

  // Importing available actions and triggers for Label configuration e.g., "Webhook", "Gmail", etc.
  const { isFetching: isActionsFetching, data: availableActions } =
    useGetAvailableActionsQuery(null);
  const { isFetching: isTriggerFetching, data: availableTrigger } =
    useGetAvailableTriggersQuery(null);

  // Configure the label for the node e.g., "Webhook", "Gmail", etc.
  const [label, setLabel] = useState<string | undefined>();
  useEffect(() => {
    // If the Node is Action Node.
    // Then get the name from availableActions with corresponding id
    // Default to "Action" if not found
    if (action) {
      const name = availableActions?.data?.find(
        (act) => act.id === action?.availableActionId,
      )?.name;
      setLabel(name ?? "Action");
    }
    // If the Node is Trigger Node.
    // Then get the name from availableActions with corresponding id
    // Default to "Trigger" if not found
    if (trigger) {
      const name = availableTrigger?.data?.find(
        (trigg) => trigg.id === trigger?.availableTriggerId,
      )?.name;
      setLabel(name ?? "Trigger");
    }
  }, [action, trigger, availableActions, availableTrigger]);

  // TODO:Icon util function
  // Icon configuration for the node
  const icon = (action ? action?.icon : trigger?.icon) ?? LuPlugZap;

  // Getting Id for the node for Delete and Edit operations
  // Only useful, If the path is "/zaps/publish"
  // If the path is "/zaps/publish" then it will be `number` else it will be `cuid`
  const id = action ? action?.id : trigger?.id;

  if ((!action && !trigger) || (action && trigger)) return null;

  if (isActionsFetching || isTriggerFetching) return <h1>Loading...</h1>;

  return (
    <>
      <div className="ring-2 rounded-lg px-4 py-2">
        <div className="flex justify-between">
          <div className="flex place-items-center gap-2 text-xs">
            {icon && React.createElement(icon, { className: "size-4" })}
            <p className="uppercase">{label}</p>
          </div>
          <div className="flex place-items-center gap-1">
            {isPublishCanvasPath && onEdit ? (
              <Button
                title="Edit Node"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(id!)}
              >
                <FiEdit2 className="cursor-pointer size-4" />
              </Button>
            ) : (
              onViewDetails && (
                <Button
                  variant="ghost"
                  title="View Details"
                  size="icon"
                  onClick={() => onViewDetails(trigger ?? action)}
                >
                  <FaRegEye className="cursor-pointer size-4" />
                </Button>
              )
            )}
            {isPublishCanvasPath && handleDeleteActionNode && action && (
              <Button
                onClick={() => handleDeleteActionNode(id!)}
                variant={"ghost"}
                title="Delete Node"
                size="icon"
              >
                <HiTrash className="cursor-pointer text-red-500 size-4" />
              </Button>
            )}
          </div>
        </div>
        <div>
          <p>
            <span>{title}</span>
          </p>
        </div>
      </div>
      {/* Node tail */}
      <div>
        <span className="block mx-auto h-8 w-1 bg-foreground" />
        {isPublishCanvasPath && handleAddActionNode && (
          <div className="mx-auto w-fit">
            <Button
              size="icon"
              onClick={() => handleAddActionNode(id!)}
              className="my-1 rounded-full"
            >
              <FaPlus />
            </Button>
          </div>
        )}
        <span className="block mx-auto h-8 w-1 bg-foreground/50" />
      </div>
    </>
  );
};
export default Node;
