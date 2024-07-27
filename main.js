document.addEventListener('DOMContentLoaded', function() {
    const productsTitle = document.getElementById('productsTitle');
    const offersTitle = document.getElementById('offersTitle');
    const conceptSpaceTitle = document.getElementById('conceptSpaceTitle');
    const productsDropdown = document.querySelector('.productsDropdown');
    const offersDropdown = document.querySelector('.offersDropdown');
    const conceptSpaceDropdown = document.querySelector('.conceptSpaceDropdown');
    const header = document.querySelector('.header');
    const secondHeader = document.querySelector('.secondHeader');

    function toggleDropdown(dropdown, title) {
        setTimeout(() => {
            dropdown.classList.toggle('show');
            title.classList.toggle('active');
            if (dropdown.classList.contains('show')) {
                showSecondHeader();
            } else {
                checkAllDropdowns();
            }
        }, 500);
    }

    function checkAllDropdowns() {
        if (!productsDropdown.classList.contains('show') &&
            !offersDropdown.classList.contains('show') &&
            !conceptSpaceDropdown.classList.contains('show')) {
            hideSecondHeader();
        }
    }

    function hideDropdown(dropdown, title) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            title.classList.remove('active');
            checkAllDropdowns();
        }
    }

    function showSecondHeader() {
        secondHeader.classList.add('show');
    }
    function hideSecondHeader() {
        secondHeader.classList.remove('show');
    }

    function hideAllDropdowns() {
        hideDropdown(productsDropdown, productsTitle);
        hideDropdown(offersDropdown, offersTitle);
        hideDropdown(conceptSpaceDropdown, conceptSpaceTitle);
    }

    productsTitle.addEventListener('click', function(event) {
        event.stopPropagation();
        hideDropdown(offersDropdown, offersTitle);
        hideDropdown(conceptSpaceDropdown, conceptSpaceTitle);
        toggleDropdown(productsDropdown, productsTitle);
    });

    offersTitle.addEventListener('click', function(event) {
        event.stopPropagation();
        hideDropdown(productsDropdown, productsTitle);
        hideDropdown(conceptSpaceDropdown, conceptSpaceTitle);
        toggleDropdown(offersDropdown, offersTitle);
    });

    conceptSpaceTitle.addEventListener('click', function(event) {
        event.stopPropagation();
        hideDropdown(productsDropdown, productsTitle);
        hideDropdown(offersDropdown, offersTitle);
        toggleDropdown(conceptSpaceDropdown, conceptSpaceTitle);
    });

    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && 
            !productsDropdown.contains(event.target) &&
            !offersDropdown.contains(event.target) &&
            !conceptSpaceDropdown.contains(event.target) &&
            !secondHeader.contains(event.target)) {
            hideAllDropdowns();
            hideSecondHeader();
        }
    });



    
});


