import express from "express";
import Question from "../models/questionModel.js";
import authMiddleware from "./authRoutes.js";

const router = express.Router();

//Create a new question
router.post("/create",authMiddleware, async (req, res) => {
  try {
    const { text, author, role } = req.body;

    if (!text || !author) {
      return res.status(400).json({ message: "Question text and author are required" });
    }

    // prevent duplicate questions (optional)
    const existing = await Question.findOne({ text });
    if (existing) {
      return res.status(400).json({ message: "Duplicate question" });
    }

    const newQuestion = new Question({
      text,
      author,
      role,
      status: "unanswered", // default status
    });

    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error posting question", error: error.message });
  }
});

// Fetch all questions (with optional filters)
router.get("/fetch", authMiddleware,async (req, res) => {
  try {
    const { status } = req.query; // optional filter ?status=unanswered
    let query = {};
    if (status) query.status = status;

    const questions = await Question.find(query).sort({ createdAt: -1 }); // latest first
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
});

//Update question status (mark answered/important)
router.put("/update/:id",authMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // "answered" | "important" | "unanswered"
    if (!status) return res.status(400).json({ message: "Status is required" });

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
});

//Clear a single question
router.delete("/delete/:id",authMiddleware, async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Question not found" });

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
});

//Clear all questions (faculty can use at end of lecture)
router.delete("/delete",authMiddleware, async (req, res) => {
  try {
    await Question.deleteMany({});
    res.json({ message: "All questions cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing questions", error: error.message });
  }
});

export default router;
