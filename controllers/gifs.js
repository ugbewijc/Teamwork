const fs = require('fs');
const util = require('../util');
const services = require('../services');

const createGif = async (req, res) => {
  try {
    console.log(req.file);
    // TODO: Upload Gifs to Cloudinary
    const img = await services.uploadGifs(req.file.path, req.file.filename);
    // TODO: Remove file from temp location on the server
    await fs.unlinkSync(req.file.path);
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Save GIF details to Database
    const gifDetails = await services.saveGif(userId, req.body.title, img.original_filename, img.secure_url);
    res.json({
      status: 'success',
      data: {
        gifId: gifDetails[0].gif_id,
        message: 'GIF image successfully posted',
        createdOn: gifDetails[0].created_on,
        title: gifDetails[0].title,
        imageUrl: gifDetails[0].gifurl,
      },
    });
  } catch (err) { res.json({ status: 'error', error: err.message }); }
};

const getGif = async (req, res) => {
  try {
    // TODO: Get GIF Details
    const gifDetails = await services.getGif(req.params.gifId);
    // TODO: Get GIF Comment
    const gifComment = await services.getGifComment(req.params.gifId);
    if (gifComment.length <= 0) {
      throw Error('Gif Not Found');
    }
    res.json({
      status: 'success',
      data: {
        id: gifDetails[0].gif_id,
        createdOn: gifDetails[0].created_on,
        title: gifDetails[0].title,
        url: gifDetails[0].gifurl,
        comments: gifComment,
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const deleteGif = async (req, res) => {
  try {
    // TODO: Get GIF Details
    const gifDetails = await services.getGif(req.params.gifId);
    if (gifDetails.length > 0) {
      // TODO: Remove Gif
      await services.removeGif(gifDetails[0].gifname, gifDetails[0].gif_id);
      // throw Error('Gif Not Found');
    }
    res.json({
      status: 'success',
      data: { message: 'gif post successfully deleted' },
    });
  } catch (e) { res.json({ status: 'error', error: e.message }); }
};

const createComment = async (req, res) => {
  try {
    if (!req.body.comment) {
      throw Error('Comment not found');
    }
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Save Comment
    const saveResponse = await services.saveComment(userId, req.params.gifId, req.body.comment);
    const gtGif = await services.getGif(req.params.gifId);
    res.json({
      status: 'success',
      data: {
        message: 'comment successfully created',
        createdOn: saveResponse[0].created_on,
        gifTitle: gtGif[0].title,
        comment: saveResponse[0].comment,
      },
    });
  } catch (e) { res.json({ status: 'error', error: e.message }); }
};

module.exports = {
  createGif,
  getGif,
  deleteGif,
  createComment,
};
