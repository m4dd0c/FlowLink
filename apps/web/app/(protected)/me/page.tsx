"use client";
import React, { useEffect } from "react";
import { useLazyLogoutQuery, useMeQuery } from "@/store/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";

const Page = () => {
  const { data: user, isFetching, isError } = useMeQuery(null);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user data");
    }
  }, [isError]);

  const [trigger] = useLazyLogoutQuery();
  const logout = () => {
    trigger(null);
  };

  if (isFetching) return <div>Loading...</div>;
  return (
    <div className="h-screen mt-24">
      <div className="container mx-auto space-y-4">
        <h1 className="text-7xl font-bold uppercase">
          Hello, {user?.data?.name}
        </h1>
        <div className="space-y-2 w-1/4">
          <Label htmlFor="name">&nbsp;Full Name</Label>
          <Input
            id="name"
            className="text-xl"
            value={user?.data?.name}
            disabled
          />
          <br />

          <Label htmlFor="email">&nbsp;Email</Label>
          <Input
            id="email"
            className="text-xl"
            value={user?.data?.email}
            disabled
          />
        </div>
        {user?.data && (
          <Button className="w-1/4 cursor-pointer" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
