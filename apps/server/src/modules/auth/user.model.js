import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    githubId: { type: String, required: true, unique: true }, // GitHub에서 오는 고유 ID
    login: { type: String, required: true }, // 깃허브 username (ex: chlruddlf73)
    avatarUrl: { type: String }, // 프로필 이미지 URL
    profileUrl: { type: String }, // GitHub 프로필 링크
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

export const User = model("User", userSchema);
