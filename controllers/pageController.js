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
  const page = await pageServices.getPageById(req.query.pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  res.status(httpStatus.OK).send({ page });
});

const addPage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);

  const { _id: id } = await pageServices.addPage(userId);
  res.status(httpStatus.CREATED).send({ id, acknowledged: true });
});

const updatePage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);

  if (!Page.isOwner(req.query.pageId, userId)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
  }

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

const deletePage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req);

  if (!Page.isOwner(req.query.pageId, userId)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
  }

  const deleteResult = await pageServices.deletePage(userId, req.query.pageId);
  if (!deleteResult.acknowledged) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete failed');
  }
  res.status(httpStatus.OK).send({ acknowledged: true });
});

export { addPage, updatePage, deletePage, getPageById, getAllPages };
