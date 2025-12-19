import { Schema, model, Types } from "mongoose";

/**
 * GuestbookComment schema (방명록 댓글)
 * @property {import("mongoose").Types.ObjectId} user User ObjectId (ref: "User")
 * @property {string} content 댓글 내용 (최대 500자)
 */
const guestbookCommentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true, maxlength: 500 },
  },
  {
    timestamps: true,
  }
);

export const GuestbookComment = model(
  "GuestbookComment",
  guestbookCommentSchema
);
