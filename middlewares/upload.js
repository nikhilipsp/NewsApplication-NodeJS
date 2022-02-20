const multer = require("multer");
const fs = require("fs");

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only image file.", false);
  }
};

const path = "./tmp/"
fs.exists(path, exists => {
    console.log(exists ? "The directory already exists" 
                      : fs.mkdirSync(path, { recursive: true }));
                    });
var storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, path);
},
filename: (req, file, cb) => {
cb(null, `${Date.now()}-newsApp-${file.originalname.replace(/\s/g, "")}`);
},
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
