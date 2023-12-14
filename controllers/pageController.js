import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { pageServices, tokenServices } from '../services/index.js';

const getAllPages = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const pages = await pageServices.getAllPages(userId)
  res.status(httpStatus.OK).send({pages});
})

const getPageById = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const page = await pageServices.getPageById(userId, req.query.pageId)
  res.status(httpStatus.OK).send(page);
})

const addPage  = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const page = await pageServices.addPage(userId)
  res.status(httpStatus.CREATED).send({page});
})

const updatePage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const page = await pageServices.updatePage(userId, req.body)
  res.status(httpStatus.OK).send({page});
})

export { addPage, updatePage, getPageById, getAllPages };
