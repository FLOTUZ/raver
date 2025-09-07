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

import { events } from "@/data/data";
import { Event } from "@/interfaces";

export const RegisterComponent = ({ eventId }: { eventId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);

  const [sendingTicket, setSendingTicket] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      country_code: "+52",
      whatsApp: "",
      eventId,
    },

    onSubmit: async (values) => {
      setSendingTicket(true);
      const payload = {
        ...values,
        telephone: values.country_code.slice(1) + "1" + values.whatsApp,
      };

      try {
        const response = await axios.post("/api/register", payload);

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
        // eslint-disable-next-line no-console
        console.log(error);
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
    <div className=" p-4">
      <Breadcrumbs variant="bordered">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Events</BreadcrumbItem>
        <BreadcrumbItem href={`/events/${event.id}`}>
          {event.name.length > 20
            ? event.name.slice(0, 20) + "..."
            : event.name}
        </BreadcrumbItem>
        <BreadcrumbItem>Registro</BreadcrumbItem>
      </Breadcrumbs>
      {showForm ? (
        <>
          <h1 className="text-2xl font-bold mt-4 ">Registro de Entradas</h1>
          <p className="text-lg text-default-400">
            Completa el formulario para enviarte las instrucciones de pago.
          </p>

          <div className="mt-4 flex items-center justify-center">
            <Form
              className="flex flex-col space-y-4 mt-16"
              validationErrors={form.errors}
              onReset={() => form.resetForm()}
              onSubmit={form.handleSubmit}
            >
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Por favor ingresa tu nombre";
                  }

                  return null;
                }}
                label="Nombre"
                labelPlacement="outside"
                name="name"
                placeholder="Ingresa tu nombre"
                value={form.values.name}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Por favor ingresa tu email";
                  }

                  if (validationDetails.typeMismatch) {
                    return "Por favor ingresa un email válido";
                  }

                  return null;
                }}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Ingresa tu email"
                type="email"
                value={form.values.email}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />

              <div className="flex gap-2 flex-row mt-8">
                <Input
                  isRequired
                  className="w-25"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Por favor ingresa tu código de país";
                    }

                    return null;
                  }}
                  label="Código de País"
                  labelPlacement="outside"
                  name="country_code"
                  placeholder="Ingresa tu código de país"
                  value={form.values.country_code}
                  onBlur={form.handleBlur}
                  onChange={(e) => {
                    if (!e.target.value.startsWith("+")) {
                      form.setFieldValue("country_code", `+${e.target.value}`);

                      return;
                    }
                    form.setFieldValue("country_code", `${e.target.value}`);
                  }}
                />

                <Input
                  isRequired
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
                  label="WhatsApp a 10 dígitos"
                  labelPlacement="outside"
                  maxLength={10}
                  minLength={10}
                  name="whatsApp"
                  placeholder="Ingresa tu número de WhatsApp a 10 dígitos"
                  type="tel"
                  value={form.values.whatsApp}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                />
              </div>
              <p>
                <strong>Nota:</strong> Escribe correctamente tus datos de lo
                contrario no podrás realizar el pago ni recibir tu entrada
                correctamente.
              </p>
              <Button
                className="w-full"
                color="primary"
                isLoading={sendingTicket}
                type="submit"
              >
                Enviar
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-4">Gracias por registrarte</h1>
          <p className="text-lg text-default-400">
            Las instrucciones de pago han sido enviadas a tu correo electrónico
          </p>

          <div className="flex flex-col w-full items-center">
            <Image
              alt={event.name}
              className="mx-auto self-center w-full h-[400px] object-contain mt-4"
              src={"/paperplane.png"}
            />
          </div>

          <Button
            className="w-full mt-4"
            color="primary"
            onPress={() => setShowForm(true)}
          >
            Registrar otra entrada
          </Button>
        </>
      )}
    </div>
  );
};
