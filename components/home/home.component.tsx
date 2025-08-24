"use client";
import { events } from "@/data/data";
import { EventCardComponent } from "./event-card.component";

export const HomeComponent = () => {
  return (
    <section>
      <EventCardComponent
        event={events[0]}
        onClick={(event) => {
          console.log(event);
        }}
        onLike={(event) => {
          console.log(event);
        }}
      />
    </section>
  );
};
