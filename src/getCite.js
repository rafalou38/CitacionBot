import fetch from "node-fetch";
import { parse } from "node-html-parser";

export async function getCite() {
  let response = await fetch("https://citations.ouest-france.fr/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,",
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetchCitation\nError: ${response.status}`);
    process.exit(1);
  }

  let html = await response.text();
  const dom = parse(html);
  const cite = dom.querySelector(".firsth blockquote").innerText;
  if (!cite) {
    console.error(
      "La structure du site web a changé impossible d'obtenir la citation."
    );

    process.exit(1);
  }
  return cite;
}
