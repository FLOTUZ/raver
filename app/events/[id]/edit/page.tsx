"use client";
import { useParams } from "next/navigation";

import { EditEventView } from "@/components/events";

const EditEventPage = () => {
  const params = useParams();
  const { id } = params;

  <>{id && <EditEventView eventId={id.toString()} />}</>;
};

export default EditEventPage;
