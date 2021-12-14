document.querySelector('.fields').addEventListener('click', function(e){
    const input = e.target.closest('input');
    if (input) onInput(input);
});

    function onInput(el) { 
        el.addEventListener('input', function() {
            this.value = this.value.replace(/\D/, '');
            if (el.value.length && el.nextElementSibling) {
                el.nextElementSibling.focus();
                onInput(el.nextElementSibling);
             }
        });
}



