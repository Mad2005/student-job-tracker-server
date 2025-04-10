import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error: ", err));

// Routes
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().sort({ date: -1 });
  res.json(jobs);
});

app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).send(job);
});

app.put("/api/jobs/:id", async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(job);
});

app.delete("/api/jobs/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.send({ message: "Job deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
