'use strict';
/**
 * @fileoverview A class to manage calendars.
 * @class Calendar
 * @description Represents a calendar with methods to navigate months and week calendar data.
 */
class Calendar {
/**
     * Creates an instance of Calendar.
     * @param {object} [options={}] An object containing configuration options.
     * @param {number} [options.firstWeekday=0] The first day of the week (0 for Sunday, 1 for Monday, etc.).
     * @param {Date} [options.initialDate=new Date()] The initial date to start the calendar on.
     * @throws {Error} If `firstWeekday` is not between 0 and 6.
     */
    constructor(options) {
        this.options = {...this._getDefaultOptions(), ...options}
        const {firstWeekday, initialDate, withOtherMonthsDates, ...otherOptions} = this.options;

        if (0 > firstWeekday || firstWeekday > 6) throw Error("Week day must be between 0 and 6.");
        
        this.firstWeekday = firstWeekday;
        this.lastWeekday = (this.firstWeekday == 0) ? 6 : this.firstWeekday - 1;
        
        this.date = new Date(initialDate);

        this.withOtherMonthsDates = withOtherMonthsDates;
    }

    //_parseOptions()

    /**
     * Returns the default options for the Calendar class.
     * @returns {object} The default options object.
     */
    _getDefaultOptions() {
        return {
            firstWeekday: 0,
            initialDate: new Date(),
            withOtherMonthsDates: true,
        }
    }
    
    /**
     * Gets the dates for the current month's calendar.
     *
     * This method is a public-facing wrapper for the private `_monthCalendar` method.
     * It uses the internal `this.date` property to determine the year and month.
     *
     * @param {boolean} [withOtherMonthsDates=true] If true, includes dates from the previous and next months to complete the calendar grid. Defaults to the class property `this.withOtherMonthsDates`.
     * @returns {Date[]} An array of Date objects representing the calendar for the current month.
     */
    monthCalendar(withOtherMonthsDates=this.withOtherMonthsDates) {
       return this._monthCalendar(this.date.getFullYear(), this.date.getMonth(), withOtherMonthsDates) 
    }

    /**
     * Gets the dates for the calendar week containing the current date.
     *
     * This method is a public-facing wrapper for the private `_weekCalendar` method.
     * It uses the internal `this.date` property to determine the week.
     *
     * @returns {Date[]} An array of Date objects representing the calendar week of the current date.
     */
    weekCalendar() {
        return this._weekCalendar(this.date);
    }

    /**
     * Moves the calendar to the next week.
     */
    nextWeek() {
        const date = new Date(this.date);
        date.setDate(date.getDate() + 7);
        this.date = date;
    }

    /**
     * Moves the calendar to the next month.
     */
    nextMonth() {
        const date = new Date(this.date);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        this.date = date;
    }

    /**
     * Moves the calendar to the previous week.
     */
    previousWeek() {
        const date = new Date(this.date);
        date.setDate(date.getDate() - 7);
        this.date = date;
    }

    /**
     * Moves the calendar to the previous month.
     */
    previousMonth() {
        const date = new Date(this.date);
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
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
    _monthCalendar(year, month, withOtherMonthsDates=true)  {        
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
        const previousMonthDates = this._getStartOfWeek(firstDate);

        // Next month overlapping
        const nextMonthDates = this._getEndOfWeek(lastDate);
        
        return [...previousMonthDates, ...monthDates, ...nextMonthDates]
    }

     /**
     * Generates an array of Date objects for a single calendar week, including days from the previous and next months that overlap with the week of the given date.
     * * This method uses the `_getStartOfWeek` and `_getEndOfWeek` helper methods to calculate the dates that fall outside of the current month but within the same calendar week.
     * @private
     * @param {Date} date The Date object for which to generate the calendar week.
     * @returns {Date[]} An array of Date objects representing a full calendar week.
     */
    _weekCalendar(date)  {        
        // Previous month overlapping
        const previousDates = this._getStartOfWeek(date);

        // Next month overlapping
        const nextDates = this._getEndOfWeek(date);
        
        return [...previousDates, date, ...nextDates]
    }


    /**
     * @private
     * Generates an array of Date objects for the remaining days of the week, starting from the day after the initialDate.
     * * The week's end is determined by the `this.lastWeekday` property. If the initialDate is already the last weekday,
     * an empty array is returned. The method clones the initialDate to avoid modifying the original date object.
     * * @param {Date} initialDate - The starting date to find the end of the week from.
     * @returns {Date[]} An array of Date objects representing the days until the end of the week.
     */
    _getEndOfWeek(initialDate) {
        const endOfWeek = [];
        if (initialDate.getDay() != this.lastWeekday) {
            let date = new Date(initialDate);
            while (date.getDay() != this.lastWeekday) {
                date = new Date(date);
                date.setDate(date.getDate() + 1);
                endOfWeek.push(date);
            }
        }
        return endOfWeek;
    }

    /**
     * @private
     * Generates an array of Date objects for the days leading up to the start of the week.
     * * The week's start is determined by the `this.firstWeekday` property. If the initialDate is already the first weekday,
     * an empty array is returned. The method clones the initialDate to avoid modifying the original date object.
     * The resulting array is reversed to present the dates in chronological order.
     * * @param {Date} initialDate - The starting date to find the beginning of the week from.
     * @returns {Date[]} An array of Date objects representing the days from the beginning of the week up to, but not including, the initialDate.
     */
    _getStartOfWeek(initialDate) {
        const startOfWeek = [];
        if (initialDate.getDay() != this.firstWeekday) {
            let date = new Date(initialDate);
            while (date.getDay() != this.firstWeekday) {
                date = new Date(date);
                date.setDate(date.getDate() - 1);
                startOfWeek.push(date);
            }
        }
        startOfWeek.reverse();
        return startOfWeek;
    }
}