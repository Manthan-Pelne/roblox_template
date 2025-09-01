import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  slug: { type: String },
  code: { type: String },
  url: { type: String }
});

 const Card = mongoose.model('card', cardSchema);

 export default Card