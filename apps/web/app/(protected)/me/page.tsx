"use client";
import React, { useEffect } from "react";
import { useMeQuery } from "@/store/api/user";

const Page = () => {
  const { data, isFetching, isError } = useMeQuery(null);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user data");
    }
  }, [isError]);

  if (isFetching) return <div>Loading...</div>;
  return <div>this is profile page {JSON.stringify(data?.data)}</div>;
};

export default Page;
