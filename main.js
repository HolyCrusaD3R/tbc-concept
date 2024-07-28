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


document.addEventListener('DOMContentLoaded', () => {
    const sliderContent = document.querySelector('.offersSliderContent');
    const progressBar = document.querySelector('.progressBar');
    const leftArrow = document.querySelector('.arrowLeft');
    const rightArrow = document.querySelector('.arrowRight');
    const sliderProgress = document.querySelector('.sliderProgress');

    let isDragging = false;
    let startX;
    let scrollLeft;
    let currentSlide = 0;
    const totalSlides = sliderContent.children.length;
    const visibleSlides = 3;

    function updateProgressBar() {
        const progress = (currentSlide / (totalSlides - visibleSlides));
        const maxTranslate = sliderProgress.offsetWidth - progressBar.offsetWidth;
        progressBar.style.transform = `translateX(${progress * maxTranslate}px)`;
    }

    function scrollToSlide(slideIndex) {
        const slideWidth = sliderContent.children[0].offsetWidth;
        sliderContent.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        currentSlide = slideIndex;
        updateProgressBar();
    }

    function handleDragStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        scrollLeft = currentSlide * sliderContent.children[0].offsetWidth;
        sliderContent.style.cursor = 'grabbing';
    }

    function handleDragEnd() {
        isDragging = false;
        sliderContent.style.cursor = 'grab';
    }

    function handleDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const walk = (x - startX) * 2;
        const slideWidth = sliderContent.children[0].offsetWidth;
        const newSlide = Math.round((scrollLeft - walk) / slideWidth);
        scrollToSlide(Math.max(0, Math.min(newSlide, totalSlides - visibleSlides)));
    }

    sliderContent.addEventListener('mousedown', handleDragStart);
    sliderContent.addEventListener('touchstart', handleDragStart);

    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);

    leftArrow.addEventListener('click', () => {
        currentSlide = Math.max(0, currentSlide - 1);
        scrollToSlide(currentSlide);
    });

    rightArrow.addEventListener('click', () => {
        currentSlide = Math.min(totalSlides - visibleSlides, currentSlide + 1);
        scrollToSlide(currentSlide);
    });

    // Initial setup
    sliderContent.style.display = 'flex';
    sliderContent.style.transition = 'transform 0.3s ease';
    sliderContent.style.cursor = 'grab';
    Array.from(sliderContent.children).forEach(child => {
        child.style.flex = `0 0 calc(${100 / visibleSlides}% - 20px)`;
        child.style.marginRight = '30px';
    });

    // Set fixed width for progress bar
    progressBar.style.width = '33.333%';
    progressBar.style.position = 'absolute';
    progressBar.style.transition = 'transform 0.3s ease';

    updateProgressBar();
});