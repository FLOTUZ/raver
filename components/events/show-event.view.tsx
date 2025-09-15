"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button, Image, Progress } from "@heroui/react";
import Link from "next/link";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { useQuery } from "@/hooks/useQuery";
import { Event } from "@/interfaces";

export const ShowEventView = ({ eventId }: { eventId: string }) => {
  const { data: event, loading: eventLoading } = useQuery<{}, Event>({
    url: `/api/events/${eventId}`,
  });

  if (eventLoading && event === null) {
    return (
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
        size="sm"
      />
    );
  }

  if (!event || event === null) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
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
            alt="Event"
            className="object-cover mt-4 w-full max-w-5xl rounded-xl"
            height={400}
            src={event.banner}
          />
        )}
      </div>

      {/* Event details */}
      <div className="w-full flex justify-center mt-6 mb-16">
        <div className="w-full max-w-3xl text-start">
          <h1 className="text-3xl font-bold text-center">{event?.name}</h1>

          <br />
          <div className="bg-black text-white p-4 rounded-xl max-w-3xl mx-auto prose prose-lg prose-p:text-white prose-headings:text-orange-400 prose-strong:text-yellow-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-200">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {event.description}
            </ReactMarkdown>
          </div>
          <Link href={`/events/${event.id}/register`}>
            <Button
              className="px-8 w-full"
              color="primary"
              size="lg"
              variant="shadow"
            >
              <span className="inline-flex items-center gap-2">
                Pre-registro
                <PiIdentificationBadgeFill size={20} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
