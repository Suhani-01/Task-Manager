import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }, // adds createdAt & updatedAt automatically
);

// Create model from schema → used to interact with DB
const User = mongoose.model("User", userSchema);
export default User; //Export model
