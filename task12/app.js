const express = require('express');

const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const data = require('./public/assets/js/PostsModel.js');
const multer = require('multer');

const session = require('express-session');
const mongoose = require('mongoose');
const Post = require('./server/model/postModel');
const passport = require('./server/passport/index');

const url = 'mongodb://localhost:27017/posts';

mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, __dirname + '/public/tmp/upload_avatars');
  },
  filename(req, file, callback) {
    const filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    callback(null, filename);
  }
});

const upload = multer({ storage });

app.post('/uploadImage', upload.single('file'), (req, res) => {
  const name = req.file.filename;
  if (name !== null) {
    res.send(name);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user.username);
});

app.put('/logout', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(404).end();
  }
  req.session.destroy();
  res.status(200).end();
});

app.post('/addPost', (req, res) => {
  const post = new Post({
    description: req.body.description,
    author: req.body.author,
    photoLink: req.body.photoLink,
    createdAt: Date.now(),
    deleted: false,
    hashTags: req.body.hashTags,
    likes: []
  });
  post.save((err) => {
    if (err) {
      res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

app.post('/getPosts/:skip&:top', (req, res) => {
  const skip = parseInt(req.params.skip, 10);
  const top = parseInt(req.params.top, 10);
  if (req.body.hashTags !== undefined && req.body.hashTags.length !== 0){
    req.body.hashTags = { '$in': req.body.hashTags };
  }
  Post.find(req.body, (err, docs) => {
    if (err) {
      res.status(404).end();
    } else {
      console.log(docs);
      res.send(JSON.stringify(docs.slice(skip, skip + top)));
    }
  });
});

app.post('/likePost/:id&:author', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(404).end();
  }
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).end();
    } else {
      let isLiked = false;
      const index = post.likes.indexOf(req.params.user);
      if (index > -1) {
        post.likes.splice(index, 1);
        isLiked = false;
      } else {
        post.likes.push(req.params.user);
        isLiked = true;
      }
      post.save((err1, updatedPost) => {
        if (err1) {
          res.status(404).end();
        } else {
          res.send(isLiked);
        }
      });
    }
  });
});

app.get('/getLength', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  if (posts.length !== 0) {
    res.send(JSON.stringify(posts.length));
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.get('/getPost/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(post);
    }
  });
});

app.delete('/delPost/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(404).end();
  }
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).end();
    } else {
      post.deleted = true;
      post.save((err1, updatedPost) => {
        if (err1) {
          res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
    }
  });
});

app.put('/editPost/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(404).end();
  }
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).end();
    } else {
      post.hashTags = req.body.hashTags;
      post.description = req.body.description;
      post.save((err1, updatedPost) => {
        if (err1) {
          res.send('false');
        } else {
          res.send('true');
        }
      });
    }
  });
});

app.use(((req, res) => {
  res.sendFile('error404.html', { root: 'public' });
}));


app.listen(3000, () => {
  console.log('Server is running...');
});
