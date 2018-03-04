;(function() {
    var photoPosts = [
        {
            id: '1',
            description: 'Грюйер стал для нас одним из самых излюбленных мест для прогулок, каждый раз открываем для себя что-то новое. ' +
            'Многие пробегают это местечко второпях, а то и вовсе не заглядывают в Грюйерский замок.' +
            ' Но Швейцария — это та страна, где просто нельзя скакать «галопам по Европам». ' +
            'Нужно «дегустировать» все интересности по чуть чуть, словно бокал вина!',
            createdAt: new Date('2018-02-21T12:14:00'),
            author: 'Nata_Travel',
            photoLink: 'https://pp.userapi.com/c840225/v840225840/80f99/jGcPe8t7CPc.jpg',
            hashTags : ['#Switzerland', '#Gruyere'],
            likes : ['Kristy133', 'Mike_Cool_Guy', 'MindyK', 'KevinAdams']
        },
        {
            id: '2',
            description: 'Возле Грюйерского замка нас ждала церковь св. Теодула \nПримечательна она тем, что на месте колокольни раньше была обсерватория.',
            createdAt: new Date('2018-02-21T12:30:00'),
            author: 'Nata_Travel',
            photoLink: 'https://pp.userapi.com/c831109/v831109840/8952e/FPUhzz7XW0w.jpg',
            hashTags : ['#Switzerland', '#Gruyere', '#Castle'],
            likes : ['Kristy133', 'KevinAdams', 'Mike_Cool_Guy']
        },
        {
            id: '3',
            description: 'Весеннее настроение <3',
            createdAt: new Date('2018-02-24T13:52:00'),
            author: 'Linda Clain',
            photoLink: 'https://pp.userapi.com/c841038/v841038235/765f1/aY-3H-3vvHA.jpg',
            hashTags : ['#flowers', '#spring', '#tulips', 'good_mood'],
            likes : ['Mary Dale', 'Nelly_Mole', 'Nik Reid', 'MindyK']
        },
        {
            id: '4',
            description: 'Утренняя прогулка по набережной закончилась вот таким интересным фото))',
            createdAt: new Date('2018-02-20T08:10:00'),
            author: 'Linda Clain',
            photoLink: 'https://pp.userapi.com/c840726/v840726235/60cb0/JlFDeECTQt8.jpg',
            hashTags : ['#morning', '#seafront', '#icicles', '#winter'],
            likes : ['Nata_Travel', 'Kristy133', 'Freddy14_03', 'Nik Reid']
        },
        {
            id: '5',
            description: 'Животные выглядят невероятно реалистичными!)',
            createdAt: new Date('2018-03-03T15:25:00'),
            author: 'Kristy1333',
            photoLink: 'https://pp.userapi.com/c830309/v830309235/a54ca/41sZfpg09S8.jpg',
            hashTags : ['#Switzerland', '#museum', '#animals'],
            likes : ['Mike_Cool_Guy', 'Nelly_Mole', 'Mary Dale']
        },
        {
            id: '6',
            description: 'Одна голова хорошо, а две лучше:))',
            createdAt: new Date('2018-02-20T08:10:00'),
            author: 'Kristy1333',
            photoLink: 'https://pp.userapi.com/c841323/v841323973/6450d/Amirwol0OaU.jpg',
            hashTags : ['#Switzerland', '#museum', '#mutants', '#turtle'],
            likes : ['KevinAdams', 'Mike_Cool_Guy', 'Nik Reid', 'Mary Dale', 'Nelly_Mole']
        },
        {
            id: '7',
            description: 'Сегодняшний пост посвящен теме граффити. Граффити — изображения или надписи, выцарапанные, написанные или нарисованные краской или чернилами на стенах и других поверхностях. ' +
            'К граффити можно отнести любой вид уличного раскрашивания стен, на которых можно найти всё: от просто написанных слов до изысканных рисунков.',
            createdAt: new Date('2018-01-17T20:18:00'),
            author: 'ArtBlog',
            photoLink: 'https://pp.userapi.com/c840426/v840426235/5e37a/4_QtSGSJUAw.jpg',
            hashTags : [ '#art', '#graffiti', '#street_art', '#interesting'],
            likes : ['Nata_Travel', 'Linda Clain', 'MindyK']
        },
        {
            id: '8',
            description: 'А чем вы занимаетесь на скучных лекциях?)',
            createdAt: new Date('2018-02-28T16:41:00'),
            author: 'ArtBlog',
            photoLink: 'https://pp.userapi.com/c840525/v840525399/6357e/69vsUu3RI2I.jpg',
            hashTags : ['#art', '#blackPen',  '#drawings', '#students'],
            likes : ['Kristy133', 'Mike_Cool_Guy', 'MindyK', 'Nelly_Mole']
        },
        {
            id: '9',
            description: 'Вот и начала наступать весна...',
            createdAt: new Date('2018-01-17T19:46:00'),
            author: 'Kristy133',
            photoLink: 'https://pp.userapi.com/c841622/v841622235/760be/t3x50ca5VIQ.jpg',
            hashTags : ['#nature', '#spring'],
            likes : ['KevinAdams', 'Freddy14_03', 'Mary Dale']
        },
        {
            id: '10',
            description: 'Excursion to UN was really interesting',
            createdAt: new Date('2018-01-20T17:37:00'),
            author: 'KevinAdams',
            photoLink: 'https://pp.userapi.com/c841130/v841130235/7615d/p6h6-Mq9Ynk.jpg',
            hashTags : ['#UN', '#Switzerland', '#exursions'],
            likes : ['Nik Reid', 'Linda Clain', 'MindyK']
        },
        {
            id: '11',
            description: 'So happy to see this town again',
            createdAt: new Date('2018-02-01T14:38:00'),
            author: 'Mary Dale',
            photoLink: 'https://pp.userapi.com/c824409/v824409235/d75fd/U9CskC6GHeM.jpg',
            hashTags : ['#Switzerland', '#Berne', '#home'],
            likes : ['Kristy133', 'Nelly_Mole',  'KevinAdams', 'MindyK', 'Mary Nice']
        },
        {
            id: '12',
            description: 'Admire the panoramic view of Geneva from St.Pier\'s Cathedral...',
            createdAt: new Date('2018-01-29T11:07:00'),
            author: 'KevinAdams',
            photoLink: 'https://pp.userapi.com/c834300/v834300235/ddbb7/TPxaWfKpZoU.jpg',
            hashTags : ['#Switzerland', '#Geneva', '#cathedral', '#panorama'],
            likes : ['Mary Dale', 'Mike_Cool_Guy', 'Nata_Travel']
        },
        {
            id: '13',
            description: 'Just unbelievable',
            createdAt: new Date('2018-01-15T15:43:00'),
            author: 'Nik Reid',
            photoLink: 'https://pp.userapi.com/c834104/v834104235/db573/nSqaJbfcrbw.jpg',
            hashTags : ['#France', '#beauty', '#mountains', '#nature'],
            likes : ['Kristy133', 'Mary Nice', 'MindyK']
        },
        {
            id: '14',
            description: 'Road to nowhere',
            createdAt: new Date('2018-02-10T12:15:00'),
            author: 'Nik Reid',
            photoLink: 'https://sun9-7.userapi.com/c840628/v840628235/5f578/6TmHkD-gUUo.jpg',
            hashTags : ['#Switzerland', '#mountains', '#cloudy', '#funicularRailway'],
            likes : ['Kristy133', 'Mike_Cool_Guy', 'Linda Clain']
        },
        {
            id: '15',
            description: 'Lovely sunny days',
            createdAt: new Date('2018-01-26T14:54:00'),
            author: 'Mike_Cool_Guy',
            photoLink: 'https://pp.userapi.com/c840639/v840639399/65123/cwkn1UmbRPQ.jpg',
            hashTags : ['#Switzerland', '#swans', '#Geneva', '#fountainJetd\'Eau'],
            likes : ['Linda Clain', 'Mary Dale','Nik Reid', 'MindyK']
        },
        {
            id: '16',
            description: 'Let your dreams come true',
            createdAt: new Date('2018-03-02T19:22:00'),
            author: 'Nik Reid',
            photoLink: 'https://pp.userapi.com/c841236/v841236399/75a00/WTScqnwKses.jpg',
            hashTags : ['#France', '#birds', '#dreams'],
            likes : ['Freddy14_03', 'MindyK', 'Mary Nice']
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
            likes : ['Mary Dale', 'Mike_Cool_Guy', 'Mary Nice', 'KevinAdams']
        },
        {
            id: '19',
            description: 'At night city looks completely different',
            createdAt: new Date('2018-01-12T23:50:00'),
            author: 'Mike_Cool_Guy',
            photoLink: 'https://pp.userapi.com/c841424/v841424399/773ea/OJ1B63EBlRU.jpg',
            hashTags : ['#night', '#Geneva'],
            likes : ['Kristy133', 'Mary Nice', 'Freddy14_03', 'Nelly_Mole']
        },
        {
            id: '20',
            description: 'Gloomily, but still amazing ',
            createdAt: new Date('2018-03-01T13:16:00'),
            author: 'Mike_Cool_Guy',
            photoLink: 'https://pp.userapi.com/c824501/v824501399/d7c57/YUvjj-ydbHk.jpg',
            hashTags : ['#Switzerland', '#Geneva', '#rainy', '#dark'],
            likes : ['Nik Reid', 'Mike_Cool_Guy', 'MindyK', 'Mary Dale']
        }
    ];

    function getPhotoPosts(skip, top, filterConfig) {
        var newPhotoPosts = [];

        skip = skip || 0;
        if(skip < 0 || skip >= photoPosts.length)
            skip = 0;

        top = top || 10;
        if(top <= 0)
            top = 10;

        if(filterConfig !== undefined)
        {
            if("author" in filterConfig)
                newPhotoPosts = filterByAuthor(filterConfig.author, photoPosts);
            if("date" in filterConfig)
                newPhotoPosts = filterByDate(filterConfig.date, photoPosts);
            if("hashTags" in filterConfig)
                newPhotoPosts = filterByHashTags(filterConfig.hashTags, photoPosts);
            newPhotoPosts = sortByDate(newPhotoPosts).slice(skip, skip + top);
        }
        else {
            newPhotoPosts = sortByDate(photoPosts).slice(skip, skip + top);
        }

        return newPhotoPosts;
    }
    
    function filterByAuthor(author, array) {
        var newArray = [];

        if (author === undefined || array === undefined || array.length ===0)
            return newArray;

        for (var i = 0; i < array.length; i++)
            if (array[i].author === author)
                newArray.push(array[i]);

        return newArray;
    }

    function filterByDate(date, array) {
        var newArray = [];

        if (date === undefined || array === undefined || array.length ===0)
            return newArray;
        for (var i = 0; i < array.length; i++)
            if (array[i].createdAt <= date)
                newArray.push(array[i]);

        return newArray;
    }

    function filterByHashTags(hashTags, array) {
        var newArray = [];

        if (hashTags === undefined || hashTags.length === 0 || array === undefined || array.length ===0)
            return newArray;

        newArray = array.slice();
        for(var i = 0; i < hashTags.length; i++) {
            if(newArray === null)
                break;
            newArray = findHashTag(newArray, hashTags[i]);
        }
        return newArray;
    }

    function findHashTag(array, hashTag) {
        var newArray = [];

        if(array === null || hashTag === undefined)
            return newArray;

        for(var j = 0; j < array.length; j++)
            if(array[j].hashTags.indexOf(hashTag) !== -1)
                newArray.push(array[j]);
        return newArray;
    }

    function sortByDate(array) {
        var newArray = array.slice();
        return newArray.sort(function(a,b){return a.createdAt - b.createdAt});
    }

    function getPhotoPost(id) {
        if (id === undefined)
            return null;
        for (var i = 0; i < photoPosts.length; i++)
            if (photoPosts[i].id === id)
                return photoPosts[i];

        return null;
    }

    function validatePhotoPost(photoPost) {
        if (photoPost.id === undefined)
            return false;
        if (photoPost.description === undefined)
            return false;
        if (photoPost.createdAt === undefined)
            return false;
        if (photoPost.author === undefined)
            return false;
        if (photoPost.photoLink === undefined)
            return false;
        if (photoPost.hashTags === undefined || photoPost.hashTags.length === 0)
            return false;
        if (photoPost.likes === undefined)
            return false;

        if (photoPost.description.length >= 200)
            return false;
        if (photoPost.author.length === 0)
            return false;
        return photoPost.photoLink.length !== 0;
    }

    function addPhotoPost(photoPost) {
        if (photoPost === undefined)
            return false;

        if (validatePhotoPost(photoPost) && getPhotoPost(photoPost.id) === null) {
            photoPosts.push(photoPost);
            return true;
        }

        return false;
    }

    function editPhotoPost(id, photoPost) {
        var oldPhotoPost = getPhotoPost(id);
        var empty = true;
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
    }

    function removePhotoPost(id) {
        if (id === undefined)
            return false;
        for (var i = 0; i < photoPosts.length; i++)
            if (photoPosts[i].id === id) {
                photoPosts.splice(i, 1);
                return true;
            }
        return false;
    }

    function outputArray(array) {
        if(array === null || array.length === 0)
            console.log("No posts with such parameters.");
        else console.log(array);
    }

    //check methods with console
    function consoleWork() {
        console.log("\n\nArray after sorting by date: ");
        outputArray(sortByDate(photoPosts));

        console.group("\n\nMethod getPhotoPosts");
        console.log("Without parameters : first 10 posts sorted by date : ")
        outputArray(getPhotoPosts());
        console.log("\nSkip = 15, top = 12 :  12 posts(5 as a result) sorted by date starting from the 16th: ")
        outputArray(getPhotoPosts(15,12));
        console.log("\nSkip = 8 :  10 posts sorted by date starting from the 9th: ")
        outputArray(getPhotoPosts(8));
        console.log("\nfilterConfig = {author : 'Linda Clain'} : 10 posts by Linda Clain(2 as a result) sorted by date: ");
        outputArray(getPhotoPosts(0, 10, {author : 'Linda Clain'} ));
        console.log("\nfilterConfig = {date : '01.02.2018'} : 10 posts sorted by date until this date");
        outputArray(getPhotoPosts(0, 10,{date : new Date('2018-02-01T22:14:00')} ));
        console.log("\nfilterConfig = {hashTags : ['#Switzerland', '#Geneva'] : 10 posts sorted by date with hashTags(3 as a result)");
        outputArray(getPhotoPosts(0, 10, {hashTags : ['#Switzerland', '#Geneva']} ));
        console.log("\nfilterConfig = {hashTags : ['#strangeHashTags'] : No posts with such parameters");
        outputArray(getPhotoPosts(0, 10, {hashTags : ['#strangeHashTags']} ));
        console.log("\nfilterConfig = {colour : 'black'} : No posts with such parameters");
        outputArray(getPhotoPosts(0, 10,{colour : 'black'} ));
        console.groupEnd();

        console.group("\n\nMethod getPhotoPost");
        console.log('photoPost with id 10 : ');
        outputArray(getPhotoPost('10'));
        console.log('\nphotoPost with id 23(doesn\'t exist) : ');
        outputArray(getPhotoPost('23'));
        console.groupEnd();

        console.group("\n\nMethod validatePhotoPost");
        console.log('Return true : ');
        console.log(validatePhotoPost(getPhotoPost('2')));
        console.log('Return false because of long description : ');
        console.log(validatePhotoPost(getPhotoPost('1')));
        console.log('Return false because of wrong id : ');
        console.log(validatePhotoPost(getPhotoPost('1')));
        console.log('Return false because of less of arguments : ');
        console.log(validatePhotoPost({id: '25', description: 'Just something', author: 'Lanny'}));
        console.log('Return false because of empty argument(photoLink) : ');
        console.log(validatePhotoPost({
            id: '25',
            description: 'Just something',
            createdAt: new Date('2018-02-03T12:00:00'),
            author: 'Lanny',
            photoLink: '',
            hashTags : ['#hash'],
            likes : ['Katrine']
        }));
        console.groupEnd();

        console.group("\n\nMethod addPhotoPost");
        console.log('Return true : ');
        console.log(addPhotoPost({
            id: '21',
            description: 'Just something',
            createdAt: new Date('2018-02-03T12:00:00'),
            author: 'Lanny',
            photoLink: 'https://pp.userapi.com/c841537/v841537399/78135/Z_1P54xxqdc.jpg',
            hashTags : ['#someHashTags'],
            likes : ['Man', 'Girl']
        }));
        console.log("\nArray after adding photoPost : ");
        outputArray(photoPosts);
        console.log('\n\nReturn false because of existing post with the same ID : ');
        console.log(addPhotoPost(getPhotoPost('6')));
        console.log('Return false because of validation : ');
        console.log(addPhotoPost({id: '25', description: 'Just something', author: 'Lanny'}));
        console.groupEnd();

        console.group("\n\nMethod editPhotoPost");
        console.log('Return true : ');
        outputArray(photoPosts[1]);
        console.log(editPhotoPost('2', {description : 'Gruyeres is really fantastic town!!!'}));
        console.log("\nPhotoPost with id \'2\' after editing : ");
        outputArray(photoPosts[1]);
        console.log('\nReturn false because of invalid id : ');
        console.log(editPhotoPost('26', {description : 'Gruyeres is really fantastic town!!!'}));
        console.log('\nReturn false because of changing parameters (you can\'t change id) : ');
        console.log(editPhotoPost('26', {id : '1'}));
        console.log('\nReturn false because of invalid changes(too long description) : ');
        console.log(editPhotoPost('26', {description : getPhotoPost('1').description}));
        console.groupEnd();

        console.group("\n\nMethod removePhotoPost");
        console.log('Return true(delete photoPost with id \'1\' : ');
        console.log(removePhotoPost('1'));
        console.log("\nArray after deleting photoPost : ");
        outputArray(photoPosts);
        console.log('\nReturn false because of invalid id \'100\' : ');
        console.log(removePhotoPost('100'));
        console.groupEnd();
    }

    consoleWork();
})();

