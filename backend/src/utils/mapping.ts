import { faker } from "@faker-js/faker";

export const fakerMappings: Record<string, () => any> = {
  firstname: faker.person.firstName,
  lastname: faker.person.lastName,
  gender: faker.person.sex,
  email: faker.internet.email,
  phone: faker.phone.number,
  age: () => faker.number.int({ min: 18, max: 80 }),
  country: faker.location.country,
  city: faker.location.city,
  street: faker.location.street,
  date: faker.date.recent,
  sentence: faker.lorem.sentence,
  paragraph: faker.lorem.paragraph,
  url: faker.internet.url,
  word: faker.lorem.word,
  number: faker.number.int,
  httpStatusCode: faker.internet.httpStatusCode,
  jwt: faker.internet.jwt,
  uuid: faker.string.uuid,
  string: faker.lorem.word,
};
