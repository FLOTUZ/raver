"use client";

import { BuyComponent } from "@/components/buy/buy.component";
import { useParams } from "next/navigation";

const ButPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <BuyComponent eventId={id.toString()} />}</>;
};

export default ButPage;
