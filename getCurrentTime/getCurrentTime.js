(function() {
  'use strict';
  const userId = '';
  const apiUrl = '';
  let timeoutTimes = 0, timeElem = null, today = '', url = '';
  const TIMEOUTLIMIT = 20;
  let xhttp = new XMLHttpRequest();

  function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
  }

  function createTimeElem() {
    timeElem = document.createElement('DIV');
    timeElem.style.position = 'fixed';
    timeElem.style.color = '#DC7391';
    timeElem.style.backgroundColor = '#B4526E';
    timeElem.style.borderRadius = '3px';
    timeElem.style.zIndex = 1000;
    timeElem.style.top = '80px';
    timeElem.style.left = '50%';
    timeElem.style.padding = '0px 5px';
    timeElem.style.transform = 'translateX(-50%)';
    document.body.appendChild(timeElem);
  }

  function showTime(time) {
    timeoutTimes++;
    if (timeoutTimes > TIMEOUTLIMIT) return;
    if (document.body === null) {
      setTimeout(showTime.bind(null, time), 300);
      return;
    }
    if (timeElem === null) createTimeElem();
    timeElem.innerHTML = 'Today: ' + Math.floor(time * 100) / 100;
  }

  function showResponse() {
    if (this.readyState == 4 && this.status == 200) {
      var times = [];
      var combinedTime = 0;
      try {
        times = JSON.parse(xhttp.response).timeEntries;
      } catch (e) {
        console.log(e);
        return;
      }
      combinedTime = times.reduce((start, obj) => start + obj.hours + (obj.minutes / 60), 0);
      setTimeout(showTime.bind(null, combinedTime), 300);
    }
  }

  today = formatDate(Date.now());
  apiUrl += '?page=1&pageSize=100&getTotals=true&projectId=&companyId=0'
    + '&userId=' + userId + '&invoicedType=all&billableType=all'
    + '&fromDate=' + today + '&toDate=' + today
    + '&sortBy=date&sortOrder=desc'
    + '&onlyStarredProjects=false&includeArchivedProjects=false'
    + '&matchAllTags=true&projectStatus=all';
  xhttp.onreadystatechange = showResponse;
  xhttp.open("GET", url, true);
  xhttp.send();
}());
