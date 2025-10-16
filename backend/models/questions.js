const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
  correctOptionId: String,
});
module.exports = mongoose.model("Question", questionSchema);
