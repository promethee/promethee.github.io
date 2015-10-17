(function () {
  var posts = [
    "2015-10-17-hello.md"
  ];

  document.getElementsByTagName('section')[0].textContent = '';
  posts.map(function (post_html) {
    document.getElementsByTagName('section')[0].innerHTML += post_html;
  });
});
