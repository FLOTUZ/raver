import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";

export const markdownToHTML = async ({ markdown }: { markdown: string }) => {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const descriptionHTML = await marked(markdown);

  const safeHTML = purify.sanitize(descriptionHTML);

  return safeHTML;
};
