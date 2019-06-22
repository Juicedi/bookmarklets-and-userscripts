(function() {
  const upvotes = document.querySelectorAll('.unvoted.score');
  const limit = location.href.indexOf('r/all') > -1 ? 1000 : 10;
  upvotes.forEach(upvote => {
    if (parseInt(upvote.title, 10) < limit || upvote.title === '') {
      const child = upvote.parentElement.parentElement;
      child.parentElement.removeChild(child);
    }
  });
}());
