import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  apiKey: string;
  subDomain: string;
  createdBy: string;
  numberOfRequests: number;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    subDomain: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    numberOfRequests: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const projectModel = mongoose.model<IProject>("Project", ProjectSchema);
export default projectModel;
