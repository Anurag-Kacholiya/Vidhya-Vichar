import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty"], default: "student" },
    status: { type: String, enum: ["unanswered", "answered", "important"], default: "unanswered" },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
