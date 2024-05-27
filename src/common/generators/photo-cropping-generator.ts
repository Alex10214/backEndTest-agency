// eslint-disable-next-line @typescript-eslint/no-var-requires
const tinify = require('tinify');
tinify.key = 'CkWVGqcrpCfZyRxPMdWkfbTt6YWhTk3F';
export async function compressAndEncodeImageBinary(
  photoData: any,
  name: string,
) {
  const toFolder = `C:\\Users\\user\\Desktop\\abz\\src\\common\\resized-pictures\\${name}.jpg`;
  const photo = tinify.fromBuffer(photoData.buffer);
  const resized = photo.resize({
    method: 'cover',
    width: 70,
    height: 70,
  });

  try {
    await resized.toFile(toFolder);
  } catch (e) {
    console.error(e);
  }

  return toFolder;
}
