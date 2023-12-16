import { tokenServices } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';

const addCover = catchAsync(async (req, res, next) => {
  const userId = tokenServices.getUserIdByToken(req)
  
  res.status(200).send(req.file);
});

export { addCover };