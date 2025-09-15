"use client";
import { useParams } from "next/navigation";

import { EditEventView } from "@/components/events";

const EditEventPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <EditEventView eventId={id.toString()} />}</>;
};

export default EditEventPage;
