import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [{ type: String }],
  available: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  image_url: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  sqft: { type: Number },
  description: { type: String }
});

// We need to use `models` first to prevent Next.js from recompiling the model multiple times
const Property = mongoose.models.properties || mongoose.model("properties", PropertySchema);

export default Property;