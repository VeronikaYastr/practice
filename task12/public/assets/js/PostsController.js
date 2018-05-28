((exports) => {
  exports.skip = 0;
})(this.postsController = {});

function getContent(fragmentId, callback) {
  const request = new XMLHttpRequest();

  request.onload = () => {
    callback(request.responseText);
  };

  request.open('GET', fragmentId + '.html');
  request.send(null);
}

function userLogout() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/logout', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(true);
      }
    };
    xhr.send();
  });
}

function userLogin(user) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      } if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(true);
      }
    };
    xhr.send(user);
  });
}

function loadImage(post) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', post);

    xhr.open('POST', '/uploadImage');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve('tmp/upload_avatars/' + xhr.responseText);
      }
    };

    xhr.send(formData);
  });
}

// load files from computer
function clickEvent() {
  const fileElem = document.getElementById('fileElem');
  if (fileElem) {
    fileElem.click();
  }
}

function loadFiles(files) {
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
}

function loadServerPosts(isButton, skip, top, filters) {
  skip = skip || 0;
  top = top || 10;
  localStorage.setItem('skip', skip);
  localStorage.setItem('top', top);
  filters = filters || '{"author":"", "createdAt":"", "hashTags": []}';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/getPosts/' + skip + '&' + top, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(xhr.responseText);
      }
    };

    xhr.send(filters);
  });
}

function getServerLength() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getLength', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}

function getServerPost(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getPost/' + parseInt(id, 10), true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(xhr.responseText);
      }
    };

    xhr.send();
  });
}

function editServerPost(id, post) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/editPost/' + parseInt(id, 10), true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(xhr.responseText);
      }
    };

    xhr.send(JSON.stringify(post));
  });
}

function addServerPost(post) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/addPost', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText + '\nError! Can\'t post this photo :('));
      } else {
        resolve(xhr.responseText);
      }
    };

    xhr.send(JSON.stringify(post));
  });
}

function deleteServerPost(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/delPost/' + parseInt(id, 10), true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(true);
      }
    };

    xhr.send();
  });
}

function likeServerPost(id, author) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/likePost/' + id + '&' + author, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        reject(new Error(xhr.status + ': ' + xhr.statusText));
      } else {
        resolve(xhr.responseText);
      }
    };

    xhr.send();
  });
}

async function loadAllPosts(isButton, skip, top, filters) {
  try {
    const JSONposts = await loadServerPosts(isButton, skip, top, filters);
    const posts = await JSON.parse(JSONposts);
    showPosts(posts, isButton);
  } catch (e) {
    throw new Error('Loading posts failed! (' + e.message + ')');
  }
}

// load with button
function loadButtonPosts() {
  let skip = parseInt(localStorage.getItem('skip'), 10);
  let top = parseInt(localStorage.getItem('top'), 10);

  if (skip !== undefined && skip !== null) {
    skip = top;
  }
  if (top !== undefined && top !== null) {
    top += 10;
  }

  postsController.skip = skip;
  localStorage.setItem('skip', JSON.stringify(skip));
  localStorage.setItem('top', JSON.stringify(top));

  loadAllPosts(true, skip, top, localStorage.getItem('filters'))
    .catch(err => alert(err));
}

function sizeLike(like, isOn) {
  if (isOn === -1) {
    like.style.fontSize = 25 + 'px';
  } else {
    like.style.fontSize = 15 + 'px';
  }

  setTimeout(() => {
    like.style.fontSize = 20 + 'px';
  }, 400);
}

async function makeLike(id, elem) {
  try {
    const answer = await likeServerPost(id, localStorage.getItem('user'), elem);

    let icon = '';
    let index = 0;
    const likes = elem.parentNode;

    let length = parseInt(likes.firstChild.innerHTML, 10);

    if (answer === 'true') {
      icon = 'fa fa-heart';
      index = -1;
      length += 1;
    } else {
      icon = 'fa fa-heart-o';
      length -= 1;
    }

    likes.firstChild.innerHTML = length;
    likes.children[1].className = icon;
    sizeLike(likes.children[1], index);
  } catch (e) {
    throw new Error('Like post failed! (' + e.message + ')');
  }
}

async function deletePost(id, elem) {
  try {
    await deleteServerPost(id);
    await loadAllPosts(false, 0, localStorage.getItem('top'), localStorage.getItem('filters'));
    removePost(elem);
  } catch (e) {
    throw new Error('Deleting post failed! (' + e.message + ')');
  }
}

async function editClickPost(id) {
  try {
    localStorage.setItem('editing', id);

    const JSONpost = await getServerPost(id.replace('edit', ''));
    const post = await (JSON.parse(JSONpost));

    localStorage.setItem('editPost', JSON.stringify(post.photoLink + ',' + post.description + ',' + post.hashTags));
    location.hash = '#add';
  } catch (e) {
    throw new Error('Editing post failed! (' + e.message + ')');
  }
}

// events : delete, like and edit
function menu(elem) {
  elem.addEventListener('click', (e) => {
    const target = e.target || e.srcElement;
    const id = target.getAttribute('id');

    if (id.startsWith('like')) {
      makeLike(id.replace('like', ''), target)
        .catch(err => alert(err));
    }

    if (id.startsWith('delete')) {
      if (confirm('Do you want to delete this post?')) {
        deletePost(id.replace('delete', ''), target)
          .catch(err => alert(err));
      }
    }

    if (id.startsWith('edit')) {
      editClickPost(id.replace('edit', ''))
        .catch(err => alert(err));
    }
  });
}

