import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8"
      style={{ border: "1px solid red" }}
    >
      <Button color="primary">Button</Button>
    </section>
  );
}
