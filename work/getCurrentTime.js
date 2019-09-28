(function main() {
  const userId = ''; // FIXME: Fill in correct user ID
  const apiUrl = ''; // FIXME: Fill in correct API URL
  const container = document.createElement('DIV');
  const dayInMilliSeconds = 86400000;
  const today = Date.now();
  const weekStart = today - (dayInMilliSeconds * new Date().getDay());
  let todayTimeElement = null;
  let weekTimeElement = null;

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear().toString();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('');
  }

  function getTimeByRange(start, end) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const url = `${apiUrl}?page=1&pageSize=100&getTotals=true&projectId=`
        + `&companyId=0&userId=${userId}&invoicedType=all&billableType=all`
        + `&fromDate=${formatDate(start)}&toDate=${formatDate(end)}`
        + '&sortBy=date&sortOrder=desc&onlyStarredProjects=false'
        + '&includeArchivedProjects=false&matchAllTags=true&projectStatus=all';

      function handleResponse() {
        let combinedTimes = 0;

        if (this.readyState === 4 && this.status === 200) {
          combinedTimes = JSON.parse(this.response).timeEntries
            .reduce((acc, obj) => acc + obj.hours + (obj.minutes / 60), 0);
          resolve(Math.floor(combinedTimes * 100) / 100);
        }

        if (this.status === 404) {
          reject(new Error('not found'));
        }
      }

      xhttp.open('GET', url, true);
      xhttp.onreadystatechange = handleResponse;
      xhttp.send();
    });
  }

  function createTimeElem(className, timeLabel) {
    const element = document.createElement('DIV');
    element.style.display = 'inline-block';
    element.style.color = '#DC7391';
    element.style.backgroundColor = '#B4526E';
    element.style.borderRadius = '3px';
    element.style.padding = '0px 5px';
    element.style.margin = '0px 5px';
    element.style.cursor = 'pointer';
    element.classList.add(`time-combined--${className}`);
    element.title = 'Double click to reload the data';
    element.dataset.label = timeLabel;
    return element;
  }

  async function refreshTime(start, end) {
    this.innerHTML = this.dataset.label + await getTimeByRange(start, end);
  }

  todayTimeElement = createTimeElem('today', 'Today: ');
  todayTimeElement.addEventListener('dblclick', () => {
    refreshTime.call(this, today, today);
  });

  weekTimeElement = createTimeElem('week', 'Week: ');
  weekTimeElement.addEventListener('dblclick', () => {
    refreshTime.call(this, weekStart, today);
  });

  container.style.top = '80px';
  container.style.left = '50%';
  container.style.zIndex = 1000;
  container.style.position = 'absolute';
  container.classList.add('time-container');
  container.style.transform = 'translateX(-50%)';
  container.appendChild(todayTimeElement);
  container.appendChild(weekTimeElement);
  document.body.appendChild(container);

  refreshTime.call(todayTimeElement, today, today);
  setTimeout(() => {
    refreshTime.call(weekTimeElement, weekStart, today);
  }, 400);
}());
