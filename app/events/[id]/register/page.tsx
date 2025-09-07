"use client";

import { useParams } from "next/navigation";

import { RegisterComponent } from "@/components/register/register.component";

const RegisterPage = () => {
  const params = useParams();
  const { id } = params;

  return <>{id && <RegisterComponent eventId={id.toString()} />}</>;
};

export default RegisterPage;
