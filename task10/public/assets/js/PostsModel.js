(function(exports) {
    function sortByDate(array) {
        let newArray = array.slice();
        return newArray.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt)});
    }

    exports.getPhotoPosts = function getPhotoPosts(array, skip, top, filters) {
        if(array === undefined || array === null){
            return null;
        }

        if(filters === undefined)
            return sortByDate(array);

        if(filters.author !== undefined && filters.author !== "" ){
            array = array.filter(x => x.author === filters.author);
        }

        if(filters.date !== undefined && filters.date !== "")
            array = array.filter(x => new Date(x.createdAt) <= new Date(filters.date));

        if(filters.hashTags !== undefined && filters.hashTags !== null && !filters.hashTags.every(item => item === ""))
        for(let i = 0; i < filters.hashTags.length; i++)
            array = array.filter(x => x.hashTags.indexOf(filters.hashTags[i]) !== -1);

        return sortByDate(array.filter(x => x.isDeleted === 'false')).slice(skip, skip + top);
    };

    function findPost(array, id) {
        return array.find(x => x.id === id);
    }


    exports.getPhotoPost = function getPhotoPost(array, id) {
        if (id === undefined)
            return null;

        return findPost(array, id);
    };

    function validatePhotoPost(photoPost) {
        if (photoPost.id === undefined)
            return false;
        if (photoPost.description === undefined || photoPost.description === "" )
            return false;
        if (photoPost.createdAt === undefined)
            return false;
        if (photoPost.author === undefined)
            return false;
        if (photoPost.photoLink === undefined || photoPost.photoLink === "" )
            return false;
        if (photoPost.hashTags === undefined || photoPost.hashTags.every(item => item ===""))
            return false;
        if (photoPost.likes === undefined)
            return false;

        if (photoPost.description.length >= 200)
            return false;
        if (photoPost.author.length === 0)
            return false;
        return photoPost.photoLink.length !== 0;
    }

    exports.addPhotoPost = function addPhotoPost(array, photoPost) {
        if (photoPost === undefined)
            return null;

        if (validatePhotoPost(photoPost)) {
            array.push(photoPost);
            return sortByDate(array);
        }

        return null;
    };

    exports.editPhotoPost = function editPhotoPost(array, id, photoPost) {
        let oldPhotoPost = findPost(array, id);

        let empty = true;
        if (oldPhotoPost === null || photoPost === undefined || id === undefined)
            return false;

        if (photoPost.description !== undefined && photoPost.description !== "") {
            if (photoPost.description.length >= 200)
                return false;
            else {
                oldPhotoPost.description = photoPost.description;
                empty = false;
            }
        }

        if (photoPost.photoLink !== undefined) {
            if (photoPost.photoLink.length === 0)
                return false;
            else {
                oldPhotoPost.photoLink = photoPost.photoLink;
                empty = false;
            }
        }

        if (photoPost.hashTags !== undefined && photoPost.hashTags.length !== 0) {
            if (photoPost.hashTags.length === 0)
                return false;
            else {
                oldPhotoPost.hashTags = photoPost.hashTags;
                empty = false;
            }
        }

        return empty === false;
    };

    exports.likePost = function likePost(array, id, author) {
      if(array === undefined || id === undefined || author === undefined)
          return false;

      let oldPost = findPost(array, id);

      if(oldPost.isDeleted === 'false') {
          let index = oldPost.likes.indexOf(author);
          if (index === -1) {
              oldPost.likes.push(author);
              return true;
          }
          else {
              oldPost.likes.splice(index, 1);
              return false;
          }
      }

      return false;
    };

    exports.removePhotoPost = function removePhotoPost(id, array) {
        if (id === undefined || array === undefined)
            return false;

        let post = array.find(x => x.id === id);

        if(post) {
            post.isDeleted = true;
            return true;
        }

        return false;
    };


})(this.postsModel = {});




