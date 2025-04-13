"use client";
import React, { useEffect } from "react";

const Zap = ({ params }: { params: Promise<{ zapId: string }> }) => {
  useEffect(() => {
    async function fetchZap() {
      const { zapId } = await params;
      console.log(zapId);
      // const zap = await getZapQuery(zapId.zapId);
      // setZap(zap);
    }

    fetchZap();
  }, [params]);
  return <div>page</div>;
};

export default Zap;
