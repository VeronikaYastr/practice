(function(exports) {
    var user = null;
    exports.checkUser = function check(username) {
        var isUser = (username !== null);
        user = username;
        if (isUser) {
            document.getElementsByClassName("header-item")[0].innerHTML = "<a href=\"\"><i class=\"fa fa-male fa-3x\" ></i></a>" + "<h1>" + user + "</h1>";
            document.getElementsByClassName("header-left")[0].innerHTML = "<a href=\"\"><i class=\"fa fa-camera-retro fa-2x\" ></i></a>\n" +
                "<a href=\"\"><i class=\"fa fa-sign-in fa-2x\"></i></a>";
        }

    };

    exports.show = function showPhotoPost(post, pos) {
        var isUser = (user === post.author);
        var circleBlock = document.createElement("div");
        circleBlock.className = "result circle-block";

        var resultLeft = document.createElement("div");
        resultLeft.className = "result-left";

        var resultImg = document.createElement("div");
        resultImg.className = "result-img";
        resultImg.innerHTML = "<img src=\"" + post.photoLink + "\" alt=\"\">";

        var resultDescription = document.createElement("div");
        resultDescription.className = "result-description";
        resultDescription.innerHTML = "<p>" + post.description + "</p>";

        var resultRight = document.createElement("div");
        resultRight.className = "result-right";
        resultRight.innerHTML = "<h4>@" + post.author + "</h4>";

        var hashTagsList = document.createElement("ul");
        for (var i = 0; i < post.hashTags.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerHTML = post.hashTags[i];
            hashTagsList.appendChild(listItem);
        }

        var timeListItem = document.createElement("li");
        var dateTime = document.createElement("div");
        dateTime.className = "post-description";
        var timeItem = document.createElement("div");
        timeItem.className = "time";
        timeItem.innerHTML = "<i class=\"fa fa-clock-o\"></i>" +
            "<p>" + getFormatTime(post) + "</p>";
        var dateItem = document.createElement("div");
        dateItem.className = "date";
        dateItem.innerHTML = "<i class=\"fa fa-calendar\"></i>" +
            "<p>" + getFormatDate(post) + "</p>";

        var likes = document.createElement("div");
        likes.className = "post-likes";
        likes.innerHTML = "<p>" + post.likes.length + "</p>" +
            "<i class=\"fa fa-heart\"></i>";

        var trash = document.createElement("div");
        trash.className = "edit";
        trash.innerHTML = "<i class=\"fa fa-edit fa\"></i>" +
            "<i class=\"fa fa-trash-o\"></i>";

        dateTime.appendChild(dateItem);
        dateTime.appendChild(timeItem);
        timeListItem.appendChild(dateTime);
        hashTagsList.appendChild(timeListItem);
        resultRight.appendChild(hashTagsList);
        resultRight.appendChild(likes);

        if (isUser)
            resultRight.appendChild(trash);

        resultLeft.appendChild(resultImg);
        resultLeft.appendChild(resultDescription);
        circleBlock.appendChild(resultLeft);
        circleBlock.appendChild(resultRight);

        photos.insertBefore(circleBlock, photos.children[pos]);
    };

    var search = document.getElementsByClassName("search-results")[0];
    var photos = document.createElement("div");
    photos.className = "photos";
    search.appendChild(photos);

    function getFormatDate(post) {
        var date = post.createdAt;
        var day = date.getDate();
        if (day < 10) day = "0" + day;
        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var year = date.getFullYear();
        return day + "." + month + "." + year;
    }

    function getFormatTime(post) {
        var date = post.createdAt;
        var hours = date.getHours();
        if (hours < 10)
            hours = "0" + hours;
        var minutes = date.getMinutes();
        if (minutes < 10)
            minutes = "0" + minutes;
        return hours + ":" + minutes;
    }


} )(this.functions = {});

function showPosts(skip, top, filterConfig) {
    document.body.getElementsByClassName("photos")[0].innerHTML="";
    var photoPosts = modulePost.getPhotoPosts(skip, top, filterConfig);
    for (var i = 0; i < photoPosts.length; i++)
        functions.show(photoPosts[i], i);
}

function addPost(post) {
    modulePost.addPhotoPost(post);
}

function removePost(id) {
    modulePost.removePhotoPost(id);
}

function editPost(id,post) {
    modulePost.editPhotoPost(id, post);
}

function checkUser(user) {
    functions.checkUser(user);
}
