let express = require('express');
let path = require('path');
let crypto = require('crypto');
let mongoose = require('mongoose');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let methodOverride = require('method-override');
let bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Mongo URI
let mongoURI = 'mongodb://aakashvarma:varma123@ds145304.mlab.com:45304/kyledb'

// Create Mongo connection
let conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });


// @routes GET /
// @desc Loads form
app.get('/', (req, res) => {
    res.render('index');
});

// @routes POST /upload
// @desc Uploads files to DB
app.post('/upload', upload.single('file'), (req, res) => {     // name in the index.ejs is name="file"
    // res.json({file: req.file});
    res.redirect('/');
});

let port = 5000;

app.listen(port, () => console.log(`Listening to: ${port}`));































