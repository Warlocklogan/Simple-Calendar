// Month Calendar demo
const monthCalendar = new CalendarRenderer({
    $el: document.getElementById('month-calendar'),
});

const $prevMonthButton = document.querySelector('.month-calendar-control .prev');
const $nextMonthButton = document.querySelector('.month-calendar-control .next');

$prevMonthButton.addEventListener('click', (event) => {
    event.preventDefault();
    monthCalendar.previous();
});

$nextMonthButton.addEventListener('click', (event) => {
    event.preventDefault();
    monthCalendar.next();
});

// Week Calendar demo
const weekCalendar = new CalendarRenderer({
    $el: document.getElementById('week-calendar'),
    view: 'week',
});

const $prevWeekButton = document.querySelector('.week-calendar-control .prev');
const $nextWeekButton = document.querySelector('.week-calendar-control .next');

$prevWeekButton.addEventListener('click', (event) => {
    event.preventDefault();
    weekCalendar.previous();
});

$nextWeekButton.addEventListener('click', (event) => {
    event.preventDefault();
    weekCalendar.next();
});

$prevButton.addEventListener('click', (event) => {
    event.preventDefault();
    calendar.previous();
});

$nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    calendar.next();
});
