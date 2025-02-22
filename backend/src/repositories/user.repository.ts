import User, { IUser } from "@/models/user.model";
import BaseRepository from "./base.repository";

export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}
