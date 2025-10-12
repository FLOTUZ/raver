import { Suspense } from "react";

import { ResetPasswordComponent } from "@/components/auth";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default ResetPasswordPage;
