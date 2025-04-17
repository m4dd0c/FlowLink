"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { iAncillarySliceState } from "@/types";
import { FiEdit2 } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import {
  useGetAvailableActionsQuery,
  useGetAvailableTriggersQuery,
} from "@/store/api/ancillary";

const Node = ({
  action,
  trigger,
  onEdit,
  handleAddActionNode,
  handleDeleteActionNode,
}: {
  action?: iAncillarySliceState["actions"][number];
  trigger?: iAncillarySliceState["trigger"];
  onEdit: (nodeId: number) => void;
  handleAddActionNode: (nodeId: number) => void;
  handleDeleteActionNode?: (nodeId: number) => void;
}) => {
  const title = action ? action?.title : trigger?.title;
  const [label, setLabel] = useState<string | undefined>();

  const { isFetching: isActionsFetching, data: availableActions } =
    useGetAvailableActionsQuery(null);
  const { isFetching: isTriggerFetching, data: availableTrigger } =
    useGetAvailableTriggersQuery(null);

  useEffect(() => {
    if (action) {
      const name = availableActions?.data?.find(
        (act) => act.id === action?.availableActionId,
      )?.name;
      setLabel(name ?? "Action");
    }
    if (trigger) {
      const name = availableTrigger?.data?.find(
        (trigg) => trigg.id === trigger?.availableTriggerId,
      )?.name;
      setLabel(name ?? "Trigger");
    }
  }, [action, trigger, availableActions, availableTrigger]);

  const icon = action ? action?.icon : trigger?.icon;
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
            <Button variant="ghost" size="icon" onClick={() => onEdit(id!)}>
              <FiEdit2 className="cursor-pointer size-4" />
            </Button>
            {action && (
              <Button
                onClick={() => handleDeleteActionNode?.(id!)}
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
            <strong>{id! + 1}.&nbsp;&nbsp;</strong>
            <span>{title}</span>
          </p>
        </div>
      </div>
      {/* Node tail */}
      <div>
        <span className="block mx-auto h-8 w-1 rounded-full bg-foreground" />
        <div className="mx-auto w-fit">
          <Button
            size="icon"
            onClick={() => handleAddActionNode(id!)}
            className="my-1 rounded-full"
          >
            <FaPlus />
          </Button>
        </div>
        <span className="block mx-auto h-8 w-1 rounded-full bg-foreground" />
      </div>
    </>
  );
};
export default Node;
