import express from "express";
import Question from "../models/questionModel.js";
import authMiddleware from "./authRoutes.js";
import Meeting from "../models/meetingModel.js";

const router = express.Router();

//Create a new question
router.post("/meetings/:meetingId/questions/create", authMiddleware, async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { text, author } = req.body;

    if (!text || !author) {
      return res.status(400).json({ message: "Text and author are required" });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const newQuestion = new Question({
      meeting: meetingId,
      text,
      author,
      role: "student",
      status: "unanswered",
    });

    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error posting question", error: error.message });
  }
});

// Fetch all questions (with optional filters)
router.get("/meetings/:meetingId/questions", authMiddleware, async (req, res) => {
  try {
    const { meetingId } = req.params;

    const questions = await Question.find({ meeting: meetingId }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
});

// Update question status (answered/important/unanswered)
router.put("/meetings/:meetingId/questions/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: req.params.id, meeting: req.params.meetingId },
      { status },
      { new: true }
    );

    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found for this meeting" });

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
});


// Delete a single question for a specific meeting
router.delete("/meetings/:meetingId/questions/delete/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Question.findOneAndDelete({
      _id: req.params.id,
      meeting: req.params.meetingId,
    });

    if (!deleted)
      return res.status(404).json({ message: "Question not found for this meeting" });

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
});

//Clear all questions (faculty can use at end of lecture)
router.delete("/meetings/:meetingId/questions/delete", authMiddleware, async (req, res) => {
  try {
    await Question.deleteMany({ meeting: req.params.meetingId });
    res.json({ message: "All questions cleared for this meeting" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing questions", error: error.message });
  }
});


// Create a meeting
router.post("/meetings/create", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const meeting = await Meeting.create({
      title,
      description
    });

    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Error creating meeting" });
  }
});

// Fetch all meetings
router.get("/meetings/fetch", async (req, res) => {
  try {
    const { status } = req.query; // optional filter
    const filter = status ? { status } : {};
    const meetings = await Meeting.find(filter);
    res.json(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

router.put("/meetings/end/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: "ended" },
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.json(meeting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error ending the meeting" });
  }
});

export default router;
