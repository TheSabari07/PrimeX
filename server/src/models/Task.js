import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  tags: [String],
  deadline: Date,
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
