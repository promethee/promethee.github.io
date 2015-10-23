var posts = {};
var tags = {};

var addGist = function (gist) {
    var p_container = document.createElement('p');
    p_container.dataset.gistId = gist.id;
    p_container.style.display = 'block';

    var div_gist = document.createElement('div');
    div_gist.className = 'gist';
    div_gist.dataset.description = gist.description || '';
    // div_gist.innerHTML = markdown.toHTML(gist.data);

    var div_gist_date = document.createElement('small');
    div_gist_date.className = 'gitst-date'
    div_gist_date.innerHTML = moment(gist.created_at).format('dddd MMMM Do YYYY [@] H:m');

    var div_gist_content = document.createElement('p');
    div_gist_content.className = 'gist-content';
    div_gist_content.innerHTML = markdown.toHTML(gist.data);

    var _tags = gist.description.split('#');
    _tags.filter(function (tag) {
      // return -1 < tag.indexOf('#') ? tag.substr(1):tag;
      if (tag.length)   return tag.substr(1);
    }).map(function (tag) {
      if (undefined === tags[tag]) {
        tags[tag] = 0;
      }
      tags[tag] += 1;
      console.log('tag', tag, 'tags', tags);
    });
    var div_gist_tags = document.createElement('small');
    div_gist_tags.className = 'gist-tags';
    div_gist_tags.innerHTML = _tags.join(' ');

    div_gist.appendChild(div_gist_date);
    div_gist.appendChild(div_gist_content);
    div_gist.appendChild(div_gist_tags);
    p_container.appendChild(div_gist);
    document.getElementsByTagName('section')[0].appendChild(p_container);
};

var getGist = function (url, callback) {
    $.get(url, callback);
};

var onGistListDone = function (gists) {
    gists.map(function (gist) {
        posts[gist.created_at] = gist;
    });

    var creation_dates = Object.keys(posts).sort().reverse();
    creation_dates.map(function (creation_date) {
        Object.keys(posts[creation_date].files).map(function (filename) {
            var gist_file = posts[creation_date].files[filename];
            getGist(gist_file.raw_url, function (data) {
                posts[creation_date].data = data;
                addGist(posts[creation_date]);
            });
        });
        return posts[creation_date];
    });
};

var getGistList = function (callback) {
    $.get('https://api.github.com/users/promethee/gists', onGistListDone);
};
