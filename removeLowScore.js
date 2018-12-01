(function removeStuff() {
  var upvotes = document.querySelectorAll('._1rZYMD_4xY3gRcSS3p8ODO');
  for (var i = 0, len = upvotes.length; i < len; i++) {
    if (parseInt(upvotes[i].innerHTML) < 10) {
      var child = upvotes[i]
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement;
      child.parentElement.removeChild(child);
    }
  }
}());
