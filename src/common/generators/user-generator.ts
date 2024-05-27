import { faker } from '@faker-js/faker';
import * as fs from 'node:fs';
import { compressAndEncodeImageBinary } from './photo-cropping-generator';
import { customDate } from '../helpers/helpers-functions';

export async function generateUser() {
  const name = faker.person.firstName();
  const user = {
    name: name,
    email: faker.internet.email(),
    phone: '+38093' + Math.floor(1000000 + Math.random() * 9000000),
    position_id: Math.floor(Math.random() * 4) + 1,
    photo: await compressAndEncodeImageBinary(
      await readAndCompressImage(),
      name,
    ),
    registration_timestamp: customDate(new Date()),
  };

  console.log('GENERATED USER', user);
  return user;
}

async function readAndCompressImage() {
  const imagePath =
    'C:\\Users\\user\\Desktop\\abz\\src\\common\\orig-pictures\\Alex1.jpg';

  return { buffer: fs.readFileSync(imagePath) };
}
