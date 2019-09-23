(function main() {
  // const userId = ''; // FIXME: Fill in correct user ID
  // let apiUrl = '';   // FIXME: Fill in correct API URL
  const container = document.createElement('DIV');
  const today = Date.now();
  const weekStart = today - new Date().getDay();
  const todayText = 'Today: ';
  const weekText = 'Week: ';
  let todayTimeElement = null;
  let weeksTimeElement = null;

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear().toString();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('');
  }

  function combineTimes(data) {
    let combinedTimes = 0;
    let times = [];

    times = JSON.parse(data).timeEntries;
    combinedTimes = times.reduce((start, obj) => start + obj.hours + (obj.minutes / 60), 0);
    return Math.floor(combinedTimes * 100) / 100;
  }

  function handleResponse(target, text) {
    const element = target;

    if (this.readyState === 4 && this.status === 200) {
      element.innerHTML = text + combineTimes(this.response);
    }
  }

  function getTimeRange(text, element, dateFrom, dateTo) {
    const xhttp = new XMLHttpRequest();
    const url = `${apiUrl}?page=1&pageSize=100&getTotals=true&projectId=`
      + `&companyId=0&userId=${userId}&invoicedType=all&billableType=all`
      + `&fromDate=${formatDate(dateFrom)}&toDate=${formatDate(dateTo)}`
      + '&sortBy=date&sortOrder=desc&onlyStarredProjects=false'
      + '&includeArchivedProjects=false&matchAllTags=true&projectStatus=all';
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = handleResponse.bind(xhttp, element, text);
    xhttp.send();
  }

  function createTimeElem(eventHandler, formattedText) {
    const element = document.createElement('DIV');
    const txt = formattedText.trim().toLowerCase().replace(':', '').toString();
    element.style.display = 'inline-block';
    element.style.color = '#DC7391';
    element.style.backgroundColor = '#B4526E';
    element.style.borderRadius = '3px';
    element.style.padding = '0px 5px';
    element.style.margin = '0px 5px';
    element.style.cursor = 'pointer';
    element.classList.add(`time-combined--${txt}`);
    element.title = 'Double click to reload the data';
    element.addEventListener('dblclick', eventHandler);
    return element;
  }

  container.style.top = '80px';
  container.style.left = '50%';
  container.style.zIndex = 1000;
  container.style.position = 'absolute';
  container.classList.add('time-container');
  container.style.transform = 'translateX(-50%)';
  document.body.appendChild(container);

  todayTimeElement = createTimeElem(getTimeRange.bind(null, today, today), todayText);
  weeksTimeElement = createTimeElem(getTimeRange.bind(null, weekStart, today), weekText);
  container.appendChild(todayTimeElement);
  container.appendChild(weeksTimeElement);
  getTimeRange(todayText, todayTimeElement, today, today);
  setTimeout(() => {
    getTimeRange(weekText, weeksTimeElement, weekStart, today);
  }, 1000);
}());
