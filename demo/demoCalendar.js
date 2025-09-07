const locale = 'en-US';
const monthFormater = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
})

// Month Calendar demo
const monthCalendar = new CalendarRenderer({
    locale,
    $el: document.getElementById('month-calendar'),
});

const $prevMonthButton = document.querySelector('.month-calendar-control .prev');
const $monthTitle = document.querySelector('.month-calendar-control .title');
const $nextMonthButton = document.querySelector('.month-calendar-control .next');

$monthTitle.textContent = monthFormater.format(monthCalendar.date);

$prevMonthButton.addEventListener('click', (event) => {
    event.preventDefault();
    monthCalendar.previous();
    $monthTitle.textContent = monthFormater.format(monthCalendar.date);
});

$nextMonthButton.addEventListener('click', (event) => {
    event.preventDefault();
    monthCalendar.next();
    $monthTitle.textContent = monthFormater.format(monthCalendar.date);
});

// Week Calendar demo
const weekCalendar = new CalendarRenderer({
    locale,
    $el: document.getElementById('week-calendar'),
    view: 'week',
});

const $prevWeekButton = document.querySelector('.week-calendar-control .prev');
const $weekTitle = document.querySelector('.week-calendar-control .title');
const $nextWeekButton = document.querySelector('.week-calendar-control .next');

$weekTitle.textContent = monthFormater.format(weekCalendar.date);

$prevWeekButton.addEventListener('click', (event) => {
    event.preventDefault();
    weekCalendar.previous();
    $weekTitle.textContent = monthFormater.format(weekCalendar.date);
});

$nextWeekButton.addEventListener('click', (event) => {
    event.preventDefault();
    weekCalendar.next();
    $weekTitle.textContent = monthFormater.format(weekCalendar.date);
});
