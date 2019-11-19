require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const validator = require('validator');

const models = require('../models');

cloudinary.config({
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
});

const uploadGifs = (imgPath, imgName) => cloudinary.uploader.upload(
  imgPath,
  { public_id: `teamwork/gifs/${imgName}` },
)
  .then(reslt => reslt)
  .catch((e) => { throw e; });

const removeGif = (gifName, gifId) => {
  cloudinary.uploader.destroy(`teamwork/gifs/${gifName}`, (error, result) => {
    if (error) {
      throw error;
    }
  });
  return models.deleteGif(gifId);
};

const saveGif = (userId, gifTitle, fileName, gifUrl) => {
  if (!validator.isLength(gifTitle, { min: 1 })) {
    throw Error('Title field cannot be empty');
  }
  return models.saveGifToDB(userId, gifTitle, fileName, gifUrl);
};

const getGif = (gifId) => {
  if (!validator.isInt(gifId)) {
    throw Error('Invalid Gif');
  }
  return models.getSingleGif(gifId);
};

const saveComment = (userId, gifId, comment) => {
  if (!validator.isInt(gifId)) {
    throw Error('Invalid Gif');
  }
  if (!validator.isLength(comment, { min: 1, max: 255 })) {
    throw Error('Empty comment is not allowed (255 maximun characters)');
  }
  return models.saveGifComment(userId, gifId, comment);
};

const getGifComment = (gifId) => {
  if (!validator.isInt(gifId)) {
    throw Error('Invalid Gif');
  }
  return models.gifComment(gifId);
};

module.exports = {
  uploadGifs,
  removeGif,
  saveGif,
  getGif,
  saveComment,
  getGifComment,
};
