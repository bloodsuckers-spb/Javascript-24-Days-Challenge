document.querySelector('.fields').addEventListener('click', function(e){
    const input = e.target.closest('input');
    if (input) keypress(input);
});

function keypress(arg) {
    arg.addEventListener('keypress', function(e) {
        console.log('keypress');
        e.target.value =  e.key.toString();
        console.log(this);
    });
}