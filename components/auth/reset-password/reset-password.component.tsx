"use client";

import { Button, Input } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@/hooks";

export const ResetPasswordComponent = () => {
  const params = useSearchParams();
  const router = useRouter();

  const ott = params.get("ott");
  const user_id = params.get("user_id");

  const { mutate: RESET_PASSWORD } = useMutation<
    {
      new_password: string;
      confirm_password: string;
      ott: string;
      user_id: string;
    },
    {
      message: string;
    }
  >({
    url: "/api/auth/reset-password",
    method: "POST",
    onSuccess: (_) => {
      addToast({
        title: "Contraseña restablecida",
        variant: "solid",
        color: "success",
      });
      router.replace("/admin");
    },
    onError: (error: any) => {
      addToast({
        title: error.response?.data.error,
        variant: "solid",
        color: "danger",
      });
    },
  });

  const form = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      if (!ott || !user_id) {
        addToast({
          title: "Hubo un error al restablecer la contraseña",
          description: "Parametros ott y user_id son requeridos",
          variant: "solid",
          color: "danger",
        });

        return;
      }

      RESET_PASSWORD({ ...values, ott, user_id });
    },
  });

  if (!ott || !user_id) {
    return <div>Parametros ott y user_id son requeridos</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
        <Input
          label="Nueva contraseña"
          name="new_password"
          type="password"
          value={form.values.new_password}
          onChange={form.handleChange}
        />
        <Input
          label="Confirmar contraseña"
          name="confirm_password"
          type="password"
          value={form.values.confirm_password}
          onChange={form.handleChange}
        />

        <Button
          color="primary"
          isLoading={form.isSubmitting}
          radius="full"
          type="submit"
        >
          Restablecer contraseña
        </Button>
      </form>
    </div>
  );
};
