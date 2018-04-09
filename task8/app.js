const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const data = require("./public/assets/js/Posts.js");




app.use(bodyParser.json());
app.use(express.static('public'), express.static('public'));


app.post('/add', (req, res) => {
  let post = req.body;
  post.createdAt = new Date();
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let allPosts = data.modulePost.addPhotoPost(posts, post);
  if (allPosts !== null) {
    fs.writeFile("server/data/posts.json", JSON.stringify(allPosts), function (error) {
      if (error){
        throw error;
      }

    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.get('/getPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let post = data.modulePost.getPhotoPost( req.params.id, posts);
  if(post){
    res.send(post);
  }
  else{
    res.status(404).end();
  }
});

app.delete('/delPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let allPosts = data.modulePost.removePhotoPost(req.params.id, posts);
  if (allPosts !== null) {
    fs.writeFile("server/data/posts.json", JSON.stringify(allPosts), function (error) {
      if (error) {
        throw error;
      }

    });
    res.status(200).end()
  } else {
    res.status(404).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let post = req.body;

  if ( data.modulePost.editPhotoPost(posts, req.params.id, post)) {
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


app.listen(3000, () => {
  console.log('Server is running...');
});