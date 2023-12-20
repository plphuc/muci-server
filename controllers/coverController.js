import {
  coverServices,
  fileServices,
} from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import { addCoverWrapper, removeCoverWrapper } from '../services/coverServices.js';
import { assignUserId } from './userController.js';
import { db } from '../index.js';
import { Types } from 'mongoose';

const getCover = catchAsync(async (req, res, next) => {
  const cover = await db.collection('photos.files').findOne({
    'metadata.pageId': req.query.pageId,
    _id: new Types.ObjectId(req.query.coverId),
  });
  console.log(cover);
  if (!cover) {
    return res.status(404).send({ message: 'Cannot find the image!' });
  }

  res.set('Content-Type', cover.contentType);

  const downloadStream = await fileServices.downloadPhoto(cover._id);
  downloadStream.pipe(res);
  downloadStream.on('data', function (data) {
    return res.status(200);
  });

  downloadStream.on('error', function (err) {
    return res.status(404).send({ message: 'Cannot download the image!' });
  });

  downloadStream.on('end', () => {
    return res.end();
  });
});

const addCover = catchAsync(async (req, res, next) => {
  assignUserId(req);
  const updatedCoverId = await addCoverWrapper(req, res);
  res.status(200).send({ updatedCoverId, acknowledged: true });
});

const removeCover = catchAsync(async (req, res, next) => {
  assignUserId(req);
  await removeCoverWrapper(req, res);
  res.status(200).send({ acknowledged: true });
});

export { addCover, getCover, removeCover };
