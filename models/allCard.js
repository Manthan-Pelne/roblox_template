import mongoose from 'mongoose';
import slugify from 'slugify';

const AllCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {type: String},
  slug: { type: String },
  code: { type: String },
  url: { type: String },
  downloads : { type : Number },
  fileKey: { type: String },
})

// Auto-generate slug before saving
AllCardSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});


export default mongoose.models.card || mongoose.model('card', AllCardSchema)