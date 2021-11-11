import Ffmpeg from "fluent-ffmpeg";
import { today } from "./utils.js";
export async function addMusic(videoPath, musicPath) {
  const outFile = today().replace(/\//g, "-") + ".mp4";
  return new Promise((resolve, reject) => {
    Ffmpeg()
      .input(videoPath)
      .inputOption("-stream_loop -1")
      .input(musicPath)
      .outputOptions(["-shortest", "-map 0:v:0", "-map 1:a:0"])
      .save(outFile)
      .on("end", () => {
        resolve(outFile);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
