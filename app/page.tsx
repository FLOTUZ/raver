import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
      style={{ border: "1px solid red" }}
    >
      <Button color="primary">Button</Button>
    </section>
  );
}
