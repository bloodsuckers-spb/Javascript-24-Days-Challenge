document.querySelector('.fields').addEventListener('click', function(e){
    const input = e.target.closest('input');
    if (input) keypress(input);
});


    function keypress(el) {
        
        el.addEventListener('keypress', function(e) {
            
            this.value = e.key
           
            if (isNaN(e.key)) {
               this.value = this.value.replace(/\D/, '');
            } 

            else {
                if (el.nextElementSibling) {
                    el.nextElementSibling.focus();
                     keypress(el.nextElementSibling);
                 }
            }
              
        });
}

