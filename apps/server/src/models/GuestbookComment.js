import { Schema, model, Types } from "mongoose";

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
    timestamps: true, // createdAt, updatedAt
  }
);

export const GuestbookComment = model(
  "GuestbookComment",
  guestbookCommentSchema
);
