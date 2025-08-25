import { events } from "@/data/data";
import { Event } from "@/interfaces";
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Form,
  Image,
  Input,
  Progress,
} from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export const BuyComponent = ({ eventId }: { eventId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);

  const [sendingTicket, setSendingTicket] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      whatsApp: "",
      eventId,
    },

    onSubmit: async () => {
      setSendingTicket(true);

      try {
        const response = await axios.post("/api/buy", form.values);

        if (response.status === 201) {
          form.resetForm();
          setShowForm(false);
          addToast({
            title: "Entrada Enviada",
            description: "Tu entrada ha sido enviada con exito",
            variant: "solid",
            color: "success",
          });
        }
      } catch (error) {
        addToast({
          title: "Error",
          description: "Hubo un error al enviar la entrada",
          variant: "solid",
          color: "danger",
        });
      }
      setSendingTicket(false);
    },
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
          {event.name.length > 20
            ? event.name.slice(0, 20) + "..."
            : event.name}
        </BreadcrumbItem>
        <BreadcrumbItem>Comprar</BreadcrumbItem>
      </Breadcrumbs>
      {showForm ? (
        <>
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
              <Button
                className="w-full"
                color="primary"
                type="submit"
                isLoading={sendingTicket}
              >
                Submit
              </Button>
              <Button type="reset" variant="bordered">
                Reset
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-4">Gracias por registrarte</h1>
          <p className="text-lg text-default-400">
            Tus entradas han sido enviadas con exito a tu email y whatsapp para
            continuar con el proceso de pago
          </p>

          <div className="flex flex-col w-full items-center">
            <Image
              src={"/paperplane.png"}
              alt={event.name}
              className="mx-auto self-center w-full h-[400px] object-cover mt-4"
            />
          </div>

          <Button
            className="w-full mt-4"
            color="primary"
            onPress={() => setShowForm(true)}
          >
            Comprar otra entrada
          </Button>
        </>
      )}
    </>
  );
};
