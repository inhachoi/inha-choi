import { Schema, model } from "mongoose";

/**
 * User schema (GitHub OAuth 사용자)
 * @property {string} githubId   GitHub 고유 ID
 * @property {string} login      GitHub username (ex: chlruddlf73)
 * @property {string=} avatarUrl 프로필 이미지 URL
 * @property {string=} profileUrl GitHub 프로필 링크
 */
const userSchema = new Schema(
  {
    githubId: { type: String, required: true, unique: true },
    login: { type: String, required: true }, 
    avatarUrl: { type: String },
    profileUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
