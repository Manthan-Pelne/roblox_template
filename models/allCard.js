import mongoose from "mongoose";
import slugify from "slugify";

const AllCardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    slug: { type: String },
    code: { type: String },
    image: { type: Object },
  },
  { timestamps: true } // ✅ this line fixes the issue
);

// Auto-generate slug before saving
AllCardSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.card || mongoose.model("card", AllCardSchema);