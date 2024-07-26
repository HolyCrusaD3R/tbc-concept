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