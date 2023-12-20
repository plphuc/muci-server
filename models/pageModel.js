import mongoose from 'mongoose';
import validator from 'validator';

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
    required: true,
  },
  icon: {
    type: String,
  },
  cover: { type: mongoose.SchemaTypes.ObjectId, ref: 'Photo' },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  pageChildren: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Page' }],
  content: {
    type: String,
  },

  isFavPage: { type: Boolean, default: false },

  sharedUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Page = mongoose.model('Page', pageSchema);
export default Page;
