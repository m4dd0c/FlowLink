import { CanvasHeader } from "@/components/layout/Header";
import React from "react";

export default function ZapsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CanvasHeader />
      <main className="p-4">{children}</main>
    </div>
  );
}
