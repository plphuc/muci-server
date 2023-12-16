import Page from '../models/pageModel.js';
import httpStatus from 'http-status';
import ApiError from '../utils/apiError.js';
import formattedPageObject from '../views/formattedPageObject.js';

const getAllPages = async (userId) => {
  try {
    const pages = await Page.find({ owner: userId });
    if (!pages.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }

    const formattedPages = pages.map((page) => {
      return formattedPageObject(page);
    });
    return formattedPages;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const getPageById = async (userId, pageId) => {
  try {
    const page = await Page.findOne({ owner: userId, _id: pageId });
    if (!page) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Page not found');
    }
    return formattedPageObject(page);
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const addPage = async (userId) => {
  try {
    const page = await Page.create({ owner: userId });
    if (!page) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    return page;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const updatePage = async (userId, pageId, contentUpdate) => {
  try {
    const pageToUpdate = await Page.updateOne(
      { owner: userId, _id: pageId },
      contentUpdate
    );
    console.log(contentUpdate);
    console.log("pageToUpdate", pageToUpdate);
    if (!pageToUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Page not found');
    }
    return pageToUpdate;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};
export { getPageById, getAllPages, addPage, updatePage };
