$(document).ready(function () {
    $('.services-slider').slick({
        focusOnSelect: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,

        responsive: [{
                breakpoint: 1180,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
        ]
    });


    $('.main-slider').slick({
        focusOnSelect: true,
        infinite: false,
        slidesToShow: 6,
        draggable: false,
        asNavFor: '.slider',
        arrows: false,
        variableWidth: true,
    });
});


$(document).ready(function () {

    const sliderItems = document.querySelectorAll('.slider__item'); //пункты внешнего слайдера
    const amountSliderItems = sliderItems.length; // количество внешних слайдов
    const speedSlide = 10000; //время на одном сторис-слайде

    //элементы для работы с popup
    const popupSliderCloseBtnList = document.querySelectorAll('.popup__close');
    const popupSliderOpenBtnList = document.querySelectorAll('.main-slider__img');
    const popupSlider = document.querySelector('.popup');


    $('.slider').slick({
        centerMode: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        centerPadding: '25%',
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: 0,
        autoplay: false,
    });



    //скорость внешнего слайдера
    function speedSlider() {
        if (popupSlider.classList.contains('popup--is-opened')) {
            $('.slider').slick('slickSetOption', 'speed', 300, true);
        } else {
            $('.slider').slick('slickSetOption', 'speed', 0, true);
        }
    }

    //время внешнего таймера на один слайд по умолчанию
    function outerSliderTime() {
        let time = 0;
        sliderItems.forEach(item => {
            if (item.classList.contains('slick-center')) {
                const images = item.querySelectorAll('.block__img');
                time = images.length * speedSlide;
            }
        })
        return time
    }



    //активность кнопки назад
    function activeButtonPrev(item) {
        const buttonPrev = item.querySelector('.block__button--prev');
        const imagesBlock = item.querySelector('.block__container');

        if (imagesBlock.offsetLeft === 0) {
            buttonPrev.setAttribute('disabled', true);
            buttonPrev.classList.add('disabled');
        } else {
            buttonPrev.removeAttribute('disabled');
            buttonPrev.classList.remove('disabled');
        }
    }

    //активность кнопки вперед
    function activeButtonNext(item) {
        const buttonNext = item.querySelector('.block__button--next');
        const imagesBlock = item.querySelector('.block__container');
        const images = imagesBlock.querySelectorAll('.block__img');
        const slideWidth = item.querySelector('.block').offsetWidth; //ширина слайда
        const amountImg = images.length; //количество слайдов
        const fullWidth = (amountImg - 1) * slideWidth; //длина для полного смещения

        if (imagesBlock.offsetLeft === (-fullWidth)) {
            buttonNext.setAttribute('disabled', true);
            buttonNext.classList.add('disabled');
        } else {
            buttonNext.removeAttribute('disabled');
            buttonNext.classList.remove('disabled');
        }
    }

    //активность слайда и точки
    function addActive(item) {
        const imagesBlock = item.querySelector('.block__container');
        const images = imagesBlock.querySelectorAll('.block__img');
        const dots = item.querySelectorAll('.block__dot');

        images.forEach((img, i) => {
            if (img.offsetLeft === (imagesBlock.offsetLeft * (-1))) {

                img.classList.add('active');

                dots.forEach((dot, j) => {
                    if (i === j) {
                        dot.classList.add('active');
                        dot.classList.remove('next');
                        dot.classList.remove('prev');
                    } else if (j < i) {
                        dot.classList.add('prev');
                        dot.classList.remove('active');
                        dot.classList.remove('next');
                    } else if (j > i) {
                        dot.classList.add('next');
                        dot.classList.remove('active');
                        dot.classList.remove('prev');
                    }
                })
            } else {
                img.classList.remove('active')
            }
        })
    }

    //анимация точек
    function animationDots(item) {
        const dots = item.querySelectorAll('.block__dot');
        dots.forEach(dot => {
            if (dot.classList.contains('active')) {
                dot.style.backgroundPosition = 'left';
            } else if (dot.classList.contains('prev')) {
                dot.style.backgroundPosition = 'right';
            } else if (dot.classList.contains('next')) {
                dot.style.backgroundPosition = 'right';
            }
        })
    }

    //время слайд шоу после нажатия кнопки назад
    function clickActiveTimerPrev(item) {
        const imagesBlock = item.querySelector('.block__container');
        const images = imagesBlock.querySelectorAll('.block__img');
        const amountImg = images.length; //количество слайдов
        let timeForTimer = amountImg * speedSlide - 1; //время полного слайд шоу

        let count = 0;
        images.forEach((img, i) => {

            if (img.classList.contains('active')) {
                count = timeForTimer - (speedSlide * (i - 1));
            }
        })
        return count
    }


    //время слайд шоу после нажатия кнопки вперед
    function clickActiveTimerNext(item) {
        const imagesBlock = item.querySelector('.block__container');
        const images = imagesBlock.querySelectorAll('.block__img');
        const amountImg = images.length; //количество слайдов
        let timeForTimer = amountImg * speedSlide - 1; //время полного слайд шоу
        let count = 0;
        images.forEach((img, i) => {

            if (img.classList.contains('active')) {
                count = timeForTimer - (speedSlide * (i + 1));
            }

        })
        return count
    }

    //время полного слайд шоу для одного сторис
    function timeFullSlideShow(item) {
        const imagesBlock = item.querySelector('.block__container');
        const images = imagesBlock.querySelectorAll('.block__img');
        const amountImg = images.length; //количество слайдов
        let timeForTimer = amountImg * speedSlide - 1; //время полного слайд шоу
        return timeForTimer
    }

    //активность кнопок для смены внешних слайдов
    function activeBtnOuterSlider(item) {
        if ($('.slider').slick('slickCurrentSlide') === 0) {
            activeButtonPrev(item);
        } else if ($('.slider').slick('slickCurrentSlide') === (amountSliderItems - 1)) {
            activeButtonNext(item);
        }
    }


    //запуск таймера и функций для центрального слайда
    function activeCenterTimer() {
        sliderItems.forEach(item => {
            const buttonPrev = item.querySelector('.block__button--prev');
            const buttonNext = item.querySelector('.block__button--next');
            const imagesBlock = item.querySelector('.block__container');
            const images = item.querySelectorAll('.block__img');
            const time = images.length * speedSlide; //время внешнего таймера на один слайд по умолчанию

            const slideWidth = item.querySelector('.block').offsetWidth; //ширина слайда
            const dots = item.querySelectorAll('.block__dot');

            if (item.classList.contains('slick-center')) {
                imagesBlock.style.left = '0px';
                addActive(item);
                animationDots(item);
                buttonPrev.removeAttribute('disabled');
                buttonNext.removeAttribute('disabled');
                activeBtnOuterSlider(item);

                clearInterval(window.timerSlideShow);
                clearTimeout(window.timerStop);

                clearTimeout(window.outerTimerStop);

                //внутренний таймер
                window.timerSlideShow = setInterval(() => {
                    imagesBlock.style.left = (parseInt(imagesBlock.style.left) - slideWidth) + 'px';
                    addActive(item);
                    animationDots(item);
                    activeBtnOuterSlider(item);
                }, speedSlide);

                window.timerStop = setTimeout(() => {
                    clearInterval(window.timerSlideShow);
                }, timeFullSlideShow(item));

                //внешний таймер
                window.outerTimerStop = setTimeout(() => {
                    $('.slider').slick('slickNext');
                }, time);


            } else {
                imagesBlock.style.left = '0px';
                dots.forEach((dot) => {
                    dot.classList.remove('active');
                    dot.classList.add('next');
                    dot.classList.remove('prev');
                })
                animationDots(item);
                buttonPrev.setAttribute('disabled', true);
                buttonNext.setAttribute('disabled', true);
            }
        })
    }







    //кнопки
    sliderItems.forEach((item, i) => {
        const buttonPrev = item.querySelector('.block__button--prev');
        const buttonNext = item.querySelector('.block__button--next');
        const imagesBlock = item.querySelector('.block__container');
        const slideWidth = item.querySelector('.block').offsetWidth; //ширина слайда

        const images = imagesBlock.querySelectorAll('.block__img');
        const amountImg = images.length; //количество слайдов
        const fullWidth = (amountImg - 1) * slideWidth; //длина для полного смещения

        //назад
        buttonPrev.addEventListener('click', () => {
            imagesBlock.style.left = (parseInt(imagesBlock.style.left) + slideWidth) + 'px';
            let timeAfterClickPrev = clickActiveTimerPrev(item); //обязательно первая
            addActive(item);
            animationDots(item);
            activeBtnOuterSlider(item);

            clearInterval(window.timerSlideShow);
            clearTimeout(window.timerStop);

            clearTimeout(window.outerTimerStop);


            window.timerSlideShow = setInterval(() => {
                imagesBlock.style.left = (parseInt(imagesBlock.style.left) - slideWidth) + 'px';
                addActive(item);
                animationDots(item);
                activeBtnOuterSlider(item);
            }, speedSlide);

            window.timerStop = setTimeout(() => {
                clearInterval(window.timerSlideShow);
            }, timeAfterClickPrev);


            //изменение время для autoplay внешнего слайдера
            window.outerTimerStop = setTimeout(() => {
                $('.slider').slick('slickNext');
            }, timeAfterClickPrev);

            //переходим на передыдущий внешний слайд
            if (imagesBlock.offsetLeft === slideWidth) {
                $('.slider').slick('slickPrev');
            }

            //смена таймера закрытия popup
            if (i === (amountSliderItems - 1)) {
                clearInterval(window.lastSlideTimer);

                window.lastSlideTimer = setTimeout(() => {
                    closePopup(popupSlider);
                }, timeAfterClickPrev);
            }
        })

        //вперед
        buttonNext.addEventListener('click', () => {
            imagesBlock.style.left = (parseInt(imagesBlock.style.left) - slideWidth) + 'px';
            let timeAfterClickNext = clickActiveTimerNext(item); //обязательно первая
            addActive(item);
            animationDots(item);
            activeBtnOuterSlider(item);

            clearInterval(window.timerSlideShow);
            clearTimeout(window.timerStop);

            clearTimeout(window.outerTimerStop);

            window.timerSlideShow = setInterval(() => {
                imagesBlock.style.left = (parseInt(imagesBlock.style.left) - slideWidth) + 'px';
                addActive(item);
                animationDots(item);
                activeBtnOuterSlider(item);
            }, speedSlide);

            window.timerStop = setTimeout(() => {
                clearInterval(window.timerSlideShow);
            }, timeAfterClickNext);


            //изменение время для autoplay внешнего слайдера
            window.outerTimerStop = setTimeout(() => {
                $('.slider').slick('slickNext');
            }, timeAfterClickNext);

            //переходим на следующий внешний слайд
            if (imagesBlock.offsetLeft === (-fullWidth - slideWidth)) {
                $('.slider').slick('slickNext');
            }

            //смена таймера закрытия popup
            if (i === (amountSliderItems - 1)) {
                clearInterval(window.lastSlideTimer);

                window.lastSlideTimer = setTimeout(() => {
                    closePopup(popupSlider);
                }, timeAfterClickNext);
            }
        })
    })


    activeCenterTimer();

    speedSlider();


    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        speedSlider();
        activeCenterTimer();
        clearInterval(window.lastSlideTimer);

        if (currentSlide === (amountSliderItems - 1)) {
            clearInterval(window.lastSlideTimer);

            window.lastSlideTimer = setTimeout(() => {
                closePopup(popupSlider);
            }, outerSliderTime());
        }
    });



    // function handleResize() {
    //     activeCenterTimer();

    // }

    // let timeOutFunctionId;
    // window.addEventListener('resize', () => {
    //     clearTimeout(timeOutFunctionId);
    //     timeOutFunctionId = setTimeout(handleResize, 500);
    // })





    //функция закрытия popup
    function closePopup(popup) {
        popup.classList.remove('popup--is-opened');
        document.removeEventListener('keydown', closeByEsc);
        clearInterval(window.lastSlideTimer);
        speedSlider();
    }

    // закрытие popup по Esc
    function closeByEsc(evt) {
        const popupIsOpened = document.querySelector('.popup--is-opened');
        if (evt.key === 'Escape') {
            closePopup(popupIsOpened);
        }
    }

    //функция открытия popup
    function openPopup(popup) {
        popup.classList.add('popup--is-opened');
        document.addEventListener('keydown', closeByEsc);
    }

    popupSliderOpenBtnList.forEach(popupSliderOpenBtn => {
        popupSliderOpenBtn.addEventListener('click', () => {
            openPopup(popupSlider);
        });
    });

    popupSliderCloseBtnList.forEach(popupSliderCloseBtn => {
        popupSliderCloseBtn.addEventListener('click', () => {
            closePopup(popupSlider);
        });
    });
});