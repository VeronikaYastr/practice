(function(exports) {
    exports.getPhotoPosts = function getPhotoPosts(array, skip, top) {
        return sortByDate(array).slice(skip, skip + top);
    };


    function sortByDate(array) {
        let newArray = array.slice();
        return newArray.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt)});
    }

    function findPost(array, id){
      for (let i = 0; i < array.length; i++){
        if (array[i].id === id){
          return array[i];
        }
      }
      return null
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

        if (photoPost.description !== undefined) {
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

        if (photoPost.hashTags !== undefined) {
            if (photoPost.hashTags.length === 0)
                return false;
            else {
                oldPhotoPost.hashTags = photoPost.hashTags;
                empty = false;
            }
        }


        return empty === false;
    };

    exports.removePhotoPost = function removePhotoPost(id, array) {
        if (id === undefined)
            return null;
        for (let i = 0; i < array.length; i++){
          if (array[i].id === id){
            delete array[i];
            return array;
          }
        }
        return null;
    };



})(this.modulePost = {});




