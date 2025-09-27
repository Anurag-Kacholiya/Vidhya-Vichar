import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/questionRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);

app.use("/home",router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})