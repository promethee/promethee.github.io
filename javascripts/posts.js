$.get(
    'https://api.github.com/users/promethee/gists',
    function (gists) {
        gists.map(function (gist) {
            var keys = Object.keys(gist.files);
            keys.map(function (k) {
                $.get(
                    gist.files[keys].raw_url,
                    function (data) {
                        console.log('data', data);
                        var p_container = document.createElement('p');
                        p_container.dataset.gistId = gist.id;
                        p_container.style.display = 'block';

                        var div_gist = document.createElement('div');
                        div_gist.className = 'gist';
                        div_gist.innerHTML = markdown.toHTML(data);
                        p_container.appendChild(div_gist);
                        document.getElementsByTagName('section')[0].appendChild(p_container);
                    });
            });
        });
    }
);
