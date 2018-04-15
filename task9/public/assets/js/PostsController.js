(function(exports) {
    exports.skip = 0;
    exports.top = 10;
    exports.amount = 0;

    exports.link = 'https://sun9-8.userapi.com/c830208/v830208049/c5a0e/frB0c9aQ9ZI.jpg';
})(this.postsController = {});

function getContent(fragmentId, callback){
    const request = new XMLHttpRequest();

    request.onload = function () {
        callback(request.responseText);
    };

    request.open("GET", fragmentId + ".html");
    request.send(null);
}

//work with pages
function navigate(){
    const fragmentId = location.hash.substr(1);
    getContent(fragmentId, function (content) {
        document.getElementById("cur").innerHTML = content;
        if(fragmentId === "photos"){
            startWork();
        }

        //filling field with hashTags with "#" before new hashTag
        if(fragmentId === "add"){
            document.getElementsByClassName("input-upload-photos")[0].addEventListener("keydown", function () {
                if(event.keyCode === 32 || event.keyCode === 0) {
                    setTimeout(function(){document.forms['addForm']['tags-upload'].value += "#"}, 10);
                }
            });
            document.getElementsByClassName("input-upload-photos")[0].addEventListener("focus", function () {
                if(document.forms['addForm']['tags-upload'].value === "")
                    document.forms['addForm']['tags-upload'].value = "#";
            });
            document.getElementById("cancel").addEventListener("click", function () {
                if(confirm("Do you want to leave this page?")) {
                    location.hash = "#photos";
                    navigate();
                }
            });
            if(localStorage.getItem("editing") !== null)
                document.getElementsByClassName("add-page-title")[0].children[0].innerHTML = "Edit photo";
           // setPhoto(postsController.link);
        }
    });
}


navigate();
if(!location.hash) {
    location.hash = "#photos";
}

window.addEventListener("hashchange", navigate);

//loading start posts
function startWork() {
    let user = localStorage.getItem("user");
    checkUser(user);

    if(user !== null) {
        menu(document.getElementsByClassName("photos")[0]);
        document.getElementById("logout").addEventListener("click", logout);
    }
    else {
        document.getElementById("login").addEventListener("click", function () {
            location.hash = "#login";
            navigate();
        });
        localStorage.setItem("skip", JSON.stringify(0));
        localStorage.setItem("top", JSON.stringify(10));
        localStorage.setItem("filters",'{"author":"", "date":"", "hashTags":[]}');
    }

   let skip = parseInt(localStorage.getItem("skip"));
   let top = parseInt(localStorage.getItem("top"));
   let filters = localStorage.getItem("filters");

   if(filters !== undefined && filters !== null) {
       let fields = JSON.parse(filters);
       if (fields.author !== "")
           document.forms['filter']['name'].value = fields.author;
       if (fields.date !== "")
           document.forms['filter']['date'].value = fields.date;
       if (fields.hashTags !== "")
           document.forms['filter']['hashTags'].value = fields.hashTags;
   }

   loadServerPosts(false, skip, top, filters);
}

function logout() {
    localStorage.removeItem("user");
    checkUser(localStorage.getItem("user"));
    location.hash = "#photos";
    navigate();
}

function loginSubmit() {
    let username = document.forms['login']['user'].value;
    localStorage.setItem("user", username);
    location.hash = "#photos";
    navigate();
}

function loadServerPosts(isButton, skip, top, filters) {
    skip = skip || 0;
    top = top || 10;
    localStorage.setItem("skip", skip);
    localStorage.setItem("top", top);
    filters = filters || '{"author":"", "date":"", "hashTags":[]}';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/getPosts/" + skip + "&" + top, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            return showPosts(JSON.parse(xhr.responseText), isButton);
        }
    };

    xhr.send(filters);
}

function getServerPost(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/getPost/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            return JSON.parse(xhr.responseText);
        }
    };

}

function editServerPost(id, post) {
    
}

//load with button
function loadPosts() {
    let skip = parseInt(localStorage.getItem("skip"));
    if(skip !== undefined && skip !== null)
        skip += 10;
    let top = parseInt(localStorage.getItem("top"));
    if(top !== undefined && top !== null)
        top += 10;

    postsController.skip = skip;
    postsController.top = top;
    localStorage.setItem("skip", JSON.stringify(skip));
    localStorage.setItem("top", JSON.stringify(top));

    loadServerPosts(true, skip, top, localStorage.getItem("filters"));
}


