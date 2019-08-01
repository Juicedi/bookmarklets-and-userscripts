
/*
 * This script adds all posts a hoverable area which will mark
 * the post to be removed when the user lifts the control key.
 *
 * The hover areas will only be visible when user presses the Control
 * key.
 */

(function batchHide(change_state, hide_thing) {
  const posts = document.querySelectorAll('.thing');
  const areas = [];

  function showHoverElements() {
    areas.forEach((area) => {
      area.style.display = 'block';
    });
  }

  function hideHoverElements(area) {
    area.style.display = 'none';
  }

  function hideSelectedPost(area) {

    /*
     * Hide button doesn't have a class or id. This causes a
     * complicated DOM navigation which should be improved.
     */

    const hideButton = area.parentElement.querySelector('.link-save-button')
      .nextSibling.querySelector('a');

    if (area.selected) {
      change_state(hideButton, 'hide', hide_thing);
    }
  }

  function selectHoverableArea() {
    this.style.backgroundColor = 'green';
  }

  function deselectHoverableArea() {
    this.style.backgroundColor = 'red';
  }

  function toggleSelection() {
    if (this.selected) {
      this.selected = false;
      deselectHoverableArea.call(this);
    } else { 
      this.selected = true;
      selectHoverableArea.call(this);
    }
  }

  // Check if hiding functions are available
  if (typeof change_state !== 'function') return;
  if (typeof hide_thing !== 'function') return;

  posts.forEach((post) => {
    const hideArea = document.createElement('DIV');
    hideArea.style.display = 'none';
    hideArea.style.position = 'absolute';
    hideArea.style.backgroundColor = 'red';
    hideArea.style.left = '0px';
    hideArea.style.top = '0px';
    hideArea.style.height = '50px';
    hideArea.style.width = '50px';
    hideArea.addEventListener('mouseenter', toggleSelection);

    post.style.position = 'relative';
    post.append(hideArea);

    areas.push(hideArea);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Control') showHoverElements();
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
      areas.forEach((area) => {
        hideSelectedPost(area);
        hideHoverElements(area);
      });
    }
  });
}(change_state, hide_thing));
