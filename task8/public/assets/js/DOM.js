(function(exports) {
    let user = null;
    exports.checkUser = function check(username) {
        let isUser = (username !== null);
        user = username;
        if (isUser) {
            document.getElementsByClassName("header-item")[0].innerHTML = "<a href=\"#photos\"><i class=\"fa fa-male fa-3x\" ></i></a>" + "<h1>" + user + "</h1>";
            document.getElementsByClassName("header-left")[0].innerHTML = "<a href=\"#add\"><i class=\"fa fa-camera-retro fa-2x\" ></i></a>\n" +
                "<a href=\"#photos\"><i id=\"logout\" class=\"fa fa-sign-out fa-2x\"></i></a>";
        }
        else {
            document.getElementsByClassName("header-item")[0].innerHTML = "";
            document.getElementsByClassName("header-left")[0].innerHTML = "" +
                "<a href=\"#login\"><i id=\"login\" class=\"fa fa-sign-in fa-2x\"></i></a>";
        }

        return user;
    };

    exports.show = function showPhotoPost(post, pos) {
        let photos = document.getElementsByClassName("photos")[0];
        let isUser = (user === post.author);
        let circleBlock = document.createElement("div");
        circleBlock.className = "result circle-block";

        let resultLeft = document.createElement("div");
        resultLeft.className = "result-left";

        let resultImg = document.createElement("div");
        resultImg.className = "result-img";
        resultImg.innerHTML = "<img src=\"" + post.photoLink + "\" alt=\"\">";

        let resultDescription = document.createElement("div");
        resultDescription.className = "result-description";
        resultDescription.innerHTML = "<p>" + post.description + "</p>";

        let resultRight = document.createElement("div");
        resultRight.className = "result-right";
        resultRight.innerHTML = "<h4>@" + post.author + "</h4>";

        let hashTagsList = document.createElement("ul");
        for (let i = 0; i < post.hashTags.length; i++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = post.hashTags[i];
            hashTagsList.appendChild(listItem);
        }

        let timeListItem = document.createElement("li");
        let dateTime = document.createElement("div");
        dateTime.className = "post-description";
        let timeItem = document.createElement("div");
        timeItem.className = "time";
        timeItem.innerHTML = "<i class=\"fa fa-clock-o\"></i>" +
            "<p>" + getFormatTime(post) + "</p>";
        let dateItem = document.createElement("div");
        dateItem.className = "date";
        dateItem.innerHTML = "<i class=\"fa fa-calendar\"></i>" +
            "<p>" + getFormatDate(post) + "</p>";

        let likes = document.createElement("div");
        likes.className = "post-likes";
        let index = post.likes.indexOf("Veronika");
        let icon = "";
        if (index === -1)
            icon = "fa fa-heart-o";
        else
            icon = "fa fa-heart";
        likes.innerHTML = "<p>" + post.likes.length + "</p>" + "<i class=\"" + icon + "\" id = \"like" + post.id + "\"></i>";

        dateTime.appendChild(dateItem);
        dateTime.appendChild(timeItem);
        timeListItem.appendChild(dateTime);
        hashTagsList.appendChild(timeListItem);
        resultRight.appendChild(hashTagsList);
        resultRight.appendChild(likes);

        if (isUser) {
            let trash = document.createElement("div");
            trash.className = "edit";
            trash.innerHTML = "<i class=\"fa fa-edit fa\" id = \"edit" + post.id + "\"></i>" +
                "<i class=\"fa fa-trash-o\" id = \"delete" + post.id + "\"></i>";
            resultRight.appendChild(trash);
        }

        resultLeft.appendChild(resultImg);
        resultLeft.appendChild(resultDescription);
        circleBlock.appendChild(resultLeft);
        circleBlock.appendChild(resultRight);

        photos.insertBefore(circleBlock, photos.children[pos]);
    };

    function getFormatDate(post) {
        let date = new Date(post.createdAt);
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = date.getFullYear();
        return day + "." + month + "." + year;
    }

    function getFormatTime(post) {
        let date = new Date(post.createdAt);
        let hours = date.getHours();
        if (hours < 10)
            hours = "0" + hours;
        let minutes = date.getMinutes();
        if (minutes < 10)
            minutes = "0" + minutes;
        return hours + ":" + minutes;
    }


} )(this.functions = {});

function showPosts(skip, top, name) {
    let photoPosts = [];
    localStorage.removeItem("editing");
    document.getElementsByClassName("photos")[0].innerHTML = "";
    let filterPosts = JSON.parse(localStorage.getItem("foundPosts"));
    let notFound = document.getElementsByTagName("h3")[0];
    notFound.innerHTML = "";

    let loadButton = document.getElementById("load");
    if (modulePost.amount > 0) {
        loadButton.addEventListener("click", loadPosts);
        loadButton.style.display = 'block';
    }
    else
        loadButton.style.display = 'none';

    if(filterPosts !== null){
        name = "foundPosts";
        let filters = JSON.parse(localStorage.getItem("filters")).split(",");
        if(filters.filter(item => item === "").length === 3 && modulePost.amount > 0)
        {
            name = "StartPosts";
            localStorage.removeItem("foundPosts");
            loadButton.style.display = 'block';
        }
        else {
            loadButton.style.display = 'none';
            document.forms['filter']['date'].value = filters[0];
            document.forms['filter']['name'].value = filters[1];
            document.forms['filter']['hashTags'].value = filters[2];

            if(filterPosts.length === 0)
                notFound.innerHTML = "Sorry, no matches found...";
        }
    }

    if(skip === 0) {
        photoPosts = JSON.parse(localStorage.getItem(name));
    }
    else {
        let allPosts = JSON.parse(localStorage.getItem("AllPosts"));
        let newPhotoPosts = modulePost.getPhotoPosts(allPosts, skip, top);
        photoPosts = JSON.parse(localStorage.getItem(name)).concat(newPhotoPosts);
        localStorage.setItem(name, JSON.stringify(photoPosts));
        modulePost.amount -= newPhotoPosts.length;
    }
    events.skip = photoPosts.length;
    for (let i = 0; i < photoPosts.length; i++)
        functions.show(photoPosts[i], ++skip);

}

function addPost(post) {
    modulePost.addPhotoPost(post);
}

function removePost(elem, array, id) {
    if(confirm("Do you want to delete this post?")) {
        modulePost.removePhotoPost(id, JSON.parse(localStorage.getItem("AllPosts")), "AllPosts");
        modulePost.removePhotoPost(id, array, "StartPosts");
        elem.parentNode.parentNode.parentNode.style.display = 'none';
        showPosts(0, 10, "StartPosts");
        menu(document.getElementsByClassName("photos")[0]);
    }
}

function editPost(id,post) {
    modulePost.editPhotoPost(id, post);
}

function checkUser(user) {
    functions.checkUser(user);
}
