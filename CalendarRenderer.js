'use strict';
/**
 * @fileoverview A class to manage and display calendars.
 * @class CalendarRenderer
 * @description Represents a calendar with methods to render months and week calendar.
 */
class CalendarRenderer extends Calendar {
     /**
     * Creates an instance of CalendarRenderer.
     * @param {object} [options={}] An object containing configuration options.
     * @param {number} [options.firstWeekday=0] The first day of the week (0 for Sunday, 1 for Monday, etc.).
     * @param {Date} [options.initialDate=new Date()] The initial date for the calendar.
     * @param {string} [options.locale='en-US'] The locale string for formatting dates.
     * @param {string} [options.view='month'] The default view ('month' or 'week').
     * @param {HTMLElement} [options.$el] The HTML element to render the calendar into.
     */
    constructor(options) {
        super(options);
        const {locale, view, ...otherOptions} = this.options;
        
        this.locale = locale;
        this.view = view;

        if ('$el' in otherOptions) {
            this.$el = otherOptions.$el;
            this.render();
        }
    }

    /**
     * Retrieves the combined default options for the calendar renderer.
     * * This static method merges the default options from the parent class (Calendar) 
     * with the specific defaults for the CalendarRenderer, such as the locale and 
     * the initial view.
     * * @private
     * @static
     * @returns {object} An object containing all default configuration options.
     */
    _getDefaultOptions() {
        return {
            ...super._getDefaultOptions(),
            locale: 'en-US',
            view: 'month',
        }
    }

    /**
     * Renders the calendar into its designated DOM element.
     * * This method retrieves the generated calendar HTML element from `this.getCalendar()`
     * and injects its outer HTML into the element stored in `this.$el`.
     * * @throws {Error} Throws an error if `this.$el` is not a valid HTML element.
     */
    render() {
        this.$el.innerHTML = this.getCalendar().outerHTML;
    }
    
    /**
     * Creates and returns a DOM element representing the calendar for the current view (month or week).
     * * This method dynamically generates a calendar grid based on the `this.view` property. It includes headers for the weekdays
     * and a grid of days. It uses internal methods like `this.monthCalendar()` and `this.weekCalendar()` to get the date data.
     * The generated HTML element will have a class corresponding to the current view, e.g., 'month-calendar' or 'week-calendar'.
     *
     * @returns {HTMLDivElement} A div element containing the calendar grid.
     */
    getCalendar() {
        const calendar = (this.view === 'month') ? this.monthCalendar(true) : this.weekCalendar();
                
        const $calendar = document.createElement('div');
        $calendar.classList.add('calendar');
        $calendar.classList.add(`${this.view}-calendar`);

        // headers
        const weekdayFormater = new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',
        });

        for (const date of [...calendar].splice(0, 7)) {
            const $header = document.createElement('div');
            $header.classList.add('calendar-header');
            $header.textContent = weekdayFormater.format(date);
            $calendar.appendChild($header);
        }
        
        for (const date of calendar) {
            const $date = document.createElement('div');
            $date.classList.add('calendar-date');
            $date.setAttribute('data-date', date.toString())
            if (this.view === 'week' || this.withOtherMonthsDates || date.getMonth() === this.date.getMonth()) {
                this._renderDate($date, date)
            }
            $calendar.appendChild($date)
        }
        return $calendar;
    }

    /**
     * Renders the content for a single date element in the calendar.
     *
     * This private helper method sets the text content of a given HTML element to the date string.
     * It's designed to be called within a rendering loop. You can extend this method to handle
     * more complex rendering logic, such as adding specific CSS classes for today's date, events, etc.
     *
     * @private
     * @param {HTMLElement} $date The DOM element for the date.
     * @param {Date} date The Date object to be rendered.
     */
    _renderDate($date, date) {
        $date.textContent = date.toString();
    }

    /**
     * Advances the calendar to the next period (month or week) based on the current view.
     *
     * This method checks the `this.view` property to determine whether to call `this.nextMonth()` or `this.nextWeek()`.
     * After updating the internal date, it calls `this.render()` to update the displayed calendar.
     */
    next() {
        if (this.view === 'month') {
            this.nextMonth();
        } else if (this.view === 'week') {
            this.nextWeek();
        }
        this.render();
    }

    /**
     * Moves the calendar to the previous period (month or week) based on the current view.
     *
     * This method checks the `this.view` property to determine whether to call `this.previousMonth()` or `this.previousWeek()`.
     * After updating the internal date, it calls `this.render()` to update the displayed calendar.
     */
    previous() {
        if (this.view === 'month') {
            this.previousMonth();
        } else if (this.view === 'week') {
            this.previousWeek();
        }
        this.render();
    }

}