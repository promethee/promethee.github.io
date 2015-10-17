(function () {
  if (undefined === posts) {
    console.log("well, this is embarassing : I can't find the posts");
    return false;
  }

  document.getElementsByTagName('section')[0].textContent = '';
  /*posts.map(function (post_html) {
    document.getElementsByTagName('section')[0].innerHTML += post_html;
  });*/
});
