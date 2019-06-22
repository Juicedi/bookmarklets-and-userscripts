(function() {
    'use strict';
    const url = window.location;
    const removeSub = e => {
        e.preventDefault(); url.href = url.href.replace(/r\/(.*)\//g, 'r/$1-' + e.target.href.match(/r\/(\w*)/)[1] + '/');
    };

    if (window.removeSubs === true) return;

    window.removeSubs === true
    document.querySelectorAll('.subreddit').forEach(sub => {
        sub.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; sub.addEventListener('click', removeSub);
    });
}());
