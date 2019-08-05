(function hideCommentTree () {
  const comments = document.querySelectorAll('.nestedlisting > .thing.comment');
  const areas = [];

  function toggleCollapse (comment) {
    if (comment.classList.value.indexOf('collapsed') > -1) {
      comment.classList.remove('non-collapsed');
      comment.classList.add('collapsed');
    } else {
      comment.classList.remove('collapsed');
      comment.classList.add('non-collapsed');
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

    /* UNNECESSARY: These are just something I wanted to try. These
     * just make the code little bit shorter even though it doesn't
     * need to be that short. */
    const areaStyles = hoverArea.style;

    areaStyles.backgroundColor = 'rgba(20, 255, 20, 0.3)';
    areaStyles.position = 'absolute';
    areaStyles.display = 'none';
    areaStyles.width = '100%';
    areaStyles.height = '100%';
    areaStyles.top = 0;
    areaStyles.left = 0;
    areaStyles.borderRadius = '10px';
    areaStyles.border = '3px solid darkblue';
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
