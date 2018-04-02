(function(exports) {
    let photoPosts = [
        {
            id: '1',
            description: 'Грюйер стал для нас одним из самых излюбленных мест для прогулок',
            createdAt: new Date('2018-02-21T12:14:00'),
            author: 'Nata_Travel',
            photoLink: 'https://pp.userapi.com/c840225/v840225840/80f99/jGcPe8t7CPc.jpg',
            hashTags : ['#Switzerland', '#Gruyere'],
            likes : ['Kristy133', 'Mike_Cool', 'MindyK', 'KevinAdams'],
            isDeleted : 'false'
        },
        {
            id: '2',
            description: 'Возле Грюйерского замка нас ждала церковь св. Теодула.',
            createdAt: new Date('2018-02-21T12:30:00'),
            author: 'Nata_Travel',
            photoLink: 'https://pp.userapi.com/c831109/v831109840/8952e/FPUhzz7XW0w.jpg',
            hashTags : ['#Switzerland', '#Gruyere', '#Castle'],
            likes : ['Kristy133', 'KevinAdams', 'Mike_Cool'],
            isDeleted : 'false'
        },
        {
            id: '3',
            description: 'Gloomily, but still amazing ',
            createdAt: new Date('2018-01-03T13:16:00'),
            author: 'Mike_Cool',
            photoLink: 'https://pp.userapi.com/c824501/v824501399/d7c57/YUvjj-ydbHk.jpg',
            hashTags : ['#Switzerland', '#Geneva', '#rainy', '#dark'],
            likes : ['Nik Reid', 'Mike_Cool', 'MindyK', 'Mary Dale'],
            isDeleted : 'false'
        },
        {
            id: '4',
            description: 'Утренняя прогулка по набережной закончилась вот таким интересным фото))',
            createdAt: new Date('2018-02-20T08:10:00'),
            author: 'Linda Clain',
            photoLink: 'https://pp.userapi.com/c840726/v840726235/60cb0/JlFDeECTQt8.jpg',
            hashTags : ['#morning', '#seafront', '#icicles', '#winter'],
            likes : ['Nata_Travel', 'Kristy133', 'Freddy14_03', 'Nik Reid'],
            isDeleted : 'false'
        },
        {
            id: '5',
            description: 'Животные выглядят невероятно реалистичными!)',
            createdAt: new Date('2018-03-03T15:25:00'),
            author: 'Kristy1333',
            photoLink: 'https://pp.userapi.com/c830309/v830309235/a54ca/41sZfpg09S8.jpg',
            hashTags : ['#Switzerland', '#museum', '#animals'],
            likes : ['Mike_Cool', 'Nelly_Mole', 'Mary Dale'],
            isDeleted : 'false'
        },
        {
            id: '6',
            description: 'Одна голова хорошо, а две лучше:))',
            createdAt: new Date('2018-02-20T08:30:00'),
            author: 'Kristy1333',
            photoLink: 'https://pp.userapi.com/c841323/v841323973/6450d/Amirwol0OaU.jpg',
            hashTags : ['#Switzerland', '#museum', '#mutants', '#turtle'],
            likes : ['KevinAdams', 'Mike_Cool', 'Nik Reid', 'Mary Dale', 'Nelly_Mole'],
            isDeleted : 'false'
        },
        {
            id: '7',
            description: 'Сегодняшний пост посвящен граффити.',
            createdAt: new Date('2018-01-17T20:18:00'),
            author: 'ArtBlog',
            photoLink: 'https://pp.userapi.com/c840426/v840426235/5e37a/4_QtSGSJUAw.jpg',
            hashTags : [ '#art', '#graffiti', '#street_art', '#interesting'],
            likes : ['Nata_Travel', 'Linda Clain', 'MindyK'],
            isDeleted : 'false'
        },
        {
            id: '8',
            description: 'А чем вы занимаетесь на скучных лекциях?)',
            createdAt: new Date('2018-02-28T16:41:00'),
            author: 'ArtBlog',
            photoLink: 'https://pp.userapi.com/c840525/v840525399/6357e/69vsUu3RI2I.jpg',
            hashTags : ['#art', '#blackPen',  '#drawings', '#students'],
            likes : ['Kristy133', 'MindyK', 'Nelly_Mole'],
            isDeleted : 'false'
        },
        {
            id: '9',
            description: 'Вот и начала наступать весна...',
            createdAt: new Date('2018-01-17T19:46:00'),
            author: 'Kristy133',
            photoLink: 'https://pp.userapi.com/c841622/v841622235/760be/t3x50ca5VIQ.jpg',
            hashTags : ['#nature', '#spring'],
            likes : ['KevinAdams', 'Freddy14_03', 'Mary Dale'],
            isDeleted : 'false'
        },
        {
            id: '10',
            description: 'Excursion to UN was really interesting',
            createdAt: new Date('2018-01-20T17:37:00'),
            author: 'KevinAdams',
            photoLink: 'https://pp.userapi.com/c841130/v841130235/7615d/p6h6-Mq9Ynk.jpg',
            hashTags : ['#UN', '#Switzerland', '#exursions'],
            likes : ['Nik Reid', 'Linda Clain', 'MindyK'],
            isDeleted : 'false'
        },
        {
            id: '11',
            description: 'So happy to see this town again',
            createdAt: new Date('2018-02-01T14:38:00'),
            author: 'Mary Dale',
            photoLink: 'https://pp.userapi.com/c824409/v824409235/d75fd/U9CskC6GHeM.jpg',
            hashTags : ['#Switzerland', '#Berne', '#home'],
            likes : ['Kristy133', 'Nelly_Mole',  'KevinAdams', 'MindyK', 'Mary Nice'],
            isDeleted : 'false'
        },
        {
            id: '12',
            description: 'Admire the panoramic view of Geneva from St.Pier\'s Cathedral...',
            createdAt: new Date('2018-01-29T11:07:00'),
            author: 'KevinAdams',
            photoLink: 'https://pp.userapi.com/c834300/v834300235/ddbb7/TPxaWfKpZoU.jpg',
            hashTags : ['#Switzerland', '#Geneva', '#cathedral', '#panorama'],
            likes : ['Mary Dale', 'Mike_Cool', 'Nata_Travel'],
            isDeleted : 'false'
        },
        {
            id: '13',
            description: 'Just unbelievable',
            createdAt: new Date('2018-01-15T15:43:00'),
            author: 'Nik Reid',
            photoLink: 'https://pp.userapi.com/c834104/v834104235/db573/nSqaJbfcrbw.jpg',
            hashTags : ['#France', '#beauty', '#mountains', '#nature'],
            likes : ['Kristy133', 'Mary Nice', 'MindyK'],
            isDeleted : 'false'
        },
        {
            id: '14',
            description: 'Road to nowhere',
            createdAt: new Date('2018-02-10T12:15:00'),
            author: 'Nik Reid',
            photoLink: 'https://sun9-7.userapi.com/c840628/v840628235/5f578/6TmHkD-gUUo.jpg',
            hashTags : ['#Switzerland', '#mountains', '#cloudy', '#funicularRailway'],
            likes : ['Kristy133', 'Mike_Cool', 'Linda Clain'],
            isDeleted : 'false'
        },
        {
            id: '15',
            description: 'Lovely sunny days',
            createdAt: new Date('2018-01-26T14:54:00'),
            author: 'Mike_Cool',
            photoLink: 'https://pp.userapi.com/c840639/v840639399/65123/cwkn1UmbRPQ.jpg',
            hashTags : ['#Switzerland', '#swans', '#Geneva', '#fountainJetd\'Eau'],
            likes : ['Linda Clain', 'Mary Dale','Nik Reid', 'MindyK'],
            isDeleted : 'false'
        },
        {
            id: '16',
            description: 'Let your dreams come true',
            createdAt: new Date('2018-03-02T19:22:00'),
            author: 'Nik Reid',
            photoLink: 'https://pp.userapi.com/c841236/v841236399/75a00/WTScqnwKses.jpg',
            hashTags : ['#France', '#birds', '#dreams'],
            likes : ['Freddy14_03', 'MindyK', 'Mary Nice'],
            isDeleted : 'false'
        },
        {
            id: '17',
            description: 'Unusual ceiling in UN',
            createdAt: new Date('2018-01-20T18:03:00'),
            author: 'KevinAdams',
            photoLink: 'https://pp.userapi.com/c841022/v841022399/79444/g9HJ-aROPI0.jpg',
            hashTags : ['#UN', '#Switzerland', '#exursions', '#art'],
            likes : ['Kristy133', 'Nata_Travel', 'Nelly_Mole', 'Linda Clain']
        },
        {
            id: '18',
            description: 'Small Hogwarts^^',
            createdAt: new Date('2018-02-19T21:10:00'),
            author: 'Mary Dale',
            photoLink: 'https://pp.userapi.com/c834303/v834303399/dbbfd/6Yf14H7mjd8.jpg',
            hashTags : ['#Geneva', '#school', '#magic'],
            likes : ['Mary Dale', 'Mike_Cool', 'Mary Nice', 'KevinAdams'],
            isDeleted : 'false'
        },
        {
            id: '19',
            description: 'At night city looks completely different',
            createdAt: new Date('2018-02-12T23:50:00'),
            author: 'Mike_Cool',
            photoLink: 'https://pp.userapi.com/c841424/v841424399/773ea/OJ1B63EBlRU.jpg',
            hashTags : ['#night', '#Geneva'],
            likes : ['Kristy133', 'Mary Nice', 'Freddy14_03', 'Nelly_Mole'],
            isDeleted : 'false'
        },
        {
            id: '20',
            description: 'Весеннее настроение <3',
            createdAt: new Date('2018-02-24T13:52:00'),
            author: 'Linda Clain',
            photoLink: 'https://pp.userapi.com/c841038/v841038235/765f1/aY-3H-3vvHA.jpg',
            hashTags : ['#flowers', '#spring', '#tulips', 'good_mood'],
            likes : ['Mary Dale', 'Nelly_Mole', 'Nik Reid', 'MindyK'],
            isDeleted : 'false'
        }
    ];

    exports.getPhotoPosts = function getPhotoPosts(array, skip, top, filterConfig) {
        return modulePost.sortByDate(array).slice(skip, skip + top);
    };


    exports.sortByDate = function sortByDate(array) {
        let newArray = array.slice();
        return newArray.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt)});
    };

    photoPosts = modulePost.sortByDate(photoPosts);

    exports.getPhotoPost = function getPhotoPost(array, id) {
        if (id === undefined)
            return null;
        for (let i = 0; i < array.length; i++)
            if (array[i].id === id)
                return array[i];

        return null;
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

    exports.addPhotoPost = function addPhotoPost(array, photoPost, name) {
        if (photoPost === undefined)
            return false;

        if (validatePhotoPost(photoPost) && modulePost.getPhotoPost(array, photoPost.id) === null) {
            array.push(photoPost);
            localStorage.setItem(name, JSON.stringify(modulePost.sortByDate(array)));
            return true;
        }

        return false;
    };

    exports.editPhotoPost = function editPhotoPost(array, id, photoPost, name) {
        let oldPhotoPost = modulePost.getPhotoPost(array, id);
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

        localStorage.setItem(name, JSON.stringify(array));

        return empty === false;
    };

    exports.removePhotoPost = function removePhotoPost(id, array, name) {
        if (id === undefined)
            return false;
        let index = array.findIndex(post => post.id === id);
        if(index !== -1) {
            array.splice(index, 1);
            localStorage.setItem(name, JSON.stringify(array));
            return true;
        }
        return false;
    };

    let savedPosts = JSON.parse(localStorage.getItem("StartPosts"));
    let savedAllPosts = JSON.parse(localStorage.getItem("AllPosts"));
    exports.amount = photoPosts.length;
    localStorage.setItem("id", '21');
    if(savedAllPosts === null) {
        localStorage.setItem("AllPosts", JSON.stringify(photoPosts));
        savedAllPosts = photoPosts;
    }
    else
        exports.amount = savedAllPosts.length;


    if(savedPosts === null) {
        let startPosts = modulePost.getPhotoPosts(savedAllPosts, 0, 10);
        const serialObj = JSON.stringify(startPosts);
        localStorage.setItem("StartPosts", serialObj);
        exports.amount -= 10;
    }
    else {
        exports.amount -= savedPosts.length;
    }


})(this.modulePost = {});
