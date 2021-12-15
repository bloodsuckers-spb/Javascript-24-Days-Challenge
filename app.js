const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const wrapper = document.querySelector('.wrapper');
const calendarTitle = document.querySelector('.month');

const currentDate = new Date();
const currentDay = new Date().getDate();
const currentYear = currentDate.getFullYear();
const currentMonthInd = currentDate.getMonth();

let year;
let monthInd;

function createCurrentDateCalendar() {
    const cells = document.getElementsByClassName('cell');
    for (let el of cells) {
        el.remove();
    }
    year = currentDate.getFullYear();
    monthInd = currentDate.getMonth();
    const d = new Date(year, monthInd);
    calendarTitle.textContent = `${year} - ${monthsArr[monthInd]}`;
    
    for (let i = 0; i < d.getDay(); i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        wrapper.append(div);
    }

     while (d.getMonth() === currentMonthInd) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.textContent = d.getDate();
        if (d.getDate() === currentDay) div.classList.add('today');
        wrapper.append(div);
        d.setDate(d.getDate() + 1);
     }
}

function createCalendar() {
    const cells = document.getElementsByClassName('cell');
    for (let el of cells) {
        el.remove();
    }
}


document.addEventListener("DOMContentLoaded", createCurrentDateCalendar);

wrapper.addEventListener('click', function(e) {
    
    if (e.target.closest('.previous')) {
        console.log('previousArrow');
        monthInd--;
        if (monthInd < 0) {
            monthInd = monthsArr.length - 1;
            year--;
        }
        calendarTitle.textContent = `${year} - ${monthsArr[monthInd]}`;
        //если год и месяц соответствуют текущим запускаем createCurrentDateCalendar
        if (year === currentYear && monthInd === currentMonthInd) createCurrentDateCalendar();
        else createCalendar();
    }
    
    if (e.target.closest('.next')) {
        console.log('nextArrow')
        monthInd++;
        if (monthInd === monthsArr.length) {
            monthInd = 0;
            year++;
        } 
        calendarTitle.textContent = `${year} - ${monthsArr[monthInd]}`;
        console.log(year)
        if (year === currentYear && monthInd === currentMonthInd) createCurrentDateCalendar();
        else createCalendar();
        
    }
});
