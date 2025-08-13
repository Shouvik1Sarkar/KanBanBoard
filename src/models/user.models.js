import mongoose, { Schema } from "mongoose";
import { userRolesEnum, userRolesObject } from "../utils/constants.utils.js";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: { type: String },
    emailVerificationTokenExpiry: { type: Date },
    refreshToken: { type: String },
    refreshTokenExpiry: { type: Date },
    accessToken: { type: String },
    accessTokenExpiry: { type: Date },
    userRole: {
      type: String,
      enum: userRolesEnum,
      default: userRolesObject.USER,
    },
    project: [
      {
        projectId: {
          type: Schema.Types.ObjectId,
          ref: "Project",
        },

        role: {
          type: String,
          enum: userRolesEnum,
          default: userRolesObject.USER,
        },
      },
    ],
    task: [
      {
        taskId: {
          type: Schema.Types.ObjectId,
          ref: "Task",
        },

        role: {
          type: String,
          enum: userRolesEnum,
          default: userRolesObject.USER,
        },
      },
    ],
  },

  /**
   * Gotta learn abt this and the diff
   * project: {
  type: [
    {
      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
      role: {
        type: String,
        enum: userRolesEnum,
        default: userRolesObject.USER,
      },
    },
  ],
  default: [],
}
   */
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
