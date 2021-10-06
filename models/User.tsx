import { IUser } from "interfaces/IUser";
import mongoose, { Model, Schema } from "mongoose";
const UserSchema: Schema = new Schema({
  name: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  shortName: {
    type: String,
  },
  image: {
    type: String,
  },
  skills: {
    type: String,
  },
  status: {
    type: [String],
    enum: ["active", "invited", "disabled", "recent", "client"],
    //default: "disabled",
  },
  role: {
    type: [String],
    enum: ["owner", "admin", "user", "client", "guest"],
    //default: "owner",
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  projects: {
    type: String,
  },
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
    timestamp: true,
  },
  updatedBy: String,
  updatedAt: {
    type: Date,
    default: Date.now,
    timestamp: true,
  },
});
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
