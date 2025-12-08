import { Schema, model, Types } from "mongoose";

const guestbookCommentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User", // User 컬렉션을 참조
      required: true,
    },
    content: { type: String, required: true, maxlength: 500 }, // 댓글 내용
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const GuestbookComment = model(
  "GuestbookComment",
  guestbookCommentSchema
);
