import { addCalcTovideo } from "./addCalcTovideo.js";
import { addMusic } from "./addMusic.js";
import { generateCalc } from "./generateCalc.js";
import { getCite } from "./getCite.js";
import { removeGreen } from "./removeGreen.js";

async function main() {
  console.log("Start");
  console.log("Fetching citation...");
  const cite = await getCite();
  console.log("Ok.\n");

  console.log("Rendering green calc with citation...");
  const greenCalc = await generateCalc(cite);
  console.log("Ok.\n");

  console.log("Removing green pixels of green calc...");
  const cleanCalc = await removeGreen(greenCalc);
  console.log("Ok.\n");

  console.log("Adding the calc to the video.");
  const noSoundVideo = await addCalcTovideo(cleanCalc);
  console.log("Ok.\n");

  console.log("Adding music to the video");
  const outFile = await addMusic(noSoundVideo, "./assets/music30s.mp3");
  console.log("Ok.\n");

  console.log(`Done. File: ./${outFile}`);
}

main();
