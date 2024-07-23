import express from 'express';

const router = express.Router();

const checkServer = catchAsync(async function (req, res, next) {
  res.status(httpStatus.OK).send({ message: "Everything will be OK" });
});

router.get(
  '',
  checkServer
);

export default router;
