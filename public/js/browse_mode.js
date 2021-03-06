/* eslint-disable no-undef, max-len, max-params */
'use strict';

(function() {
  // added to convert times from military to normal
  const getHumanReadableTime = function(time) {
    let hour;
    const hourStr = time.substr(0, 2);
    const minute = time.substr(2, 3);
    let timeOfDay;

    if (parseInt(hourStr) > 12) {
      timeOfDay = 'pm';
      hour = parseInt(hourStr) - 12;
    } else if (parseInt(hourStr) === 10 || parseInt(hourStr) === 11) {
      timeOfDay = 'am';
      hour = hourStr;
    } else {
      timeOfDay = 'am';
      hour = time.substr(1, 1);
    }

    time = `${hour}${minute} ${timeOfDay}`;

    return time;
  };

  const createRow = function(tripId, busNumber, stopNumber, startTime, endTime) {
    /* eslint-disable-next-line max-len */
    const url = `/plot.html?tripId=${tripId}&stopNumber=${stopNumber}&busNumber=${busNumber}&startTime=${startTime}&endTime=${endTime}`;
    const $row = $(`<tr id="trip_${tripId}">
      <td>${busNumber}</td>
      <td>${stopNumber}</td>
      <td>${getHumanReadableTime(startTime)}</td>
      <td>${getHumanReadableTime(endTime)}</td>
      </tr>`);

    $('tbody').append($row);
    $(`#trip_${tripId}`).click((event) => {
      event.preventDefault();
      window.location.href = url;
    });
  };

  $.getJSON('/trips')
    .done((trips) => {
      for (const trip of trips) {
        createRow(trip.id, trip.busNumber, trip.stopNumber,
                  trip.startTime, trip.endTime);
      }
    })
    .fail(() => {
      Materialize.toast('Error loading all current routes.', 3000);
    });
})();
