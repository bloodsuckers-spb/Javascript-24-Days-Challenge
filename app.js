const password = new Array(4).fill('1');

const verification = {
    "verification_1": 0,
    "verification_2": 1,
    "verification_3": 2,
    "verification_4": 3
};

document.querySelector('form').addEventListener('click', function(e){
    e.preventDefault();
    const input = e.target.closest('input');
    const button = e.target.closest('button');

    if (input) onInput(input);
    
    if (button) {
        e.preventDefault();
        console.log(password);
    }

});

    function onInput(el) { 
        el.addEventListener('input', function() {
            this.value = this.value.replace(/\D/, '');
            password[verification[this.name]] = this.value;
            if (el.value.length && el.nextElementSibling) {
                el.nextElementSibling.focus();
                onInput(el.nextElementSibling);
             }
        });
}



