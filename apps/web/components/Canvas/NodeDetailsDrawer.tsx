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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/Input";
import { WEBHOOK_BE_URL } from "@/lib/constants";

const DetailsCard = ({ node }: { node: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.label}</CardTitle>
        <CardDescription>{node.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold">Metadata</h1>
        <p className="text-muted-foreground">{node.metadata}</p>
        <Label htmlFor="url"></Label>
        <Input
          name="url"
          value={`${WEBHOOK_BE_URL}/hooks/catch/${node?.userId}/${node?.zapId}`}
        />
      </CardContent>
    </Card>
  );
};

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
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{node?.type} Details</DrawerTitle>
            <DrawerDescription>
              See details about your {node?.type}
            </DrawerDescription>
          </DrawerHeader>
          <DetailsCard node={node} />
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
