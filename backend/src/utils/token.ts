import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const generateApiKey = async () => {
  const saltRounds = 10;
  const token = uuidv4();
  return await bcrypt.hash(token, saltRounds);
};

export const generateUniqueMocketString = (length: number = 3): string => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${randomString}${Math.random()
    .toString(36)
    .substring(2, 2 + length)}`;
};
