const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const wrapper = document.querySelector('.wrapper');
const calendarTitle = document.querySelector('.month');

const currentDate = new Date();
const currentDay = new Date().getDate();

let year;
let currentMonthInd;

(function createCurrentDateCalendar() {
    year = currentDate.getFullYear();
    currentMonthInd = currentDate.getMonth();
    const d = new Date(year, currentMonthInd);
    calendarTitle.textContent = `${year} - ${monthsArr[currentMonthInd]}`;
    
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
}());


wrapper.addEventListener('click', function(e) {
    
    if (e.target.closest('.previous')) {
        console.log('previousArrow');
        currentMonthInd--;
        if (currentMonthInd < 0) {
            currentMonthInd = monthsArr.length - 1;
            year--;
        }
        calendarTitle.textContent = `${year} - ${monthsArr[currentMonthInd]}`;
    }
    
    if (e.target.closest('.next')) {
        console.log('nextArrow')
        currentMonthInd++;
        if (currentMonthInd === monthsArr.length) {
            currentMonthInd = 0;
            year++;
        } 
        calendarTitle.textContent = `${year} - ${monthsArr[currentMonthInd]}`;
        createCalendar();
    }
});

 function createCalendar() {
    const cells = document.getElementsByClassName('cell');
    for (let el of cells) {
        el.remove();
    }
}
