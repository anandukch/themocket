import { Request } from "express";

export interface DataStoredInToken {
  userId: string;
  email: string;
  // username: string;
  login: boolean;
}

export interface TokenData {
  token: string;
  expiresIn: number | string;
}

export interface RequestWithInfo extends Request {
  user?: {
    userId: string;
    email: string;
    login: boolean;
  };
  userId?: string;
  projectId?: string;
  subDomainId?: string;
}
