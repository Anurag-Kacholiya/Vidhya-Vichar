import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty"], required: true },
    status: { type: String, enum: ["unanswered", "answered", "important"], default: "unanswered" },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
