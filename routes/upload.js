var express = require('express');
var router = express.Router();

let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null, 'upload/');
    },
    filename: function(req,file,callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
})

let upload = multer({
    storage: storage
})

// let upload = multer({
//     dest: "upload/"
// });

router.get('/show', function(req,res,next){
   res.render('uploadTest');
});

router.post('/create', upload.single("imgFile"), function(req,res,next){
   let file = req.file

   let result = {
       originalName : file.originalname,
       size: file.size,
   }

   res.json(result);
});

module.exports = router;