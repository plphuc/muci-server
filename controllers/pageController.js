import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { pageServices, tokenServices } from '../services/index.js';
import ApiError from '../utils/apiError.js';

const getAllPages = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);
  const pages = await pageServices.getAllPages(userId);
  res.status(httpStatus.OK).send({ pages });
});

const getPageById = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);
  const page = await pageServices.getPageById(userId, req.query.pageId);
  res.status(httpStatus.OK).send({ page });
});

const addPage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);
  const { _id: id } = await pageServices.addPage(userId);
  res.status(httpStatus.CREATED).send({ id, acknowledged: true });
});

const updatePage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);
  const updateResult = await pageServices.updatePage(
    userId,
    req.query.pageId,
    req.body
  );
  if (!updateResult.acknowledged) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update failed');
  }
  res.status(httpStatus.OK).send({ acknowledged: true });
});

export { addPage, updatePage, getPageById, getAllPages };
