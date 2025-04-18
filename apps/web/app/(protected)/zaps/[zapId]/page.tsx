"use client";

import { useEffect, useState } from "react";
import { useGetZapQuery } from "@/store/api/zaps";
import Node from "@/components/Canvas/Node";
// import { DrawerComp } from "@/components/Canvas/Drawer";

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

  console.log(data);
  if (!zapId || isFetching) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-1/3 max-lg:w-1/2 max-md:w-5/6">
        {/* Trigger Node */}
        {data?.data?.trigger && <Node trigger={data?.data?.trigger} />}
        {/* Action Nodes */}
        {data?.data?.actions &&
          data?.data?.actions?.map((action: any, idx: number) => {
            return (
              <div key={idx}>
                <Node action={action} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Zap;
