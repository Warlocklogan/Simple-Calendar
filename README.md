# Simple-Calendar

A lightweight and flexible JavaScript class for generating and displaying calendars.

## Features

-   **Customizable First Day:** Set your week to start on any day (Sunday, Monday, etc.).
-   **Month Navigation:** Easily move forward and backward through months.
-   **DOM Generation:** Get a full calendar grid as a `div` element, ready to be inserted into your HTML.
-   **Locale Support:** Format weekday names according to different languages and regions.
-   **Simple and Clean:** The class is designed to be a straightforward and easy-to-integrate solution.

## Installation

Simply include the `Calendar.js` file in your project.

```html
<script src="Calendar.js"></script>
```

## Usage

Create a new instance of the Calendar class. The constructor takes up to three arguments:
- **firstWeekday**: A number from 0 (Sunday) to 6 (Saturday) representing the first day of the week.
- **initialDate**: (Optional) A Date object to set the initial month. Defaults to the current date.
- **locale**: (Optional) A string for the locale, e.g., 'en-US', 'fr-FR'. Defaults to 'en-US'.

```js
// Create a new calendar that starts on Monday
const calendar = new Calendar(1);

// Get the calendar as a DOM element
const calendarElement = calendar.displayMonthCalendar();

// Append the calendar to your page
document.body.appendChild(calendarElement);

// Navigate to the next month
const nextMonthCalendar = calendar.displayNextMonthCalendar();
document.body.appendChild(nextMonthCalendar);

// Navigate to the previous month
const previousMonthCalendar = calendar.displayPreviousMonthCalendar();
document.body.appendChild(previousMonthCalendar);
```