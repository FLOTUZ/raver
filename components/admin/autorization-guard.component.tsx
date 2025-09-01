"use client";
import { useAdminAuth } from "@/providers";
import { LoginComponent } from "./login.component";

export const AutorizationGuardComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <LoginComponent />;
  }
  return <>{children}</>;
};
