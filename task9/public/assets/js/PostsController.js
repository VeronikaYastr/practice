(function(exports) {
    exports.skip = 0;
    exports.top = 10;
    exports.post = null;

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
            localStorage.removeItem("editPost");
            localStorage.removeItem("addPost");
            localStorage.removeItem("editing");
            startWork();
        }

        //filling field with hashTags with "#" before new hashTag
        if(fragmentId === "add"){
            dropPhoto();
            let user = localStorage.getItem("user");
            checkUser(user);

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

            if(localStorage.getItem("addPost") !== null)
                addPost();

            if(localStorage.getItem("editing") !== null) {
                document.getElementsByClassName("add-page-title")[0].children[0].innerHTML = "Edit photo";
                if(localStorage.getItem("editPost") !== null)
                    editPost();
            }
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
    if(localStorage.getItem("id") === null)
        getServerLength();

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

   let skip = 0;
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

//load files from computer
function clickEvent() {
    const fileElem = document.getElementById("fileElem");
    if (fileElem) {
        fileElem.click();
    }
}

function loadFiles(files) {
    loadImage(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
        setLink(reader.result);
    };
}

function loadImage(post) {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('file', post);

    xhr.open("POST", "/uploadImage");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            postsController.photoLink = 'tmp/upload_avatars/' + xhr.responseText;
            return true;
        }
    };

    xhr.send(formData);
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

function getServerLength() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/getLength", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            localStorage.setItem("id", xhr.responseText);
            return true;
        }
    };
    xhr.send();
}

function getServerPost(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/getPost/" + parseInt(id), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            let post = JSON.parse(xhr.responseText);
            localStorage.setItem("editPost", JSON.stringify(post.photoLink + "," + post.description + "," + post.hashTags));
            location.hash = "#add";
            navigate();
            return true;
        }
    };

    xhr.send();
}

function editServerPost(id, post) {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "/editPost/" + parseInt(id), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            if(xhr.responseText === "false") {
                alert('Some fields are incorrectly filled!');
                location.hash = "#add";
                navigate();
            }
            else {
                localStorage.removeItem("editing");
            }
            return true;
        }
    };

    xhr.send(JSON.stringify(post));
}

function addServerPost(post) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/addPost", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
            alert('Error! Can\'t post this photo :(');
        }
        else {
            if(xhr.responseText === "false") {
                alert('Some fields are incorrectly filled!');
                location.hash = "#add";
                navigate();
            }
            else
                localStorage.removeItem("addPost");
            return true;
        }
    };

    xhr.send(JSON.stringify(post));
}

function deleteServerPost(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/delPost/" + parseInt(id), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            loadServerPosts(false,0, localStorage.getItem("top"),  localStorage.getItem("filters"));
            return true;
        }
    };

    xhr.send();
}

function likeServerPost(id, author, elem) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/likePost/" + parseInt(id) + '&' + author, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            let icon = "";
            let index = 0;
            let likes = elem.parentNode;
            let length = parseInt(likes.firstChild.innerHTML);

            if(xhr.responseText === "true")
            {
                icon = "fa fa-heart";
                index = -1;
                length += 1;
            }
            else {
                icon = "fa fa-heart-o";
                length -= 1;
            }

            likes.firstChild.innerHTML = length;
            likes.children[1].className = icon;
            sizeLike(likes.children[1], index);
        }
    };

    xhr.send();
}

//load with button
function loadButtonPosts() {
    let skip = parseInt(localStorage.getItem("skip"));
    let top = parseInt(localStorage.getItem("top"));

    if(skip !== undefined && skip !== null)
        skip = top;
    if(top !== undefined && top !== null)
        top += 10;

    postsController.skip = skip;
    postsController.top = top;
    localStorage.setItem("skip", JSON.stringify(skip));
    localStorage.setItem("top", JSON.stringify(top));

    loadServerPosts(true, skip, top, localStorage.getItem("filters"));
}


//filters
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
    let editPostId = JSON.parse(localStorage.getItem("editing"));
    let isEditing = false;
    if(editPostId !== null)
        isEditing = true;

    let descr = document.forms['addForm']['description-upload'].value;
    let tags = document.forms['addForm']['tags-upload'].value.split(" ");

    let post = {description: "", hashTags : []};
    if(isEditing){
        if(descr !== "")
            post.description = descr;
        if(!tags.every(item => item === ""))
            post.hashTags = tags;
        editServerPost(editPostId, post);
    }
    else {
        post = {};
        post.id = (parseInt(localStorage.getItem("id")) + 1) + "";
        localStorage.setItem("id", post.id);
        post.author = user;
        post.createdAt = new Date(Date.now());
        post.description = descr;
        post.hashTags = tags;
        post.likes = [];

        post.photoLink = postsController.photoLink;
        post.isDeleted = 'false';

        addServerPost(post);
    }
    location.hash = "#photos";
    navigate();
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

    elem.addEventListener("click", function (e) {
        let target = e.target || e.srcElement;
        let id = target.getAttribute('id');

        if (id.startsWith("like"))
            likeServerPost(id.replace('like', ''), localStorage.getItem("user"), target);
        if (id.startsWith("delete")) {
            if(confirm("Do you want to delete this post?")){
                deleteServerPost(id.replace('delete', ''));
                removePost(target);
            }
        }
        if(id.startsWith("edit"))
        {
            localStorage.setItem("editing",id.replace('edit', '') );
            getServerPost(id.replace('edit', ''));
        }
    });
}



