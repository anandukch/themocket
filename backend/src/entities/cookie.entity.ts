import { NODE_ENV } from "@/utils/variables";

export default class CookieOptions {
  httpOnly = NODE_ENV === "production" ? true : false;
  expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  secure = true;
  signed = NODE_ENV === "production" ? true : false;
  sameSite = "none";
  // domain = process.env.PARENT_DOMAIN;
}
