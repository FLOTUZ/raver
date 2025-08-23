import { HeartFilledIcon } from "@/components/core/icons";
import { HomeComponent } from "@/components/home";
import { Button } from "@heroui/button";
import { FiShare2 } from "react-icons/fi";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8"
      style={{ border: "1px solid red" }}
    >
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2 gap-2">
          <h2 className="text-2xl font-bold">Evento de prueba</h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            voluptates.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            color="primary"
            size="sm"
            variant="bordered"
            className="flex items-center gap-1"
          >
            <HeartFilledIcon className="w-5 h-5" />0
          </Button>
          <Button
            color="primary"
            size="sm"
            variant="bordered"
            className="flex items-center gap-1"
          >
            <FiShare2 />
          </Button>
        </div>
      </div>
      <HomeComponent />
      <Button color="primary">Ver todos los eventos</Button>
    </section>
  );
}
