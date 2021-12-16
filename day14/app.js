const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const wrapper = document.querySelector('.wrapper');
const calendarTitle = document.querySelector('.month');

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();
const currentMonthInd = currentDate.getMonth();

let titleYear = currentYear;
let titleMonthInd = currentMonthInd;

function arrowClick(e) {
    if (e.target.closest('.previous')) {
        titleMonthInd--;
        if (titleMonthInd < 0) {
            titleMonthInd = monthsArr.length - 1;
            titleYear--;
        }
    }
    
    if (e.target.closest('.next')) {
        titleMonthInd++;
        if (titleMonthInd === monthsArr.length) {
            titleMonthInd = 0;
            titleYear++;
        } 
    }
    createDateCalendar(e);
}

function createDateCalendar(e) {
    const d = new Date(titleYear, titleMonthInd);
    calendarTitle.textContent = `${titleYear} - ${monthsArr[titleMonthInd]}`;
    
    if (e.type !== 'DOMContentLoaded') {
        document.querySelectorAll('.cell').forEach(el => el.remove());
    } 
    
    for (let i = 0; i < d.getDay(); i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        wrapper.append(div);
    }

     while (d.getMonth() === titleMonthInd) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.textContent = d.getDate();
        if (d.getDate() === currentDay && titleYear === currentYear && titleMonthInd === currentMonthInd) {
            div.classList.add('today');
        } 
        wrapper.append(div);
        d.setDate(d.getDate() + 1);
     }
}

document.addEventListener("DOMContentLoaded", createDateCalendar);
wrapper.addEventListener('click', arrowClick);