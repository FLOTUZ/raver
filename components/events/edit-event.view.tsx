"use client";

import { Button, DateInput, Input, Textarea } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useFormik } from "formik";

export const EditEventView = () => {
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      banner: "",
      location: "",
      init_date: "",
      end_date: "",
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
            defaultValue={form.values.name}
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Nombre del evento"
            onChange={(e) => form.setFieldValue("name", e.target.value)}
          />

          <Input
            isRequired
            defaultValue={form.values.image}
            label="Image URL"
            labelPlacement="outside"
            name="image"
            placeholder="https://example.com/image.jpg"
            onChange={(e) => form.setFieldValue("image", e.target.value)}
          />

          <Input
            isRequired
            defaultValue={form.values.banner}
            label="Banner URL"
            labelPlacement="outside"
            name="banner"
            placeholder="https://example.com/image.jpg"
            onChange={(e) => form.setFieldValue("banner", e.target.value)}
          />

          <DateInput
            defaultValue={
              form.values.init_date === ""
                ? undefined
                : parseAbsoluteToLocal(form.values.init_date)
            }
            label={"Fecha de finalización del evento"}
            labelPlacement="outside"
            name="init_date"
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
            defaultValue={
              form.values.end_date === ""
                ? undefined
                : parseAbsoluteToLocal(form.values.end_date)
            }
            label={"Fecha de finalización del evento"}
            labelPlacement="outside"
            name="init_date"
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
            defaultValue={form.values.location}
            label="Location"
            labelPlacement="outside"
            name="location"
            placeholder="Ej: Auditorio Nacional, Ciudad, Pais"
            onChange={(e) => form.setFieldValue("location", e.target.value)}
          />

          <Textarea
            isClearable
            defaultValue={form.values.description}
            label="Description"
            minRows={10}
            name="description"
            placeholder="Description"
            variant="bordered"
            onChange={(value) => form.setFieldValue("description", value)}
            onClear={() => form.setFieldValue("description", "")}
          />

          <Button color="primary">Button</Button>
        </div>
      </form>
    </div>
  );
};
