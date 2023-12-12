import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { pageServices, tokenServices } from '../services/index.js';

const createPage  = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const page = await pageServices.createPage(userId, req.body)
  return page
})

const savePage = (req, res) => {
  res.status(httpStatus.OK).send({ message: 'Page saved' });
};

const getPages = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const pages = await pageServices.getPages(userId)
  console.log(pages);
  return pages
})

const getPage = catchAsync(async (req, res) => {
  const userId = tokenServices.getUserIdByToken(req)
  const page = await pageServices.getPage(userId, req.body.pageId)
  return page
})

export { savePage, getPage, getPages, createPage };
