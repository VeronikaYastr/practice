((exports) => {
  let user = null;
  exports.checkUser = (username) => {
    const isUser = (username !== null);
    user = username;
    if (isUser) {
      document.getElementsByClassName('header-item')[0].innerHTML = '<a href="#photos"><i class="fa fa-male fa-3x"></i></a><h1>' + user + '</h1>';
      document.getElementsByClassName('header-left')[0].innerHTML = '<a href="#add"><i class="fa fa-camera-retro fa-2x"></i></a>\n' +
        '<a href="#photos"><i id="logout" class="fa fa-sign-out fa-2x"></i></a>';
    } else {
      document.getElementsByClassName('header-item')[0].innerHTML = '';
      document.getElementsByClassName('header-left')[0].innerHTML = '<a href="#login"><i id="login" class="fa fa-sign-in fa-2x"></i></a>';
    }

    return user;
  };

  function getFormatDate(post) {
    const date = new Date(post.createdAt);
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
  }

  function getFormatTime(post) {
    const date = new Date(post.createdAt);
    let hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  }

  exports.show = function showPhotoPost(post, pos) {
    const photos = document.getElementsByClassName('photos')[0];
    const isUser = (user === post.author);
    const circleBlock = document.createElement('div');
    circleBlock.className = 'result circle-block';

    const resultLeft = document.createElement('div');
    resultLeft.className = 'result-left';

    const resultImg = document.createElement('div');
    resultImg.className = 'result-img';
    resultImg.innerHTML = '<img src="' + post.photoLink + '" alt="">';

    const resultDescription = document.createElement('div');
    resultDescription.className = 'result-description';
    resultDescription.innerHTML = '<p>' + post.description + '</p>';

    const resultRight = document.createElement('div');
    resultRight.className = 'result-right';
    resultRight.innerHTML = '<h4>@' + post.author + '</h4>';

    const hashTagsList = document.createElement('ul');
    for (let i = 0; i < post.hashTags.length; i++) {
      const listItem = document.createElement('li');
      listItem.innerHTML = post.hashTags[i];
      hashTagsList.appendChild(listItem);
    }

    const timeListItem = document.createElement('li');
    const dateTime = document.createElement('div');
    dateTime.className = 'post-description';
    const timeItem = document.createElement('div');
    timeItem.className = 'time';
    timeItem.innerHTML = '<i class=\'fa fa-clock-o\'></i><p>' + getFormatTime(post) + '</p>';
    const dateItem = document.createElement('div');
    dateItem.className = 'date';
    dateItem.innerHTML = '<i class="fa fa-calendar"></i><p>' + getFormatDate(post) + '</p>';

    const likes = document.createElement('div');
    likes.className = 'post-likes';
    const index = post.likes.indexOf(user);
    let icon = '';
    if (index === -1) {
      icon = 'fa fa-heart-o';
    } else {
      icon = 'fa fa-heart';
    }

    likes.innerHTML = '<p>' + post.likes.length + '</p><i class="' + icon + '" id = "like' + post._id + '"></i>';

    dateTime.appendChild(dateItem);
    dateTime.appendChild(timeItem);
    timeListItem.appendChild(dateTime);
    hashTagsList.appendChild(timeListItem);
    resultRight.appendChild(hashTagsList);
    resultRight.appendChild(likes);

    if (isUser) {
      const trash = document.createElement('div');
      trash.className = 'edit';
      trash.innerHTML = '<i class="fa fa-edit fa" id = "edit' + post._id + '"></i>' +
        '<i class="fa fa-trash-o" id = "delete' + post._id + '"></i>';
      resultRight.appendChild(trash);
    }

    resultLeft.appendChild(resultImg);
    resultLeft.appendChild(resultDescription);
    circleBlock.appendChild(resultLeft);
    circleBlock.appendChild(resultRight);

    photos.insertBefore(circleBlock, photos.children[pos]);
  };
})(this.postView = {});


function showPosts(photoPosts, isButton) {
  if (!isButton) {
    document.getElementsByClassName('photos')[0].innerHTML = '';
  }

  const loadButton = document.getElementById('load');
  if (photoPosts.length >= 10) {
    loadButton.addEventListener('click', loadButtonPosts);
    loadButton.style.display = 'block';
  } else {
    loadButton.style.display = 'none';
    loadButton.removeEventListener('click', loadButtonPosts);
  }

  for (let i = 0; i < photoPosts.length; i++) {
    postView.show(photoPosts[i], ++postsController.skip);
  }
}

function setLink(link) {
  localStorage.setItem('addPost', JSON.stringify(link));
  document.getElementById('edit-photo-load').innerHTML = '<img src = "' + link + '" draggable="true">';
}

function dropPhoto() {
  const dropArea = document.getElementById('edit-photo-load');

  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
  }, false);


  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    loadImage(files[0])
      .then((response) => {
        localStorage.setItem('link', response);
      })
      .catch(error => alert(error));

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setLink(reader.result);
    };
  }, false);
}

function editPostDOM() {
  const post = JSON.parse(localStorage.getItem('editPost')).split(',');
  document.getElementById('edit-photo-load').innerHTML = '<img src = "' + post[0] + '">';
  document.forms['addForm']['description-upload'].value = post[1];

  for (let i = 2; i < post.length; i++) {
    document.forms['addForm']['tags-upload'].value += post[i] + '';
  }
}

function addPostDOM() {
  const post = JSON.parse(localStorage.getItem('addPost'));
  setLink(post);
}

function removePost(elem) {
  elem.parentNode.parentNode.parentNode.style.display = 'none';
}

function checkUser(user) {
  postView.checkUser(user);
}
