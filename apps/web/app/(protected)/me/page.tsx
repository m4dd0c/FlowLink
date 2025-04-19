"use client";
import React, { useEffect } from "react";
import { useLazyLogoutQuery, useMeQuery } from "@/store/api/user";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data, isFetching, isError } = useMeQuery(null);

  const [name, setName] = React.useState<string | null>(null);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching user data");
    }
  }, [isError]);

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
    }
  }, [data?.data]);
  const [trigger] = useLazyLogoutQuery();
  const logout = () => {
    trigger(null);
  };

  if (isFetching) return <div>Loading...</div>;
  return (
    <div className="h-screen">
      <div className="container mx-auto">
        Hello, I&apos;m {name} <br />
        <br />
        {data?.data && <Button onClick={logout}>Logout</Button>}
      </div>
    </div>
  );
};

export default Page;
