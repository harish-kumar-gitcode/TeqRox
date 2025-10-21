require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Question = require("./models/questions");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Upload Questions
app.post("/api/upload", async (req, res) => {
  try {
    const { questions } = req.body;
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid input format" });
    }
    await Question.insertMany(questions);
    res.status(201).json({ message: "Questions uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading questions:", error);
    res.status(500).json({ error: "Server error while uploading questions" });
  }
});

// Fetch Questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Error fetching questions" });
  }
});

const Answer = require("./models/answer");

// Receive and store answers
app.post("/api/answers", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    const questions = await Question.find(); // fetch all to map correctly

    // Build answer documents
    const answerDocs = Object.entries(answers).map(
      ([key, selectedOption], i) => {
        const q = questions[i]; // simple mapping assuming order matches
        return {
          questionId: q?._id,
          questionText: q?.questionText,
          selectedOption,
          studentId: "anonymous", // replace with logged-in user ID if available
        };
      }
    );

    await Answer.insertMany(answerDocs);
    console.log("✅ Answers saved to DB");

    res.status(201).json({ message: "Answers stored successfully" });
  } catch (err) {
    console.error("Error saving answers:", err);
    res.status(500).json({ error: "Server error while saving answers" });
  }
});

//Login page route.
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (replace with real logic)
  if (username === "sowmyashree@teqrox.in" && password === "Sowmya@123") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
