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
  node,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  node: any;
}) {
  const isTrigger = node?.trigger && node?.id === 0;
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{isTrigger ? "Trigger" : "Action"}</DrawerTitle>
            <DrawerDescription>
              {isTrigger ? "Configure your Trigger" : "Configure your Action"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {isTrigger ? (
              <TriggerForm node={node} setIsDrawerOpen={setIsDrawerOpen} />
            ) : (
              <ActionForm node={node} setIsDrawerOpen={setIsDrawerOpen} />
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
