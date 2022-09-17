// const multer = require('multer');
// const path = require('path');

// module.exports = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, __basedir + '/uploads')
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//         }
//     }),

//     const csvFilter = (req, file, cb) => {
//         if (file.mimetype.includes("csv")) {
//             cb(null, true);
//         } else {
//             cb("Please upload only csv file", false)
//         }
//     };


// });