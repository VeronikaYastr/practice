const express = require('express');

const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const data = require('./public/assets/js/PostsModel.js');
const multer = require('multer');

app.use(bodyParser.json());
app.use('/public', express.static('public'));

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

app.post('/addPost', (req, res) => {
  const post = req.body;
  const posts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  const allPosts = data.postsModel.addPhotoPost(posts, post);
  if (allPosts !== null) {
    fs.writeFile('server/data/posts.json', JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.send('true');
    res.status(200).end();
  } else {
    res.send('false');
    res.status(404).end();
  }
});

app.post('/getPosts/:skip&:top', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  const skip = parseInt(req.params.skip, 10);
  const top = parseInt(req.params.top, 10);
  const filteredPosts = data.postsModel.getPhotoPosts(allPosts, skip, top, req.body);
  if (filteredPosts !== null) {
    res.send(filteredPosts);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/likePost/:id&:author', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  const makeLike = data.postsModel.likePost(allPosts, req.params.id, req.params.author);
  fs.writeFile('server/data/posts.json', JSON.stringify(allPosts), (error) => {
    if (error) {
      throw error;
    }
  });
  res.send(makeLike);
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
  const posts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  const post = data.postsModel.getPhotoPost(posts, req.params.id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).end();
  }
});

app.delete('/delPost/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  if (data.postsModel.removePhotoPost(req.params.id, posts)) {
    fs.writeFile('server/data/posts.json', JSON.stringify(posts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('server/data/posts.json'));
  const post = req.body;
  if (data.postsModel.editPhotoPost(posts, req.params.id, post)) {
    fs.writeFile('server/data/posts.json', JSON.stringify(posts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.send('true');
    res.status(200).end();
  } else {
    res.send('false');
    res.status(404).end();
  }
});

app.use(((req, res) => {
  res.sendFile('error404.html', { root: 'public' });
}));


app.listen(3000, () => {
  console.log('Server is running...');
});
