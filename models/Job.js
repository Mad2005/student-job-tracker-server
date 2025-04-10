import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date: String,
  link: String
});

export default mongoose.model("Job", jobSchema);
