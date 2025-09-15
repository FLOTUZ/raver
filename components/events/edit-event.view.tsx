"use client";

import { Button, DateInput, Input, Textarea } from "@heroui/react";
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
      console.log(values);
    },
  });

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

          <Input
            isRequired
            label="Location"
            labelPlacement="outside"
            name="location"
            placeholder="Ej: Auditorio Nacional, Ciudad, Pais"
          />

          <Textarea
            isClearable
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            label="Description"
            minRows={10}
            name="description"
            placeholder="Description"
            variant="bordered"
            onClear={() => console.log("textarea cleared")}
          />

          <Button color="primary">Button</Button>
        </div>
      </form>
    </div>
  );
};
