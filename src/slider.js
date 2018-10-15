'use strict';

class slider {
    static init({ id, width = 800, height = 600 }) {
        let paly = false;
        let timer = null;
        let lock = false;

        const moveLeftHideClassName = 'slide-move-left-hide';
        const moveRightHideClassName = 'slide-move-right-hide';
        const moveLeftShowClassName = 'slide-move-left-show';
        const moveRightShowClassName = 'slide-move-right-show';

        let slideIdex = 0;
        const slidesArr = [];

        function changeSlideIndex(offset) {
            slideIdex += offset;

            if (slideIdex > slidesArr.length - 1) {
                slideIdex = 0;
            }

            if (slideIdex < 0) {
                slideIdex = slidesArr.length - 1;
            }

            return slideIdex;
        }

        function setClass(el, className) {
            el.classList.remove(moveLeftHideClassName);
            el.classList.remove(moveRightHideClassName);
            el.classList.remove(moveLeftShowClassName);
            el.classList.remove(moveRightShowClassName);

            el.classList.add(className);
        }

        function render(index) {
            console.log(index);
            for (let i = 0; i < slidesArr.length; i++) {
                slidesArr[i].style.zIndex = 0;
            }

            // slidesArr[index].style.display = 'block';
            slidesArr[index].style.zIndex = 1;
        }

        function moveLeft() {
            if (lock) {
                return;
            }
            setClass(slidesArr[slideIdex], moveLeftHideClassName);
            changeSlideIndex(-1);
            setClass(slidesArr[slideIdex], moveLeftShowClassName);
            render(slideIdex);
        }

        function moveRight() {
            if (lock) {
                return;
            }
            setClass(slidesArr[slideIdex], moveRightHideClassName);
            changeSlideIndex(+1);
            setClass(slidesArr[slideIdex], moveRightShowClassName);
            render(slideIdex);
        }

        function playPause(el) {
            paly = !paly;
            paly ? el.currentTarget.classList.add('paused') : el.currentTarget.classList.remove('paused');

            if (paly) {
                timer = setInterval(() => { moveRight(); }, 2000);
            } else {
                clearInterval(timer);
            }
        }

        function pretreatment(idEl) {
            const containerDiv = document.getElementById(idEl);
            const slidesDiv = document.createElement('div');

            containerDiv.style.height = `${height}px`;
            containerDiv.style.width = `${width}px`;
            slidesDiv.style.height = `${height}px`;
            slidesDiv.style.width = `${width}px`;

            containerDiv.classList.add('container');
            slidesDiv.classList.add('slides');

            while (containerDiv.firstChild) {
                slidesDiv.appendChild(containerDiv.firstChild);
            }

            for (let index = 0; index < slidesDiv.children.length; index++) {
                slidesDiv.children[index].classList.add('slide');
                slidesDiv.children[index].style.width = `${width}px`;
                slidesDiv.children[index].style.height = `${height}px`;
            }

            containerDiv.appendChild(slidesDiv);

            const left = document.createElement('a');
            left.classList.add('slide-button', 'slide-button-left');
            left.style.height = `${height / 2}px`;
            left.style.paddingTop = `${height / 2}px`;
            left.innerHTML = '&lt;';
            left.onclick = () => { !paly ? moveLeft() : {} };

            const right = document.createElement('a');
            right.classList.add('slide-button', 'slide-button-right');
            right.style.height = `${height / 2}px`;
            right.style.paddingTop = `${height / 2}px`;
            right.innerHTML = '&gt';
            right.onclick = () => { !paly ? moveRight() : {} };

            containerDiv.appendChild(left);
            containerDiv.appendChild(right);

            const palyPauseButton = document.createElement('div');
            palyPauseButton.classList.add('paly-pause-button');
            containerDiv.appendChild(palyPauseButton);
            palyPauseButton.onclick = playPause;

            return slidesDiv;
        }

        function setLock(state) {
            lock = state;
        }

        function treatment(slidesDivEl) {
            for (let i = 0; i < slidesDivEl.children.length; i++) {
                slidesArr[i] = slidesDivEl.children[i];
                slidesArr[i].addEventListener('animationstart', setLock(true));
                slidesArr[i].addEventListener('animationend', setLock(false));
            }
        }

        const slidesDiv = pretreatment(id);
        treatment(slidesDiv);
        render(slideIdex);
    }
}

export default slider;
