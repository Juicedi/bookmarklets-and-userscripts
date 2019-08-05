(function hideCommentTree () {
  const comments = document.querySelectorAll('.nestedlisting > .thing.comment');
  const areas = [];

  function toggleCollapse (comment) {
    if (comment.classList.value.indexOf('collapsed') > -1) {
      comment.classList.remove('noncollapsed');
      comment.classList.add('collapsed');
    } else {
      comment.classList.remove('collapsed');
      comment.classList.add('noncollapsed');
    }
  }

  function hoverRevealKeyDown (event) {
    if (event.key !== 'Control') return;
    areas.forEach((area) => {
      area.style.display = 'block';
    });
  }

  function hoverRevealKeyUp (event) {
    if (event.key !== 'Control') return;
    areas.forEach((area) => {
      area.style.display = 'none';
    });
  }

  comments.forEach((comment) => {
    // Create clickable hover area that will hide comment tree
    const hoverArea = document.createElement('DIV');
    hoverArea.style.backgroundColor = 'rgba(20, 255, 20, 0.3)';
    hoverArea.style.position = 'absolute';
    hoverArea.style.display = 'none';
    hoverArea.style.width = '100%';
    hoverArea.style.height = '100%';
    hoverArea.style.top = 0;
    hoverArea.style.left = 0;
    hoverArea.style.borderRadius = '10px';
    hoverArea.style.border = '3px solid darkblue';
    hoverArea.addEventListener('click', toggleCollapse.bind(null, comment));

    // Set the hover area to its correct spot
    comment.style.position = 'relative';
    comment.append(hoverArea);

    // Save hover area in to an array for later use in
    // event listeners
    areas.push(hoverArea);
  });

  // Create event listeners
  document.addEventListener('keydown', hoverRevealKeyDown);
  document.addEventListener('keyup', hoverRevealKeyUp);
}());