function filterForm() {
    let date = document.forms['filter']['date'].value;
    let author = document.forms['filter']['name'].value;
    let hashs = document.forms['filter']['hashTags'].value.split(" ");
    let filters = '{"author": "' + author + '", "date": "' + date + '", "hashTags": ' + JSON.stringify(hashs) + '}';
    loadServerPosts(false,0, 10, filters);

    localStorage.setItem("filters", filters);
}


function addPost() {
    let user = localStorage.getItem("user");
    let editPost = JSON.parse(localStorage.getItem("editing"));
    let isEditing = false;
    if(editPost !== null)
        isEditing = true;

    let descr = document.forms['addForm']['description-upload'].value;
    let tags = document.forms['addForm']['tags-upload'].value.split(" ");

    let post = {};
    if(isEditing){
        post = editPost;
        if(descr !== "")
            post.description = descr;
        if(!tags.every(item => item === ""))
            post.hashTags = tags;

        if(!postsModel.editPhotoPost(JSON.parse(localStorage.getItem("StartPosts")),post.id, post, "StartPosts"))
        {
            alert('Some fields are incorrectly filled!');
        }
        else {
            postsModel.editPhotoPost(JSON.parse(localStorage.getItem("AllPosts")),post.id, post, "AllPosts");
            localStorage.removeItem("editing");
            location.hash = "#photos";
            navigate();
        }
    }
    else {
        post.id = (parseInt(localStorage.getItem("id")) + 1) + "";
        localStorage.setItem("id", post.id);
        post.author = user;
        post.createdAt = new Date(Date.now());
        post.description = descr;
        post.hashTags = tags;
        post.likes = [];

        //default link
        postsController.link = 'https://sun9-8.userapi.com/c830208/v830208049/c5a0e/frB0c9aQ9ZI.jpg';
        post.photoLink = postsController.link;

        if (!postsModel.addPhotoPost(JSON.parse(localStorage.getItem("StartPosts")), post, "StartPosts")) {
            alert('Some fields are not filled!');
        }
        else {
            postsModel.addPhotoPost(JSON.parse(localStorage.getItem("AllPosts")), post, "AllPosts");
            location.hash = "#photos";
            navigate();
        }
    }
}

function setPhoto(link) {
    document.getElementById("edit-photo-load").innerHTML = "<img src = \"" + link + "\">";
}

//likes
function makeLike(elem, id, author) {
    let post = getServerPost(id);
    let likes = elem.parentNode;
    let index = post.likes.indexOf(author);
    let icon = "";

    if (index === -1) {
        post.likes.push(author);
        icon = "fa fa-heart";
    }
    else {
        post.likes.splice(index, 1);
        icon = "fa fa-heart-o";
    }

    postsModel.editPhotoPost(savedPosts, id, post);

    likes.firstChild.innerHTML = post.likes.length;
    likes.children[1].className = icon;
    sizeLike(likes.children[1], index);
}

function sizeLike(like, isOn) {
    if (isOn === -1)
        like.style.fontSize = 25 + 'px';
    else
        like.style.fontSize = 15 + 'px';

    setTimeout(function () {
        like.style.fontSize = 20 + 'px';
    }, 400);
}

//events : delete, like and edit
function menu(elem) {
    let savedPosts = JSON.parse(localStorage.getItem("StartPosts"));

    elem.addEventListener("click", function (e) {
        let target = e.target || e.srcElement;
        let id = target.getAttribute('id');

        if (id.startsWith("like"))
            makeLike(target, id.replace('like', ''), localStorage.getItem("user"));
        if (id.startsWith("delete"))
            removePost(target, savedPosts, id.replace('delete', ''));
        if(id.startsWith("edit"))
        {
            let post = JSON.parse(localStorage.getItem("StartPosts")).find(post => post.id === id.replace('edit', ''));
            localStorage.setItem("editing", JSON.stringify(post));
            postsController.link = post.photoLink;
            location.hash = "#add";
            navigate();
        }
    });
}



