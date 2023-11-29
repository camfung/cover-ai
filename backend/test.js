const sharp = require("sharp");
const fs = require("fs");
const axios = require("axios");
const { init } = require("node-persist");

// async function resizeImage() {
//   try {
//     let resizeImageBuffer = await sharp(
//       "C:\\Users\\camer\\Downloads\\img-GEAxUTYoo2IHFI8yexRZAuqn.png"
//     )
//       .toFormat("jpeg")
//       .toFile("test.jpg");
//   } catch (error) {
//     console.log(error);
//   }
// }
const printJpegImageSize = async (imageBuffer) => {
  const jpeg = await sharp(imageBuffer)
    .jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4",
    })
    .resize({
      width: 500,
      height: 500,
    })
    .toBuffer();
  const metadata = await sharp(jpeg).metadata();
};

const resizeImage = async (imageBuffer, size) => {
  const resizedImage = await sharp(imageBuffer)
    .resize({
      height: size,
      width: size,
    })
    .toBuffer();
  return resizedImage;
};

const shrinkTo256Kb = async (imageBuffer, initialSize) => {
  let currentSideLength = initialSize;
  let image = imageBuffer;
  let metadata = await sharp(image).metadata();
  let size = metadata.size / 1024; // in KB

  while (size > 256) {
    currentSideLength = Math.ceil(currentSideLength * 0.95);
    image = await resizeImage(image, currentSideLength);
    metadata = await sharp(image).metadata();
    size = metadata.size / 1024;
  }

  return image;
};
async function downloadImageAsBase64(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const jpeg = await sharp(response.data)
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    const shrunkImage = await shrinkTo256Kb(jpeg, 1024);
    await sharp(shrunkImage).toFile("./test.jpg");
  } catch (error) {
    console.error("Error downloading or converting image: ", error);
    throw error;
  }
}
downloadImageAsBase64("https://pngimg.com/d/burger_king_PNG3.png");

const printImageSize = async (imageBuffer) => {
  const metadata = await sharp(imageBuffer).metadata();
  console.log("🚀 ~ file: test.js:53 ~ printImageSize ~ metadata:", metadata);
};
