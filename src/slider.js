'use strict';

function slider(id) {
    let slideIdex = 0;
    let slidesArr = [];

    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    const slidesElement = document.getElementById(id);

    leftButton.onclick = moveLeft;
    rightButton.onclick = moveRight;

    for (let i = 0; i < slidesElement.children.length; i++) {
        slidesArr[i] = slidesElement.children[i];
    }

    render(slideIdex);

    function render(index){
        console.log(index);
        for (let i = 0; i < slidesArr.length; i++) {
            slidesArr[i].style.display = 'none';
        }

        slidesArr[index].style.display = 'block';
    }

    function moveLeft() {
        render(changeSlideIndex(-1));
    }

    function moveRight() {
        render(changeSlideIndex(+1));
    }

    function changeSlideIndex(offset){
        slideIdex += offset;
        
        if (slideIdex > slidesArr.length -1){
            slideIdex = 0;
        }

        if (slideIdex < 0 ){
            slideIdex = slidesArr.length - 1;
        }

        return slideIdex;
    }
}