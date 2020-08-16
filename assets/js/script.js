var scheduleArr = [];
var scheduleObj = {};
var dateArr = [];
var dateObj = {};
var storedSchedule;
var savedSchedule;
var date = moment().format('LL');
previous = 0;
next = 0;
day = 0;

$(document).ready(function() {
  init();

  function init() {
    storeTodaysDate();
    updateTime();
    displaySchedule();
    scheduleFocus();
    saveEvent();
  }

  function storeTodaysDate() {
    savedSchedule = JSON.parse(localStorage.getItem(date));

    if (savedSchedule === null) {
      console.log('creating');
      dateObj['date'] = date;
      dateArr.push(dateObj);
      localStorage.setItem(date, JSON.stringify(dateArr));
    }
  }

  function updateTime(differentDate) {
    if (differentDate !== date) {
      var currentDate = moment().format('dddd, MMMM Do');
      $('#title-date').html(currentDate);
      dynamicTime();
    }
    if (day = 0) {
      $('#title-time').html(
        'Here is your schedule for today. The current time is: '
      );
      $('#dynamic-time').show();
      dynamicTime();

    } else if (day > 0) {
      $('#title-date').html(differentDate);
      $('#title-time').html(
        'Here is what your schedule looks like for this day so far.'
      );
      $('#dynamic-time').hide();
    } else {
      $('#title-time').html(
        'Here is your schedule for today. The current time is: '
      );
      $('#dynamic-time').show();
      dynamicTime();
    }
  }

  function dynamicTime() {
    var currentTime = moment().format('h:mm:ss A');
    $('#dynamic-time').text(currentTime);
    setInterval(dynamicTime, 1000);
  }

  function scheduleFocus() {
    var currentHourInt = parseInt(moment().format('HH'));

    var timeIDs = $('#schedule-table tr[id]')
      .map(function() {
        return this.id;
      })
      .get();

    if (day < 0) {
      $('.input-area').css('background-color', 'grey');
    } else if (day > 0) {
      $('.input-area').css('background-color', 'dbf9d5');
    } else {
      for (var i = 0; i < timeIDs.length; i++) {
        var timeIDsInt = parseInt(timeIDs[i]);
        if (timeIDsInt < currentHourInt) {
          $('#' + timeIDs[i])
            .find('textarea')
            .css('background-color', 'grey');
        } else if (timeIDsInt === currentHourInt) {
          $('#' + timeIDs[i])
            .find('textarea')
            .css('background-color', '#dbf9d5');
        } else {
          $('#' + timeIDs[i])
            .find('textarea')
            .css('background-color', '#f9e4d5');
        }
      }
    }
  }

  function displaySchedule() {
    savedSchedule = JSON.parse(localStorage.getItem(date));
    $('.input-area').val('');
    for (var i = 0; i < savedSchedule.length; i++) {
      var getKey = Object.keys(savedSchedule[i]);
      var getValue = Object.values(savedSchedule[i]);
      $('#area-' + getKey).val(getValue[0]);
    }
  }

  function saveEvent() {
    $('.save-button').on('click', function() {
      var trId = $(this)
        .closest('tr')
        .attr('id');
      var textAreaVal = $(this)
        .closest('tr')
        .find('textarea')
        .val()
        .trim();

      storedSchedule = JSON.parse(localStorage.getItem(date));
      scheduleObj = {};

      scheduleObj[trId] = textAreaVal;
      scheduleArr.push(scheduleObj);
      localStorage.setItem(date, JSON.stringify(scheduleArr));

      for (var i = 0; i < storedSchedule.length; i++) {
        if (storedSchedule[i].hasOwnProperty(trId)) {
          storedSchedule[i][trId] = textAreaVal;
          scheduleArr = storedSchedule;
          localStorage.setItem(date, JSON.stringify(scheduleArr));
          return;
        }
      }
    });
  }
});
