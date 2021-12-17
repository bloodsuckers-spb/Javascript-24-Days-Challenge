const ratingStars = document.getElementsByClassName("star");
const container = document.querySelector('.star-rating');

container.addEventListener('mouseover', handler);
container.addEventListener('mouseout', handler);

let initialClientX;

function handler(e) {
    const star = e.target.closest('.star');
     
    if (star) {
        if (e.type == 'mouseover') {
            initialClientX = e.clientX;
            htmlCollectionUpdate(star.dataset.index);
        }
        if (e.type == 'mouseout') {
            e.clientX < initialClientX && star.classList.remove('filled');
        }
    }
}


function htmlCollectionUpdate(x) {
    let i = 0;
    if (x < ratingStars.length) {
        let ind = ratingStars.length - 1;
        while (ind > x) {
        ratingStars[ind].classList.remove('filled');
        ind--;
    }
    }
    while (i <= x) {
        ratingStars[i].classList.add('filled');
        i++;
    }
}




