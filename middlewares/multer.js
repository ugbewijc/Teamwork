const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });
const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tmp_uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}`);
  },
});

const imgExtFilter = (req, file, cb) => {
  // accept Gif image only
  if (!file.mimetype === 'image/gif') {
    return cb(new Error('Only Gif image are accepted!'), false);
  }
  return cb(null, true);
};

const uploadM = multer({ storage: multerStorage, fileFilter: imgExtFilter });


module.exports = {
  uploadM,
};
