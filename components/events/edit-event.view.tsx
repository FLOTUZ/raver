"use client";

import { Button, DateInput, Input, Progress, Textarea } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useFormik } from "formik";

import { useQuery } from "@/hooks/useQuery";
import { Event } from "@/interfaces";

export const EditEventView = ({ eventId }: { eventId: string }) => {
  const { data: event, loading: eventLoading } = useQuery<{}, Event>({
    url: `/api/events/${eventId}`,
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: event?.name || "",
      description: event?.description || "",
      image: event?.image || "",
      banner: event?.banner || "",
      location: event?.location || "",
      init_date: event?.init_date || "",
      end_date: event?.end_date || "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (eventLoading) {
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
    <div className="flex items-center justify-center">
      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-col gap-8 md:min-w-[600px] min-w-[400px]">
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Nombre del evento"
            value={form.values.name}
            onChange={(e) => form.setFieldValue("name", e.target.value)}
          />

          <Input
            isRequired
            label="Image URL"
            labelPlacement="outside"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={form.values.image}
            onChange={(e) => form.setFieldValue("image", e.target.value)}
          />

          <Input
            label="Banner URL"
            labelPlacement="outside"
            name="banner"
            placeholder="https://example.com/image.jpg"
            value={form.values.banner}
            onChange={(e) => form.setFieldValue("banner", e.target.value)}
          />

          <DateInput
            isRequired
            label={"Fecha de finalización del evento"}
            labelPlacement="outside"
            name="init_date"
            value={
              form.values.init_date === ""
                ? undefined
                : parseAbsoluteToLocal(form.values.init_date)
            }
            onChange={(value) => {
              if (value) {
                form.setFieldValue(
                  "init_date",
                  new Date(value.toString()).toISOString()
                );
              } else {
                form.setFieldValue("init_date", "");
              }
            }}
          />

          <DateInput
            label={"Fecha de finalización del evento"}
            labelPlacement="outside"
            name="init_date"
            value={
              form.values.end_date === ""
                ? undefined
                : parseAbsoluteToLocal(form.values.end_date)
            }
            onChange={(value) => {
              if (value) {
                form.setFieldValue(
                  "end_date",
                  new Date(value.toString()).toISOString()
                );
              } else {
                form.setFieldValue("end_date", "");
              }
            }}
          />

          <Input
            isRequired
            label="Location"
            labelPlacement="outside"
            name="location"
            placeholder="Ej: Auditorio Nacional, Ciudad, Pais"
            value={form.values.location}
            onChange={(e) => form.setFieldValue("location", e.target.value)}
          />

          <Textarea
            isClearable
            label="Description"
            minRows={20}
            name="description"
            placeholder="Description"
            value={form.values.description}
            variant="bordered"
            onChange={(e) => form.setFieldValue("description", e.target.value)}
            onClear={() => form.setFieldValue("description", "")}
          />

          <Button color="primary" type="submit">
            Button
          </Button>
        </div>
      </form>
    </div>
  );
};
