"use client";

import { DateInput, Input, Textarea, TimeInput } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useFormik } from "formik";

export const EditEventView = () => {
  const form = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      location: "",
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div className="p-4">
      <form onSubmit={form.handleSubmit}>
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Nombre del evento"
        />

        <Textarea
          isClearable
          className="max-w-xs"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          label="Description"
          minRows={10}
          name="description"
          placeholder="Description"
          variant="bordered"
          onClear={() => console.log("textarea cleared")}
        />

        <Input
          isRequired
          label="Image URL"
          labelPlacement="outside"
          name="image"
          placeholder="https://example.com/image.jpg"
        />

        <Input
          isRequired
          label="Banner URL"
          labelPlacement="outside"
          name="banner"
          placeholder="https://example.com/image.jpg"
        />

        <DateInput
          defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
          label={"Fecha de finalización del evento"}
          labelPlacement="outside"
          name="init_date"
        />

        <DateInput
          defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
          label={"Fecha de finalización del evento"}
          labelPlacement="outside"
          name="init_date"
        />

        <TimeInput label="Hora de inicio del evento" name="start_time" />

        <TimeInput label="Hora de finalización del evento" name="end_time" />

        <Input
          isRequired
          label="Location"
          labelPlacement="outside"
          name="location"
          placeholder="Ej: Auditorio Nacional, Ciudad, Pais"
        />
      </form>
    </div>
  );
};
