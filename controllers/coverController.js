import catchAsync from '../utils/catchAsync.js';

const addCover = catchAsync(async (req, res, next) => {
  res.status(200).send(req.file);
});

export { addCover };