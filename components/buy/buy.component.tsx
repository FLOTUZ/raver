import { events } from "@/data/data";
import { Event } from "@/interfaces";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Form,
  Input,
  Progress,
} from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export const BuyComponent = ({ eventId }: { eventId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      whatsApp: "",
      eventId,
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    setLoading(true);
    const fetchEvent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const event = events.find((event) => event.id === eventId);
      setEvent(event || null);
      setLoading(false);
    };
    fetchEvent();
  }, []);

  if (loading || !event) {
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
    <>
      <Breadcrumbs variant="bordered">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Events</BreadcrumbItem>
        <BreadcrumbItem href={`/events/${event.id}`}>
          {event.name}
        </BreadcrumbItem>
        <BreadcrumbItem>Comprar</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-2xl font-bold mt-4">Comprar entrada</h1>
      <p className="text-lg text-default-400">
        Completa el formulario para enviar tus entradas
      </p>
      <Form
        className="w-full  space-y-4 mt-16"
        validationErrors={form.errors}
        onReset={() => form.resetForm()}
        onSubmit={form.handleSubmit}
      >
        <div className="flex flex-col gap-4 max-w-md w-full">
          <Input
            name="name"
            label="Nombre"
            isRequired
            labelPlacement="outside"
            placeholder="Ingresa tu nombre"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Por favor ingresa tu nombre";
              }

              return null;
            }}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            isRequired
            labelPlacement="outside"
            placeholder="Ingresa tu email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Por favor ingresa tu email";
              }

              if (validationDetails.typeMismatch) {
                return "Por favor ingresa un email válido";
              }

              return null;
            }}
          />

          <Input
            name="whatsApp"
            label="WhatsApp"
            type="tel"
            minLength={10}
            maxLength={13}
            isRequired
            labelPlacement="outside"
            placeholder="Ingresa tu número de WhatsApp"
            value={form.values.whatsApp}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Por favor ingresa tu número de WhatsApp";
              }

              if (validationDetails.typeMismatch) {
                return "Por favor ingresa un número de WhatsApp válido";
              }

              if (form.values.whatsApp.length < 10) {
                return "El número de WhatsApp debe tener al menos 10 caracteres";
              }

              return validationDetails.patternMismatch;
            }}
          />
        </div>
        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>

        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </div>
      </Form>
    </>
  );
};
