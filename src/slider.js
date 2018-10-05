'use strict';

function slider(id) {
    const moveLeftHideClassName = 'slide-move-left-hide';
    const moveRightHideClassName = 'slide-move-right-hide';
    const moveLeftShowClassName = 'slide-move-left-show';
    const moveRightShowClassName = 'slide-move-right-show';

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
            // slidesArr[i].style.display = 'none';
            slidesArr[i].style.zIndex = 0;
        }

        // slidesArr[index].style.display = 'block';
        slidesArr[index].style.zIndex = 1;
    }

    function moveLeft() {
        setClass(slidesArr[slideIdex], moveLeftHideClassName);
        render(changeSlideIndex(-1)); 
        setClass(slidesArr[slideIdex], moveLeftShowClassName);
        
    }

    function moveRight() {
        setClass(slidesArr[slideIdex], moveRightHideClassName);
        render(changeSlideIndex(+1));
        setClass(slidesArr[slideIdex], moveRightShowClassName);
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

    function setClass(el, className){
        el.classList.remove(moveLeftHideClassName);
        el.classList.remove(moveRightHideClassName);
        el.classList.remove(moveLeftShowClassName);
        el.classList.remove(moveRightShowClassName);

        el.classList.add(className);
    }
}