import mongoose from 'mongoose';
import validator from 'validator';

const pageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  backgroundImg: {},
  comment: {
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  childrenPages: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Page' }],
});

const Page = mongoose.model('Page', pageSchema);
export default Page;
