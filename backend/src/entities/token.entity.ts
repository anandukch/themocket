import { sign } from "jsonwebtoken";

export default class Token {
  key: string;
  expiresIn: string;
  constructor(init: Partial<Token>, key: string, expiresIn: string) {
    Object.assign(this, init);
    this.key = key;
    this.expiresIn = expiresIn;
  }

  userId?: string;
  email?: string;
  login?: boolean;

  sign() {
    return sign({ userId: this.userId, email: this.email }, this.key!, {
      expiresIn: "1h",
    });
  }
}