async function logout() {
  try {
    await userLogout();
    localStorage.removeItem('user');
    checkUser(localStorage.getItem('user'));
    location.hash = '#photos';
  } catch (err) {
    alert('Action is forbidden!');
  }
}

async function loginSubmit() {
  try {
    const username = document.forms.login.user.value;
    const password = document.forms.login.password.value;
    const user = { username, password };
    await userLogin(JSON.stringify(user));

    localStorage.setItem('user', username);
    location.hash = '#photos';
  } catch (err) {
    alert('Invalid password or login!');
  }
}

function startWork() {
  const user = localStorage.getItem('user');
  checkUser(user);

  if (user !== null) {
    menu(document.getElementsByClassName('photos')[0]);
    document.getElementById('logout').addEventListener('click', logout);
  } else {
    document.getElementById('login').addEventListener('click', () => {
      location.hash = '#login';
    });
    localStorage.setItem('skip', JSON.stringify(0));
    localStorage.setItem('top', JSON.stringify(10));
    localStorage.setItem('filters', '{"author":"", "createdAt":"", "hashTags": []}');
  }

  const skip = 0;
  const top = parseInt(localStorage.getItem('top'), 10);
  const filters = localStorage.getItem('filters');

  if (filters !== undefined && filters !== null) {
    const fields = JSON.parse(filters);
    if (fields.author !== undefined) {
      document.forms.filter.name.value = fields.author;
    }
    if (fields.createdAt !== undefined) {
      document.forms.filter.date.value = fields.createdAt;
    }
    if (fields.hashTags !== undefined) {
      document.forms.filter.hashTags.value = fields.hashTags;
    }
  }

  loadAllPosts(false, skip, top, filters)
    .catch(err => alert(err));
}

// work with pages
function navigate() {
  const fragmentId = location.hash.substr(1);
  getContent(fragmentId, (content) => {
    document.getElementById('cur').innerHTML = content;
    if (fragmentId === 'photos') {
      localStorage.removeItem('editPost');
      localStorage.removeItem('addPost');
      localStorage.removeItem('editing');
      startWork();
    }

    // filling field with hashTags with '#' before new hashTag
    if (fragmentId === 'add') {
      dropPhoto();
      const user = localStorage.getItem('user');
      checkUser(user);

      document.getElementsByClassName('input-upload-photos')[0].addEventListener('keydown', () => {
        if (event.keyCode === 32 || event.keyCode === 0) {
          setTimeout(() => {
            document.forms['addForm']['tags-upload'].value += '#';
          }, 10);
        }
      });
      document.getElementsByClassName('input-upload-photos')[0].addEventListener('focus', () => {
        if (document.forms['addForm']['tags-upload'].value === '') {
          document.forms['addForm']['tags-upload'].value = '#';
        }
      });
      document.getElementById('cancel').addEventListener('click', () => {
        if (confirm('Do you want to leave this page?')) {
          location.hash = '#photos';
        }
      });

      if (localStorage.getItem('addPost') !== null) {
        addPostDOM();
      }

      if (localStorage.getItem('editing') !== null) {
        document.getElementsByClassName('add-page-title')[0].children[0].innerHTML = 'Edit photo';
        if (localStorage.getItem('editPost') !== null) {
          editPostDOM();
        }
      }
    }
  });
}


navigate();
if (!location.hash) {
  location.hash = '#photos';
}

window.addEventListener('hashchange', navigate);

// filters
function filterForm() {
  const date = document.forms.filter.date.value;
  const author = document.forms.filter.name.value;
  const hashs = document.forms.filter.hashTags.value.split(' ');
  const filters = {};
  if (author !== undefined && author !== '') {
    filters.author = author;
  }
  if (date !== undefined && date !== '') {
    filters.createdAt = date;
  }
  if (hashs !== undefined && hashs.length !== 0 && !hashs.every(x => x === '')) {
    filters.hashTags = hashs;
  }
  loadAllPosts(false, 0, 10, JSON.stringify(filters))
    .catch(err => alert(err));

  localStorage.setItem('filters', JSON.stringify(filters));
}

async function editPost(id, post) {
  try {
    const answer = await editServerPost(id, post);
    if (answer === 'false') {
      location.hash = '#add';
    } else {
      localStorage.removeItem('editing');
      location.hash = '#photos';
    }
  } catch (e) {
    throw new Error('Editing post failed! (' + e.message + ')');
  }
}

async function addPost(author, descr, tags) {
  try {
    const post = {};
    post.author = author;
    post.description = descr;
    post.hashTags = tags;
    post.photoLink = localStorage.getItem('link');

    const answer = await addServerPost(post);
    if (answer === 'false') {
      location.hash = '#add';
    } else {
      location.hash = '#photos';
      localStorage.removeItem('addPost');
    }
  } catch (e) {
    throw new Error('Adding post failed! (' + e.message + ')');
  }
}

function sendPost() {
  const user = localStorage.getItem('user');
  const editPostId = JSON.parse(localStorage.getItem('editing'));
  let isEditing = false;
  if (editPostId !== null) {
    isEditing = true;
  }

  const descr = document.forms['addForm']['description-upload'].value;
  const tags = document.forms['addForm']['tags-upload'].value.split(' ');

  const newPost = { description: '', hashTags: [] };
  if (isEditing) {
    if (descr !== '') {
      newPost.description = descr;
    }
    if (!tags.every(item => item === '')) {
      newPost.hashTags = tags;
    }

    editPost(editPostId, newPost)
      .catch(err => alert(err));
  } else {
    addPost(user, descr, tags)
      .catch(err => alert(err));
  }
}

