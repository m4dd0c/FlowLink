"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ManageZap = () => {
  const handleZapDelete = (id: string) => {
    alert("delete");
  };
  return (
    <Table>
      <TableCaption>A list of your zaps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.N.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Triggers</TableHead>
          <TableHead>No. of Actions</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>Zap to Send Email on:event Github Comment</TableCell>
          <TableCell>Github</TableCell>
          <TableCell>2</TableCell>
          <TableCell className="flex justify-end items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              asChild
            >
              <Link href="/zaps/:zap">
                <p>View</p>
                <FaRegEye className="" />
              </Link>
            </Button>

            <Button
              onClick={() => handleZapDelete("id")}
              variant="destructive"
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <p>Delete</p>
              <HiOutlineTrash className="" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ManageZap;
