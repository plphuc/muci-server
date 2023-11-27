import mongoose from 'mongoose';
import validator from 'validator';

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  backgroundImg: {},
  description: {
    type: String,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true, 
    
  },
  pageChildren: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Page' }],
  content: {
    type: String,
  },
  isFavPage: {type: Boolean, default: false},
  sharedUser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Page = mongoose.model('Page', pageSchema);
export default Page;
