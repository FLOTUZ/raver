"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button, Image, Progress } from "@heroui/react";

import { events } from "@/data/data";
import { Event } from "@/interfaces";
import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { ImTicket } from "react-icons/im";

export const ShowEventView = ({ eventId }: { eventId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchEvent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEvent(() => events.find((event) => event.id === eventId) || null);
      setLoading(false);
    };
    fetchEvent();
  }, []);

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

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <Breadcrumbs variant="bordered">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Events</BreadcrumbItem>
        <BreadcrumbItem href={`/events/${event.id}`}>
          {event.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      {/* Event banner */}
      <div className="w-full flex justify-center">
        {event?.banner && (
          <Image
            src={event.banner}
            alt="Event"
            height={400}
            className="object-cover mt-4 w-full max-w-5xl rounded-xl"
          />
        )}
      </div>

      {/* Event details */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-full max-w-3xl text-start">
          <h1 className="text-3xl font-bold self-center">{event?.name}</h1>

          <br />
          <div className="bg-black text-white p-4 rounded-xl max-w-3xl mx-auto prose prose-lg prose-p:text-white prose-headings:text-orange-400 prose-strong:text-yellow-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-200">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {event.description}
            </ReactMarkdown>
          </div>
          <Button
            size="lg"
            color="secondary"
            variant="shadow"
            className="px-8 w-full"
          >
            <span className="inline-flex items-center gap-2">
              Comprar pase
              <ImTicket className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};
