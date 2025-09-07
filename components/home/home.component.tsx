"use client";
import { Progress } from "@heroui/react";
import { useRouter } from "next/navigation";

import { EventCardComponent } from "./event-card.component";

import { useQuery } from "@/hooks/useQuery";
import { Event } from "@/interfaces";

export const HomeComponent = () => {
  const router = useRouter();

  const { data: events, loading } = useQuery<{}, Event[]>({
    url: "/api/events",
  });

  if (loading) {
    return (
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
        size="sm"
      />
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-5 w-full w-max-content justify-items-center">
      {events?.map((event) => (
        <div key={event.id} className="p-2">
          <EventCardComponent
            event={event}
            onClick={(event) => {
              router.push(`/events/${event.id}`);
            }}
            onLike={(event) => {
              console.log(event);
            }}
          />
        </div>
      ))}
    </section>
  );
};
