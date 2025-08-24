"use client";
import { events } from "@/data/data";
import { EventCardComponent } from "./event-card.component";

export const HomeComponent = () => {
  return (
    <section className="grid grid-cols-12 gap-4">
      {events.map((event) => (
        <EventCardComponent
          key={event.id}
          event={event}
          onClick={(event) => {
            console.log(event);
          }}
          onLike={(event) => {
            console.log(event);
          }}
        />
      ))}
    </section>
  );
};
