"use client";
import { ShowEventView } from "@/components/events";
import { useParams } from "next/navigation";

const EventPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <ShowEventView eventId={id.toString()} />}</>;
};

export default EventPage;
