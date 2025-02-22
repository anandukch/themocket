import { SourceType } from "@/types/user.type";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  source: SourceType;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    source: { type: String, enum: SourceType, default: SourceType.LOCAL },
  },
  { timestamps: true }
);
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const userModel = mongoose.model<IUser>("User", UserSchema);
export default userModel;
