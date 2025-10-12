"use client";

import { addToast, Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { useMutation } from "@/hooks";
import { Checker } from "@/interfaces";

const NewCheckerPage = () => {
  const router = useRouter();

  const { mutate: CREATE_CHECKER } = useMutation<
    { email: string; name: string },
    { checker: Checker }
  >({
    url: "/api/checkers",
    method: "POST",
    onSuccess: (_) => {
      router.back();
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
      email: "",
      name: "",
    },
    onSubmit: (values) => {
      // handle form submission
      console.log(values);
      CREATE_CHECKER({ ...values });
    },
  });

  return (
    <div className={"mt-4 container mx-auto"}>
      <h1 className={"text-xl font-bold mb-4"}>Nuevo Checkeador</h1>

      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit}>
        <Input
          label="Nombre"
          name="name"
          type="text"
          value={form.values.name}
          onChange={form.handleChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.values.email}
          onChange={form.handleChange}
        />

        <Button color="primary" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default NewCheckerPage;
