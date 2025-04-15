"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ActionForm from "@/components/forms/Action";
import TriggerForm from "@/components/forms/Trigger";

export function DrawerComp({
  isDrawerOpen,
  setIsDrawerOpen,
  nodeId,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  nodeId: number;
}) {
  const isTrigger = nodeId === 0;
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{isTrigger ? "Trigger" : "Action"}</DrawerTitle>
            <DrawerDescription>
              Configure your {isTrigger ? "Trigger" : "Action"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {isTrigger ? (
              <TriggerForm setIsDrawerOpen={setIsDrawerOpen} />
            ) : (
              <ActionForm actionId={nodeId} setIsDrawerOpen={setIsDrawerOpen} />
            )}
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
}
