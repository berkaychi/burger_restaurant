import mongoose from "mongoose";

const BurgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Burger || mongoose.model("Burger", BurgerSchema);
