"use client";
import { WEBHOOK_BE_URL } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { BsCopy } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const NodeDetailsCard = ({ node }: { node: Record<string, string> }) => {
  const url = `${WEBHOOK_BE_URL}/hooks/catch/${node?.userId}/${node?.zapId}`;

  const [icon, setIcon] = useState(<BsCopy />);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied((prev) => !prev), 1000);
  };

  useEffect(() => {
    if (copied) setIcon(<IoCheckmarkCircle className="text-green-500" />);
    else setIcon(<BsCopy />);
  }, [copied]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.label}</CardTitle>
        <CardDescription>{node.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label htmlFor="url">Catch Hook URL</Label>
        <div className="flex place-items-center gap-1">
          <Input disabled className="border-green-500" name="url" value={url} />
          <Button
            variant="ghost"
            onClick={() => copyToClipboard(url)}
            size="icon"
            className="cursor-pointer transition-all duration-300"
            title="Copy URL"
          >
            {icon}
          </Button>
        </div>
        <h1 className="font-bold">Metadata</h1>
        <p className="text-muted-foreground">{node.metadata || "N/A"}</p>
      </CardContent>
    </Card>
  );
};

export default NodeDetailsCard;
