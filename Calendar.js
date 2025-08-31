/**
 * @fileoverview A class to manage and display calendars.
 * @class Calendar
 * @description Represents a calendar with methods to navigate months and generate calendar data.
 */
class Calendar {
    /**
     * Creates an instance of Calendar.
     * @param {number} firstWeekday The first day of the week (0 for Sunday, 1 for Monday, etc.).
     * @param {Date} [initialDate=new Date()] The initial date to display the calendar for. Defaults to the current date.
     * @param {string} [locale='en-US'] The locale string for formatting dates. Defaults to 'en-US'.
     * @throws {Error} If `firstWeekday` is not between 0 and 6.
     */
    constructor(firstWeekday, initialDate=new Date(), locale='en-US') {
        if (0 > firstWeekday || firstWeekday > 6) throw Error("Week day must be between 0 and 6.");
        this.firstWeekday = firstWeekday;
        this.lastWeekday = (this.firstWeekday == 0) ? 6 : this.firstWeekday - 1;
        this.date = new Date(initialDate);
        this.date.setDate(1);
        this.locale = locale;
    }

    /**
     * Gets the dates for the current month's calendar.
     * @param {boolean} [withOtherMonthsDates=true] If true, includes dates from the previous and next months to complete the calendar grid. Defaults to true.
     * @returns {Date[]} An array of Date objects representing the calendar for the current month.
     */
    monthCalendar(withOtherMonthsDates=true) {
       return this._getMonthCalendar(this.date.getFullYear(), this.date.getMonth(), withOtherMonthsDates) 
    }

    /**
     * Moves the calendar to the next month.
     */
    nextMonth() {
        const date = new Date(this.date)
        date.setMonth(date.getMonth() + 1)
        this.date = date;
    }

    /**
     * Moves the calendar to the previous month.
     */
    previousMonth() {
        const date = new Date(this.date)
        date.setMonth(date.getMonth() - 1)
        this.date = date;
    }

    /**
     * Retrieves the dates for a given month and year.
     * @private
     * @param {number} year The year.
     * @param {number} month The month (0-indexed).
     * @param {boolean} [withOtherMonthsDates=true] If true, includes dates from the previous and next months to complete the calendar grid. Defaults to true.
     * @returns {Date[]} An array of Date objects for the specified month.
     */
    _getMonthCalendar(year, month, withOtherMonthsDates=true)  {        
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0)

        let date = new Date(firstDate);
        const monthDates = [];
        // Get month Date
        while (date.getTime() <= lastDate.getTime()) {
            monthDates.push(date);
            date = new Date(date) // Clone object
            date.setDate(date.getDate() + 1);
        }
        
        if (!withOtherMonthsDates) return monthDates;

        // Previous month overlapping
        const previousMonthDates = [];
        if (firstDate.getDay() != this.firstWeekday) {
           let date = new Date(firstDate);
           while (date.getDay() != this.firstWeekday) {
                date = new Date(date);
                date.setDate(date.getDate() - 1);
                previousMonthDates.push(date);
           }
        }
        previousMonthDates.reverse()

        // Next month overlapping
        const nextMonthDates = [];
        if (lastDate.getDay() != this.lastWeekday) {
           let date = new Date(lastDate);
           while (date.getDay() != this.lastWeekday) {
                date = new Date(date);
                date.setDate(date.getDate() + 1);
                nextMonthDates.push(date);
           }
        }
        
        return [...previousMonthDates, ...monthDates, ...nextMonthDates]
    }

    /**
     * Creates and returns a DOM element representing the calendar for the current month.
     * @param {boolean} [withOtherMonthsDates=true] If true, displays dates from the previous and next months. Defaults to true.
     * @returns {HTMLDivElement} A div element containing the calendar grid.
     */
    displayMonthCalendar(withOtherMonthsDates=true) {
        const monthCalendar = this.monthCalendar(true);

        const $calendar = document.createElement('div');
        $calendar.classList.add('calendar');
        // headers
        const weekdayFormater = new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',
        });

        for (const date of [...monthCalendar].splice(0, 7)) {
            const $header = document.createElement('div');
            $header.classList.add('calendar-header');
            $header.textContent = weekdayFormater.format(date);
            $calendar.appendChild($header);
        }
        
        for (const date of monthCalendar) {
            const $date = document.createElement('div');
            $date.classList.add('calendar-date');
            $date.setAttribute('data-date', date.toString())
            if (withOtherMonthsDates || date.getMonth() === this.date.getMonth()) {
                $date.textContent = date.toString();
            }
            $calendar.appendChild($date)
        }
        return $calendar;
    }

    /**
     * Advances to the next month and returns a DOM element for the new calendar view.
     * @param {boolean} [withOtherMonthsDates=true] If true, displays dates from the previous and next months. Defaults to true.
     * @returns {HTMLDivElement} A div element representing the next month's calendar.
     */
    displayNextMonthCalendar(withOtherMonthsDates=true) {
        this.nextMonth();
        return this.displayMonthCalendar(withOtherMonthsDates)
    }

    /**
     * Moves to the previous month and returns a DOM element for the new calendar view.
     * @param {boolean} [withOtherMonthsDates=true] If true, displays dates from the previous and next months. Defaults to true.
     * @returns {HTMLDivElement} A div element representing the previous month's calendar.
     */
    displayPreviousMonthCalendar(withOtherMonthsDates=true) {
        this.previousMonth();
        return this.displayMonthCalendar(withOtherMonthsDates)
    }


}