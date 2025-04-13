"use client";

import { useEffect, useState } from "react";
import { useGetZapQuery } from "@/store/api/zaps";

const Zap = ({ params }: { params: Promise<{ zapId: string }> }) => {
  const [zapId, setZapId] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ zapId }) => setZapId(zapId));
  }, [params]);

  const { isFetching, refetch, data } = useGetZapQuery(
    { zapId: zapId || "" },
    { skip: !zapId },
  );

  useEffect(() => {
    if (zapId) refetch();
  }, [zapId, refetch]);

  console.log("data", data?.data);
  if (!zapId || isFetching) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Hello world</h1>
      {JSON.stringify(data?.data)} is the data
    </div>
  );
};

export default Zap;
