import { Suspense } from "react";

import { ShowRegisteredComponent } from "@/components/register";

const ShowRegisteredPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShowRegisteredComponent />
    </Suspense>
  );
};

export default ShowRegisteredPage;
