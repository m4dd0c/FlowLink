"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";

const NodeDetailsDrawer = ({
  open,
  onOpenChange,
  node,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: any;
}) => {
  const nodeType = node.availableTriggerId ? "Trigger" : "Action";
  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{nodeType} Details</DrawerTitle>
            <DrawerDescription>
              See details about your {nodeType}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {nodeType === "Trigger" ? <div></div> : <div></div>}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NodeDetailsDrawer;
