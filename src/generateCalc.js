import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { today } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import nodeHtmlToImage from "node-html-to-image";

export async function generateCalc(cite) {
  const code = readFileSync("./assets/render.html").toString("utf-8");

  const dateString = today();

  const htmlCode = code
    .replace("{{cite}}", cite)
    .replace("{{date}}", dateString);

  const browser = await puppeteer.launch({
    headless: true,
    product: "firefox",
    args: ["-wait-for-browser"],
    executablePath: "C:/Program Files (x86)/Mozilla Firefox/firefox.exe",
    userDataDir: "./temp/firefoxProfile",
  });
  console.log("\tbrowser launched");
  const page = await browser.newPage();
  console.log("\tpage created");

  //   await page.setViewport({ width: 1080, height: 1920 });

  await page.setContent(htmlCode, { waitUntil: "domcontentloaded" });

  console.log("\tpage content set");
  const sct = await page.screenshot({
    // path: "./temp/calcGreen.png",
    fullPage: true,
  });
  console.log("\tscreenshot taken");
  browser.close();
  console.log("\tbrowser closed");

  return sct;
}
