
import userModel, { IUser } from "@/models/user.model";
import UserRepository from "@/repositories/user.repository";
import { SourceType } from "@/types/user.type";
import ErrorHandler from "@/utils/error";

import mongoose, { ClientSession } from "mongoose";
import { generateApiKey, generateUniqueMocketString } from "@/utils/token";
import { TokenPayload } from "google-auth-library";

export default class UserService {
  constructor(
    private userRepo: UserRepository,
  ) {}

  async getUserByEmail(email: string) {
    return userModel.findOne({ email }).exec();
  }

  async createGoogleUser(userPayload: TokenPayload) {
    if (!userPayload) {
      throw new ErrorHandler(400, "You're not userData");
    }
    let user: IUser | null = await this.getUserByEmail(userPayload.email!);
    if (!user) {
      user = await this.userRepo.create({
        email: userPayload.email!,
        name: userPayload.name!,
        source: SourceType.GOOGLE,
      } as IUser);
    }
    return user;
  }

  async getUserById(id: string) {
    return userModel.findById(id).exec();
  }

 

 
}
