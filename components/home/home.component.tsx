"use client";
import { events } from "@/data/data";
import { EventCardComponent } from "./event-card.component";

export const HomeComponent = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-5 w-full w-max-content justify-items-center">
      {events.map((event) => (
        <div key={event.id} className="p-2">
          <EventCardComponent
            event={event}
            onClick={(event) => {
              console.log(event);
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
