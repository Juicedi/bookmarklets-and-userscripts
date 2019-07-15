(function() {
  const posts = document.querySelectorAll('.thing');
  const all = /r\/all/.test(window.location.href);
  const isNew = /\/new\//.test(window.location.href);
  const limit = all ? 1000 : 10;
  posts.forEach(post => {
    if (all && post.dataset.nsfw === 'true') {
        post.parentElement.removeChild(post);
        return;
    }
    if (all && typeof post.dataset.crosspostRootTitle !== 'undefined') {
        post.parentElement.removeChild(post);
        return;
    }
    if (!isNew && parseInt(post.dataset.score, 10) < limit) {
      post.parentElement.removeChild(post);
      return;
    }
  });
}());
