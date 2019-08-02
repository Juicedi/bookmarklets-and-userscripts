
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

  function hideSelectedPost(area) {

    /*
     * Hide button doesn't have a class or id. This causes a
     * complicated DOM navigation which should be improved.
     */

    const hideButton = area.parentElement.querySelector('.link-save-button')
      .nextSibling.querySelector('a');
    change_state(hideButton, 'hide', hide_thing);
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

  function hoverToggleKeyUp(e) {
    if (e.key !== 'Control') return;

    let splices = 0;
    let removed = 0;

    areas.forEach((area, index) => {
      if (area.selected) {
        setTimeout(() => {

          /*
           * Splicing hover area from the areas array and passing it
           * to the hiding function and adjusting the index after
           * async remove.
           */

          hideSelectedPost(areas.splice(index - splices, 1)[0]);
          splices++;
        }, 400 * removed);
        removed++;
      }

      area.style.display = 'none'; 
    });
  }

  function hoverToggleKeyDown(e) {
    if (e.key === 'Control') {
      areas.forEach((area) => {
        area.style.display = 'block'; 
      });
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
    hideArea.style.width = '100px';
    hideArea.addEventListener('mouseenter', toggleSelection);

    post.style.position = 'relative';
    post.append(hideArea);

    areas.push(hideArea);
  });

  document.addEventListener('keydown', hoverToggleKeyDown);
  document.addEventListener('keyup', hoverToggleKeyUp);
}(change_state, hide_thing));
