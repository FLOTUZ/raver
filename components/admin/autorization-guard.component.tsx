"use client";
import { LoginComponent } from "./login.component";

import { useAdminAuth } from "@/providers";

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
