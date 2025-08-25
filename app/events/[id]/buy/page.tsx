"use client";

import { RegisterComponent } from "@/components/register/register.component";
import { useParams } from "next/navigation";

const ButPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <RegisterComponent eventId={id.toString()} />}</>;
};

export default ButPage;
