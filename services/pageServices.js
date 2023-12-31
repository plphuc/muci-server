import Page from '../models/pageModel.js';
import httpStatus from 'http-status';
import ApiError from '../utils/apiError.js';
import formattedPageObject from '../views/formattedPageObject.js';
import { Types } from 'mongoose';
import { db } from '../index.js';

const getAllPages = async (userId) => {
  try {
    const pages = await Page.find({ owner: userId });
    if (!pages.length) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const formattedPages = pages.map((page) => {
      return formattedPageObject(page);
    });
    return formattedPages;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const getPageById = async ( pageId) => {
  try {
    const page = await Page.findOne({ _id: pageId });
    if (!page) {
      return null;
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
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return page;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const updatePage = async (userId, pageId, contentUpdate) => {
  try {
    const pageToUpdate = await Page.updateOne(
      { owner: new Types.ObjectId(userId), _id: new Types.ObjectId(pageId) },
      {
        $set: {...contentUpdate},
      }
    );
    return pageToUpdate;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const deletePage = async (userId, pageId) => {
  try {
    const pageToDelete = await Page.deleteOne({
      owner: new Types.ObjectId(userId),
      _id: new Types.ObjectId(pageId),
    });
    return pageToDelete;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
}
export { getPageById, getAllPages, addPage, updatePage, deletePage };
