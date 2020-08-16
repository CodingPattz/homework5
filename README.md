# Work Day Planner
A planner for a typical American work day (0900 to 1700) created using HTML and JavaScript (jQuery). This web page also incorporates the usage of the Moment.js library to display the date and time. Events can be entered in the row corresponding to the time, which can then be saved. The color/focus of the row changes with the time: grey being time past, light green being the current hour and light orange for events later in the day.

![Day-Planner-Screenshot](https://github.com/twopcz/HW-5/blob/master/assets/images/day-planner.png?raw=true)

# Usage
The user clicks into the text area/row and inputs the event to be penciled in for that corresponding hour. Clicking the icon to the right saves the user's input to `localStorage` so that the data persists. The user can clear their entire schedule by clicking the 'Clear Schedule' button, or they can clear an individual event and save it again to clear that time slot.

The user can also change the current day that is being displayed and continue to plan out their past and future days. This functionality was added well after HW-5 was due, but I found adapting my previous code to allow those changes was challenging and fun to complete.
