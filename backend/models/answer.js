const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  studentId: {
    type: String, // or ObjectId if you have user auth
    default: "anonymous",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
