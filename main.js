document.addEventListener('DOMContentLoaded', function() {
    const productsTitle = document.getElementById('productsTitle');
    const offersTitle = document.getElementById('offersTitle');
    const conceptSpaceTitle = document.getElementById('conceptSpaceTitle');
    const productsDropdown = document.querySelector('.productsDropdown');
    const offersDropdown = document.querySelector('.offersDropdown');
    const conceptSpaceDropdown = document.querySelector('.conceptSpaceDropdown');

    function toggleDropdown(dropdown) {
        setTimeout(() => {
            dropdown.classList.toggle('show');
        }, 500);
    }

    function hideDropdown(dropdown) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }

    productsTitle.addEventListener('click', function() {
        hideDropdown(offersDropdown);
        hideDropdown(conceptSpaceDropdown);
        toggleDropdown(productsDropdown);
    });

    offersTitle.addEventListener('click', function() {
        hideDropdown(productsDropdown);
        hideDropdown(conceptSpaceDropdown);
        toggleDropdown(offersDropdown);
    });

    conceptSpaceTitle.addEventListener('click', function() {
        hideDropdown(productsDropdown);
        hideDropdown(offersDropdown);
        toggleDropdown(conceptSpaceDropdown);
    });
    
});

