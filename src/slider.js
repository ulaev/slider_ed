'use strict';

class slider {
    static init({ id, width = 800, height = 600 }) {
        ((id, width, height) => {
            let paly = false;
            let timer = null;
            let lock = false;

            const moveLeftHideClassName = 'slide-move-left-hide';
            const moveRightHideClassName = 'slide-move-right-hide';
            const moveLeftShowClassName = 'slide-move-left-show';
            const moveRightShowClassName = 'slide-move-right-show';

            let slideIdex = 0;
            let slidesArr = [];

            var slidesDiv = pretreatment(id);
            treatment(slidesDiv);
            render(slideIdex);

            function pretreatment(id) {
                const containerDiv = document.getElementById(id);
                const slidesDiv = document.createElement("div");

                containerDiv.style.height = height + 'px';
                containerDiv.style.width = width + 'px';
                slidesDiv.style.height = height + 'px';
                slidesDiv.style.width = width + 'px';

                containerDiv.classList.add('container');
                slidesDiv.classList.add('slides');

                while (containerDiv.firstChild) {
                    slidesDiv.appendChild(containerDiv.firstChild);
                }

                for (let index = 0; index < slidesDiv.children.length; index++) {
                    slidesDiv.children[index].classList.add('slide');
                    slidesDiv.children[index].style.width = width + 'px';
                    slidesDiv.children[index].style.height = height + 'px';
                }

                containerDiv.appendChild(slidesDiv);

                const left = document.createElement('a');
                left.classList.add('slide-button', 'slide-button-left');
                left.style.height = height / 2 + 'px';
                left.style.paddingTop = height / 2 + 'px';
                left.innerHTML = '&lt;';
                left.onclick = () => { !paly ? moveLeft() : {} };

                const right = document.createElement('a');
                right.classList.add('slide-button', 'slide-button-right');
                right.style.height = height / 2 + 'px';
                right.style.paddingTop = height / 2 + 'px';
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

            function treatment(slidesDiv) {
                for (let i = 0; i < slidesDiv.children.length; i++) {
                    slidesArr[i] = slidesDiv.children[i];

                    slidesArr[i].addEventListener('animationstart', function () {
                        lock = true;
                    });

                    slidesArr[i].addEventListener('animationend', function () {
                        lock = false;
                    });
                }
            }

            function render(index) {
                console.log(index);
                for (let i = 0; i < slidesArr.length; i++) {
                    // slidesArr[i].style.display = 'none';
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
                changeSlideIndex(-1)
                setClass(slidesArr[slideIdex], moveLeftShowClassName);
                render(slideIdex);
            }

            function moveRight() {
                if (lock) {
                    return;
                }
                setClass(slidesArr[slideIdex], moveRightHideClassName);
                changeSlideIndex(+1)
                setClass(slidesArr[slideIdex], moveRightShowClassName);
                render(slideIdex);
            }

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

            function playPause(el) {
                paly = !paly;
                paly ? el.currentTarget.classList.add('paused') : el.currentTarget.classList.remove('paused');

                if (paly) {
                    timer = setInterval(function () { moveRight() }, 2000);
                } else {
                    clearInterval(timer);
                }
            }
        })(id, width, height);
    }
}