(function() {
  const upvotes = document.querySelectorAll('._1rZYMD_4xY3gRcSS3p8ODO');
  upvotes.forEach(upvote => {
    if (parseInt(upvote.innerHTML, 10) < 10) {
      const child = upvote
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement;
      child.parentElement.removeChild(child);
    }
  });
}());
