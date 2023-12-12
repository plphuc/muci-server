import catchAsync from '../utils/catchAsync.js';

const saveCover = catchAsync(async (req, res, next) => {
  res.status(200).send(req.file);
});

export { saveCover };