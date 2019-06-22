(function() {
  const upvotes = document.querySelectorAll('.unvoted.score');
  upvotes.forEach(upvote => {
    if (parseInt(upvote.title, 10) < 10 || upvote.title === '') {
      const child = upvote.parentElement.parentElement;
      child.parentElement.removeChild(child);
    }
  });
}());
