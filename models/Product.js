import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["burger", "side", "drink"],
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