document.addEventListener('DOMContentLoaded', function() {
    const sliderContent = document.querySelector('.offersSliderContent');
    const progressBar = document.querySelector('.progressBar');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let sliderWidth = sliderContent.scrollWidth - sliderContent.clientWidth;

    sliderContent.addEventListener('mousedown', dragStart);
    sliderContent.addEventListener('touchstart', dragStart);
    sliderContent.addEventListener('mouseup', dragEnd);
    sliderContent.addEventListener('touchend', dragEnd);
    sliderContent.addEventListener('mouseleave', dragEnd);
    sliderContent.addEventListener('mousemove', drag);
    sliderContent.addEventListener('touchmove', drag);

    sliderContent.addEventListener('dragstart', (e) => e.preventDefault());

    function dragStart(e) {
        e.preventDefault();
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
        }
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        sliderContent.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (isDragging) {
            let currentPosition;
            if (e.type === 'touchmove') {
                currentPosition = e.touches[0].clientX;
            } else {
                currentPosition = e.clientX;
            }
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        sliderContent.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;

        if (Math.abs(movedBy) < 100) {
            currentTranslate = prevTranslate;
        }

        if (currentTranslate > 0) {
            currentTranslate = 0;
        } else if (currentTranslate < -sliderWidth) {
            currentTranslate = -sliderWidth;
        }

        setSliderPosition();
        updateProgressBar();

        prevTranslate = currentTranslate;
    }

    function animation() {
        setSliderPosition();
        updateProgressBar();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        sliderContent.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateProgressBar() {
        const progressBarWidth = document.querySelector('.sliderProgress').offsetWidth;
        const progress = (Math.abs(currentTranslate) / sliderWidth) * 100;
        const maxTransform = progressBarWidth - progressBar.offsetWidth;
        const transformValue = (progress / 100) * maxTransform;
        progressBar.style.transform = `translateX(${transformValue}px)`;
    }

    window.addEventListener('resize', () => {
        sliderWidth = sliderContent.scrollWidth - sliderContent.clientWidth;
        updateProgressBar();
    });

    // Initial update
    updateProgressBar();
});


// document.addEventListener('DOMContentLoaded', function() {
//     const sliderContent = document.querySelector('.offersSliderContent');
//     const progressBar = document.querySelector('.progressBar');
//     const arrowLeft = document.querySelector('.arrowLeft');
//     const arrowRight = document.querySelector('.arrowRight');
//     const totalSlides = document.querySelectorAll('.offerCard').length;
//     const slidesPerView = 3;
//     let currentIndex = 0;

//     function updateSlider(index) {
//         currentIndex = index;
//         const offset = currentIndex * -100 / slidesPerView;
//         sliderContent.style.transform = `translateX(${offset}%)`;
//         updateProgressBar();
//         updateArrowVisibility();
//     }

//     function updateProgressBar() {
//         const maxIndex = totalSlides - slidesPerView;
//         const progress = (currentIndex / maxIndex) * 100;
//         progressBar.style.transform = `translateX(${progress}%)`;
//     }

//     function updateArrowVisibility() {
//         arrowLeft.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
//         arrowRight.style.visibility = currentIndex >= totalSlides - slidesPerView ? 'hidden' : 'visible';
//     }

//     arrowLeft.addEventListener('click', () => {
//         if (currentIndex > 0) {
//             updateSlider(currentIndex - 1);
//         }
//     });

//     arrowRight.addEventListener('click', () => {
//         if (currentIndex < totalSlides - slidesPerView) {
//             updateSlider(currentIndex + 1);
//         }
//     });

//     // Drag functionality
//     let isDragging = false;
//     let startPos = 0;
//     let currentTranslate = 0;
//     let prevTranslate = 0;
//     let animationID = 0;

//     sliderContent.addEventListener('mousedown', dragStart);
//     sliderContent.addEventListener('touchstart', dragStart);
//     sliderContent.addEventListener('mouseup', dragEnd);
//     sliderContent.addEventListener('touchend', dragEnd);
//     sliderContent.addEventListener('mouseleave', dragEnd);
//     sliderContent.addEventListener('mousemove', drag);
//     sliderContent.addEventListener('touchmove', drag);

//     function dragStart(e) {
//         e.preventDefault();
//         if (e.type === 'touchstart') {
//             startPos = e.touches[0].clientX;
//         } else {
//             startPos = e.clientX;
//         }
//         isDragging = true;
//         animationID = requestAnimationFrame(animation);
//     }

//     function drag(e) {
//         if (isDragging) {
//             const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
//             currentTranslate = prevTranslate + currentPosition - startPos;
//         }
//     }

//     function dragEnd() {
//         isDragging = false;
//         cancelAnimationFrame(animationID);
//         const movedBy = currentTranslate - prevTranslate;
        
//         if (Math.abs(movedBy) > 100) {
//             if (movedBy < 0 && currentIndex < totalSlides - slidesPerView) {
//                 updateSlider(currentIndex + 1);
//             } else if (movedBy > 0 && currentIndex > 0) {
//                 updateSlider(currentIndex - 1);
//             }
//         }

//         prevTranslate = currentTranslate;
//     }

//     function animation() {
//         setSliderPosition();
//         if (isDragging) requestAnimationFrame(animation);
//     }

//     function setSliderPosition() {
//         sliderContent.style.transform = `translateX(${currentTranslate}px)`;
//     }

//     // Initial update
//     updateSlider(0);
// });