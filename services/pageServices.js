import Page from '../models/pageModel.js';
import httpStatus from 'http-status';
import ApiError from '../utils/apiError.js';
import formattedPageObject from '../views/formattedPageObject.js';
import { Types } from 'mongoose';
import { db } from '../index.js';

const getTitleAllPages = async (userId) => {
  try {
    const pages = await Page.find({ owner: userId }, { title: 1, icon: 1 });
    if (!pages.length) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const formattedTitlePages = pages.map((page) => {
      return formattedPageObject(page);
    });
    return formattedTitlePages;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const getPageById = async (pageId) => {
  try {
    const page = await Page.findOne({ _id: pageId });
    if (!page) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
    }
    return formattedPageObject(page);
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

const addPage = async (userId, parentPageId) => {
  let session = null;
  try {
    session = await db.startSession();
    session.startTransaction();

    if (parentPageId) {
      const page = await Page.findOne({ _id: parentPageId });
      const pageLevel = page.level + 1;

      if (pageLevel > 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Page level is too deep');
      }

      const newPage = await Page.create({ owner: userId, level: pageLevel, parent: parentPageId });
      const updateParentResult = await updatePage(userId, parentPageId, { $push: { pageChildren: newPage._id } })

      if (!updateParentResult.acknowledged) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Update parent failed');
      }
      await session.commitTransaction();
      return newPage;
    }
    
    const page = await Page.create({ owner: userId, level: 0 });
    await session.commitTransaction();
    return page;
  } catch (err) {
    await session.abortTransaction();
    throw new ApiError(err.statusCode, err.message);
  } finally {
    session?.endSession();
  }
};

const updatePage = async (userId, pageId, contentUpdate) => {
  try {
    const pageToUpdate = await Page.updateOne(
      { owner: new Types.ObjectId(userId), _id: new Types.ObjectId(pageId) },
      contentUpdate
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
};
export { getPageById, getTitleAllPages, addPage, updatePage, deletePage };
