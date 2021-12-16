const button = document.querySelector('.start');
const btnTextContent = ['start', 'stop'];
const min = document.querySelector('.minutes > input');
const sec = document.querySelector('.seconds > input');
const ring = document.querySelector('.ring');
let timerId; 

document.querySelector('.timer').addEventListener('click', function(e) {
    const btn = e.target.closest('.start');
    const gear = e.target.closest('.settings');
    const seconds = e.target.closest('.seconds > input');

    if (btn) {

        if (parseInt(min.value) === 0 && parseInt(sec.value) === 0) {
            return;
        }

        if (e.target.textContent === btnTextContent[0]) {
            e.target.textContent = btnTextContent[1];
            timerStart();
        }
        else {
            e.target.textContent = btnTextContent[0];
            timerStop();
        }
    }

    if (gear) {
        clearInterval(timerId)
        ring.classList.remove('ending');
        button.textContent = 'start';
        min.disabled = false;
        sec.disabled = false;
    }

   if (seconds) {
       e.target.addEventListener("input", ()=> {
          if (e.target.value > 59) e.target.value = 59;
       })
   }

    function timerStart () {
        ring.classList.remove('ending');
        min.disabled = true;
        sec.disabled = true;
        timerId  = setInterval( function() {
            if (parseInt(min.value) === 0 && parseInt(sec.value) === 0) {
                timerStop();
                ring.classList.add('ending');
                return;
            }

            if (sec.value == 0) {
                sec.value = 60;
            min.value--;
            }
        sec.value--;
        
        if (sec.value.length < 2) sec.value = '0' + sec.value;
        if (min.value.length < 2) min.value = '0' + min.value;
        }, 1000);
    }
    
    function timerStop () {
        clearInterval(timerId);
    }
});