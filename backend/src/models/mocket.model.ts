import mongoose, { Schema, Document } from "mongoose";

export interface IMocket extends Document {
  requestType: string;
  endpoint: string;
  requestHeaders: Record<string, unknown>;
  requestBody: Record<string, unknown>;
  responseBody: Object;
  createdBy: string | mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  slugName: string;
  description?: string;
}

const MocketSchema: Schema = new Schema(
  {
    // name: { type: String },
    // apikey: { type: String, required: true, unique: true },
    requestType: { type: String, required: true },
    endpoint: { type: String, required: true },
    requestHeaders: { type: Schema.Types.Mixed, required: true },
    requestBody: { type: Schema.Types.Mixed, required: true },
    responseBody: { type: Schema.Types.Mixed, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    slugName: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const mocketModel = mongoose.model<IMocket>("Mocket", MocketSchema);
export default mocketModel;
