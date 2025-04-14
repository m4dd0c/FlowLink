"use client";
import { Button } from "@/components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { HiTrash } from "react-icons/hi2";

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
        <div className="flex place-items-center gap-2 text-xs">
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
export default Node;
