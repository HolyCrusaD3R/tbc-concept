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
    let startTranslateX;
    let currentTranslateX = 0;
    const totalSlides = sliderContent.children.length;
    const visibleSlides = 3;
    const overshootAmount = 100; // pixels of overshoot allowed

    function updateSliderPosition(translateX, animate = false) {
        currentTranslateX = translateX;
        sliderContent.style.transition = animate ? 'transform 0.3s ease' : 'none';
        sliderContent.style.transform = `translateX(${translateX}px)`;
        updateProgressBar(translateX);
    }

    function updateProgressBar(translateX) {
        const slideWidth = sliderContent.children[0].offsetWidth;
        const totalWidth = slideWidth * (totalSlides - visibleSlides);
        let progress = -translateX / totalWidth;

        // Apply squeezing effect
        const squeezeAmount = 20; // maximum pixels to squeeze
        let squeeze = 0;
        let progressBarTranslateX = 0;

        if (translateX > 0) {
            squeeze = Math.min(translateX / 5, squeezeAmount);
            progress = 0;
            progressBarTranslateX = -squeeze;
        } else if (translateX < -totalWidth) {
            squeeze = Math.min((-translateX - totalWidth) / 5, squeezeAmount);
            progress = 1;
            progressBarTranslateX = sliderProgress.offsetWidth - progressBar.offsetWidth + squeeze;
        } else {
            progressBarTranslateX = progress * (sliderProgress.offsetWidth - progressBar.offsetWidth);
        }

        progressBar.style.transform = `translateX(${progressBarTranslateX}px)`;
        progressBar.style.width = `calc(33.333% - ${squeeze}px)`;
    }

    function handleDragStart(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.preventDefault();
        }
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        startTranslateX = currentTranslateX;
        sliderContent.style.transition = 'none';
        progressBar.style.transition = 'none';
        sliderContent.style.cursor = 'grabbing';
    }

    function handleDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentX - startX;
        const newTranslateX = startTranslateX + diff;
        const slideWidth = sliderContent.children[0].offsetWidth;
        const totalWidth = slideWidth * (totalSlides - visibleSlides);
        const minTranslate = -totalWidth - overshootAmount;
        const maxTranslate = overshootAmount;
        const clampedTranslateX = Math.max(minTranslate, Math.min(newTranslateX, maxTranslate));
        updateSliderPosition(clampedTranslateX);
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        sliderContent.style.cursor = 'grab';
        sliderContent.style.transition = 'transform 0.3s ease';
        progressBar.style.transition = 'transform 0.3s ease, width 0.3s ease';
        
        const slideWidth = sliderContent.children[0].offsetWidth;
        const totalWidth = slideWidth * (totalSlides - visibleSlides);
        let targetTranslateX;

        if (currentTranslateX > 0) {
            targetTranslateX = 0;
        } else if (currentTranslateX < -totalWidth) {
            targetTranslateX = -totalWidth;
        } else {
            const nearestSlide = Math.round(-currentTranslateX / slideWidth);
            targetTranslateX = -nearestSlide * slideWidth;
        }

        updateSliderPosition(targetTranslateX, true);
    }

    function moveSlider(direction) {
        const slideWidth = sliderContent.children[0].offsetWidth;
        const totalWidth = slideWidth * (totalSlides - visibleSlides);
        let newTranslateX = currentTranslateX + (direction * slideWidth);

        newTranslateX = Math.max(-totalWidth, Math.min(0, newTranslateX));

        updateSliderPosition(newTranslateX, true);
    }

    // Arrow click handlers
    leftArrow.addEventListener('click', () => moveSlider(1));  // Positive direction to move left
    rightArrow.addEventListener('click', () => moveSlider(-1));  // Negative direction to move right

    // Drag event listeners
    sliderContent.addEventListener('mousedown', handleDragStart);
    sliderContent.addEventListener('touchstart', handleDragStart, { passive: false });

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('touchmove', handleDrag, { passive: false });

    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    // Initial setup
    function initSlider() {
        sliderContent.style.display = 'flex';
        sliderContent.style.transition = 'transform 0.3s ease';
        sliderContent.style.cursor = 'grab';

        Array.from(sliderContent.children).forEach(child => {
            child.style.flex = `0 0 calc(${100 / visibleSlides}% - 20px)`;
            child.style.marginRight = '30px';
        });

        // Set initial width for progress bar
        progressBar.style.width = '33.333%';
        progressBar.style.position = 'absolute';
        progressBar.style.transition = 'transform 0.3s ease, width 0.3s ease';

        updateProgressBar(0);
    }

    // Call initial setup
    initSlider();

    // Optional: Add window resize handler to adjust slider if needed
    window.addEventListener('resize', initSlider);
});