# Simple-Calendar

A lightweight and flexible JavaScript library for generating and displaying calendars.

**Live Demo:** [https://warlocklogan.github.io/Simple-Calendar/demo/](https://warlocklogan.github.io/Simple-Calendar/demo/)

---

## Features

- **Modular Design**: Separates calendar logic from rendering, making it easier to customize.
- **Customizable First Day**: Set your week to start on any day (Sunday, Monday, etc.).
- **Flexible Constructors**: Initialize the calendar with an easy-to-use options object.
- **Multiple Views**: Switch between a full **month view** and a single **week view**.
- **DOM Generation**: Get a full calendar grid as a `div` element, ready to be inserted into your HTML.
- **Locale Support**: Format weekday names according to different languages and regions.
- **Simple and Clean**: The classes are designed to be a straightforward and easy-to-integrate solution.

---

## Installation

Simply include the `Calendar.js` and `CalendarRenderer.js` files in your project.

```html
<script src="Calendar.js"></script>
<script src="CalendarRenderer.js"></script>
```

---

## Usage

Create a new instance of the **`CalendarRenderer`** class. The constructor takes a single `options` object.

| Option         | Type          | Description                                                                      | Default      |
| :------------- | :------------ | :------------------------------------------------------------------------------- | :----------- |
| `firstWeekday` | `number`      | A number from 0 (Sunday) to 6 (Saturday) representing the first day of the week. | `0`          |
| `initialDate`  | `Date`        | The initial date to set the calendar to.                                         | `new Date()` |
| `locale`       | `string`      | A string for the locale, e.g., 'en-US', 'fr-FR'.                                 | `'en-US'`    |
| `view`         | `string`      | The initial view type: `'month'` or `'week'`.                                    | `'month'`    |
| `$el`          | `HTMLElement` | The HTML element where the calendar will be rendered.                            | `null`       |

### Example: Rendering a Monthly Calendar

```js
// Select a container element on your page
const myCalendarDiv = document.getElementById("my-calendar");

// Create a new calendar that starts on Monday, in French, and renders immediately
const calendar = new CalendarRenderer({
  $el: myCalendarDiv,
  firstWeekday: 1, // Monday
  locale: "fr-FR",
  view: "month",
});
```

### Navigating the Calendar

Once you have a `CalendarRenderer` instance, you can use its methods to navigate and update the view.

```js
// Navigate to the next month or week
calendar.next();

// Navigate to the previous month or week
calendar.previous();
```
