This bookmarklet should remove reddit posts that have less than 10 upvotes.


Minified using npm command-line tool uglify-js

command: uglifyjs --compress --mangle -o min.js -- removeLowScore.js

Paste this to bookmark:
javascript:(function(){for(var e=document.querySelectorAll("._1rZYMD_4xY3gRcSS3p8ODO"),n=0,t=e.length;n<t;n++)if(parseInt(e[n].innerHTML)<10){var r=e[n].parentElement.parentElement.parentElement.parentElement.parentElement;r.parentElement.removeChild(r)}}());
