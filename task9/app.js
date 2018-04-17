const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const data = require("./public/assets/js/PostsModel.js");
const multer  = require('multer');

app.use(bodyParser.json());
app.use('/public', express.static('public'));

let storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, __dirname + '/public/tmp/upload_avatars');
        },
        filename: function(req, file, callback) {
            let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
            callback(null, filename);
        }
    });

let upload = multer({ storage: storage });

app.post('/uploadImage', upload.single('file'), (req, res) => {
   let filename = req.file.filename;
   if(filename !== null){
       res.send(filename);
       res.status(200).end();
   }
   else
       res.status(404).end();
});

app.get('/getLength', (req, res) => {
    let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
    if(posts.length !== 0){
        res.send(JSON.stringify(posts.length));
        res.status(200).end();
    }
    else{
        res.status(404).end();
    }
});

app.post('/addPost', (req, res) => {
    let post = req.body;
    let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
    let allPosts = data.postsModel.addPhotoPost(posts, post);
    if (allPosts !== null) {
        fs.writeFile("server/data/posts.json", JSON.stringify(allPosts), function (error) {
            if (error){
                throw error;
            }

        });
        res.send("true");
        res.status(200).end();
    } else {
        res.send("false");
        res.status(404).end();
    }
});

app.post('/getPosts/:skip&:top', (req, res) =>{
    let allPosts = JSON.parse(fs.readFileSync("server/data/posts.json"));
    let filteredPosts = data.postsModel.getPhotoPosts( allPosts,parseInt(req.params.skip),parseInt(req.params.top), req.body);
    if(filteredPosts !== null){
        res.send(filteredPosts);
    }
    else{
        res.status(404).end();
    }
});

app.post('/likePost/:id&:author', (req, res) =>{
    let allPosts = JSON.parse(fs.readFileSync("server/data/posts.json"));
    let makeLike = data.postsModel.likePost(allPosts, req.params.id, req.params.author);
    fs.writeFile("server/data/posts.json", JSON.stringify(allPosts), function(error){
        if(error){
            throw error;
        }
    });
    res.send(makeLike);
});

app.get('/getPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let post = data.postsModel.getPhotoPost(posts, req.params.id);
  if(post){
    res.send(post);
  }
  else{
    res.status(404).end();
  }
});

app.delete('/delPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  if (data.postsModel.removePhotoPost(req.params.id, posts)) {
    fs.writeFile("server/data/posts.json", JSON.stringify(posts), function (error) {
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
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let post = req.body;
  if (data.postsModel.editPhotoPost(posts, req.params.id, post)) {
    fs.writeFile("server/data/posts.json", JSON.stringify(posts), function (error) {
      if (error) {
        throw error;
      }
    });
      res.send("true");
    res.status(200).end();
  } else {
      res.send("false");
    res.status(404).end();
  }

});

app.use(((req, res) => {
    res.sendFile('error404.html', { root: 'public' });
}));


app.listen(3000, () => {
  console.log('Server is running...');
});
