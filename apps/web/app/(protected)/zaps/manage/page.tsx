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
import { useGetAllZapsQuery } from "@/store/api/zaps";
import { tUnknownObj } from "@/types";

const ManageZap = () => {
  const { isFetching, data } = useGetAllZapsQuery(null);

  console.log(data);
  const handleZapDelete = (zapId?: string) => {
    if (!zapId) return;
    alert("delete");
  };
  if (isFetching) return <h1>Loading...</h1>;
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
        {data?.data.map((zap: tUnknownObj, idx: number) => (
          <TableRow key={zap?.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{zap?.title}</TableCell>
            <TableCell>{zap?.trigger?.type?.name}</TableCell>
            <TableCell>{zap?.actions?.length}</TableCell>
            <TableCell className="flex justify-end items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                asChild
              >
                <Link href={`/zaps/${zap?.id}`}>
                  <p>View</p>
                  <FaRegEye className="" />
                </Link>
              </Button>

              <Button
                onClick={() => handleZapDelete(zap?.id)}
                variant="destructive"
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <p>Delete</p>
                <HiOutlineTrash className="" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageZap;
