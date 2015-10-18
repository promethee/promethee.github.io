var posts = {};

var addGist = function (gist) {
    var p_container = document.createElement('p');
    p_container.dataset.gistId = gist.id;
    p_container.style.display = 'block';
    var div_gist = document.createElement('div');
    div_gist.className = 'gist';
    div_gist.innerHTML = markdown.toHTML(gist.data);
    p_container.appendChild(div_gist);
    document.getElementsByTagName('section')[0].appendChild(p_container);
};

var getGist = function (url, callback) {
    $.get(url, callback);
};

var onGistListDone = function (gists) {
    gists.map(function (gist) {
        posts[gist.updated_at] = gist;
    });

    var updated_dates = Object.keys(posts).sort().reverse();
    updated_dates.map(function (update_date) {
        Object.keys(posts[update_date].files).map(function (filename) {
            var gist_file = posts[update_date].files[filename];
            getGist(gist_file.raw_url, function (data) {
                posts[update_date].data = data;
                addGist(posts[update_date]);
            });
        });
        return posts[update_date];
    });
};

var getGistList = function (callback) {
    $.get('https://api.github.com/users/promethee/gists', onGistListDone);
};

getGistList();
