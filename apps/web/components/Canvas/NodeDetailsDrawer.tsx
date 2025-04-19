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
import NodeDetailsCard from "./NodeDetailsCard";

const NodeDetailsDrawer = ({
  open,
  onOpenChange,
  node,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  node: any;
}) => {
  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent>
        <div className="mx-auto w-1/2">
          <DrawerHeader>
            <DrawerTitle>{node?.type} Details</DrawerTitle>
            <DrawerDescription>
              See details about your {node?.type}
            </DrawerDescription>
          </DrawerHeader>
          <NodeDetailsCard node={node} />
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
