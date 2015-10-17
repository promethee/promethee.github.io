(function () {
  var posts = [
    "2015-10-17-hello.md"
  ];

  document.getElementsByTagName('section')[0].textContent = '';
  posts.map(function (filename) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var post_html = JSON.parse(xhr.responseText);
            }
        }
    };
    xhr.open("GET", '_posts/'+filename, true);
    xhr.send();
    document.getElementsByTagName('section')[0].innerHTML += post_html;
  });
}());
