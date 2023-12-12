import Page from "../models/pageModel.js";
import httpStatus from 'http-status';
import ApiError from "../utils/apiError.js";

const createPage = async (userId, page) => {
  const newPage = new Page({owner: userId, ...page})
  await newPage.save()
  return newPage
}

const getPages = async (userId) => {
  const pages = await Page.find({userId})
  return pages
}

const getPage = async (userId, pageId) => {
  const page = await Page.findOne({userId, pageId})
  if (!page) {
    console.log(page);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Page not found');
  }
  return page;
}

export {getPage, getPages, createPage}