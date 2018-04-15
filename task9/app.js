const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const data = require("./public/assets/js/PostsModel.js");

app.use(bodyParser.json());
app.use('/public', express.static('public'));

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

app.get('/getPost/:id', (req, res) => {
  let posts = JSON.parse(fs.readFileSync("server/data/posts.json"));
  let post = data.postsModel.getPhotoPost( req.params.id, posts);
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

  if ( data.postsModel.editPhotoPost(posts, req.params.id, post)) {
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
