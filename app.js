const password = [1];

document.querySelector('form').addEventListener('click', function(e){
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
            password.push(this.value);
            console.log(this.value);
            if (el.value.length && el.nextElementSibling) {
                el.nextElementSibling.focus();
                onInput(el.nextElementSibling);
             }
        });
}



