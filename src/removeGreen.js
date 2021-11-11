import sharp from "sharp";

const OUT_FILE = "./temp/calc.png";

/**
 *
 * @param {string | Buffer } buff
 */
export async function removeGreen(buff) {
  const { data, info } = await sharp(buff)
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += 4) {
    let [r, g, b, _] = data.slice(index, index + 4);
    if (g > r || g > b) {
      data[index + 1] = 0; // reset green
      data[index + 3] = 255 - g; // set alpha
    }
  }
  sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).toFile(OUT_FILE);
  return OUT_FILE;
}
