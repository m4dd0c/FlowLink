"use client";

import { useEffect, useState } from "react";
import { useGetZapQuery } from "@/store/api/zaps";
import Node from "@/components/Canvas/Node";
import NodeDetailsDrawer from "@/components/Canvas/NodeDetailsDrawer";

const Zap = ({ params }: { params: Promise<{ zapId: string }> }) => {
  // Getting slug
  const [zapId, setZapId] = useState<string | null>(null);
  useEffect(() => {
    params.then(({ zapId }) => setZapId(zapId));
  }, [params]);

  // Fetching Single Zap
  const { isFetching, refetch, data } = useGetZapQuery(
    { zapId: zapId || "" },
    { skip: !zapId },
  );

  // Open Detail Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [node, setNode] = useState<Record<string, any> | null>(null);

  const onViewDetails = (nodeId: string) => {
    if (!nodeId) {
      alert("Please select a node to view Details of, ERR: unknown NodeId");
    } else {
      setIsDrawerOpen(!isDrawerOpen);

      // Creating personalized node variant data for the View Details Drawer
      // Finding the node in the zap data
      // If the nodeId is equal to the trigger id, then it's a trigger node
      if (nodeId === data?.data?.trigger?.id)
        setNode({
          title: data?.data?.trigger?.title,
          label: data?.data?.trigger?.type?.name,
          metadata: data?.data?.trigger?.metadata,
          zapId: data?.data?.id,
          type: "Trigger",
        });
      else {
        // If the nodeId is not equal to the trigger id, then it's an action node
        // Loop through the actions to find the node and set the node state
        data?.data?.actions?.map((action: any) => {
          if (action.id === nodeId) {
            setNode({
              title: action.title,
              label: action.type.name,
              metadata: action.metadata,
              zapId: data?.data?.id,
              type: "Action",
            });
          }
        });
      }
    }
  };

  // Refetching zap data when zapId changes/become available
  useEffect(() => {
    if (zapId) refetch();
  }, [zapId, refetch]);

  if (!zapId || isFetching) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-1/3 max-lg:w-1/2 max-md:w-5/6">
        {/* Trigger Node */}
        {data?.data?.trigger && (
          <Node onViewDetails={onViewDetails} trigger={data?.data?.trigger} />
        )}
        {/* Action Nodes */}
        {data?.data?.actions &&
          data?.data?.actions?.map((action: any, idx: number) => {
            return (
              <div key={idx}>
                <Node action={action} onViewDetails={onViewDetails} />
              </div>
            );
          })}
      </div>
      <NodeDetailsDrawer
        node={node}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default Zap;
