"use client";
import { useParams } from "next/navigation";

import { ShowEventView } from "@/components/events";

const EventPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <ShowEventView eventId={id.toString()} />}</>;
};

export default EventPage;
