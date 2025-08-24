import { HomeComponent } from "@/components/home";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8"
      style={{ border: "1px solid red" }}
    >
      <HomeComponent />
      <Button color="primary">Ver todos los eventos</Button>
    </section>
  );
}
