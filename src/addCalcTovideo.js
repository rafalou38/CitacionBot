import Ffmpeg from "fluent-ffmpeg";
import { today } from "./utils.js";

export async function addCalcTovideo(calcPath) {
  const fileName = "./temp/noMusic.mp4";
  return new Promise((resolve, reject) => {
    Ffmpeg()
      .input("./assets/back.mp4")
      .input(calcPath)
      .videoCodec("libx264")
      .outputOptions("-pix_fmt yuv420p")
      .complexFilter(["[0:v][1:v] overlay=0:0"])
      .save(fileName)
      .on("end", () => {
        resolve(fileName);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
