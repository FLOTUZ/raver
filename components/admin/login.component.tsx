"use client";

import { useAdminAuth } from "@/providers";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";
import { HiMailOpen } from "react-icons/hi";

export const LoginComponent = () => {
  const { login, error, loading } = useAdminAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate(values) {
      const errors: any = {};
      if (!values.email) {
        errors.email = "El correo es requerido";
      }
      if (!values.password) {
        errors.password = "La contraseña es requerida";
      }
      if (Object.keys(errors).length > 0) {
        return errors;
      }
    },
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className="min-h-full grid place-items-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="px-6 pt-6 pb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Hola!</h1>
            <p className="text-sm text-foreground-500">Ingresa a tu cuenta</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <form onSubmit={form.handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo"
              type="email"
              name="email"
              value={form.values.email}
              onValueChange={(val) => form.setFieldValue("email", val)}
              placeholder="you@example.com"
              startContent={<HiMailOpen size={18} />}
              isRequired
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={form.values.password}
              onValueChange={(val) => form.setFieldValue("password", val)}
              placeholder="••••••••"
              startContent={<FaLock size={18} />}
              isRequired
            />

            {error && <p className="text-red-500">{error}</p>}

            {/*  <div className="flex items-center justify-between">
              <Checkbox
                isSelected={form.values.remember}
                onValueChange={(val) => form.setFieldValue("remember", val)}
              >
                Recuérdame
              </Checkbox>
            </div> */}

            <Button
              type="submit"
              isLoading={loading}
              className="mt-2"
              fullWidth
              color="primary"
            >
              Ingresar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
