document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideInterval = 3000; // Time in milliseconds between slides

    function moveToSlide(index) {
        // Calculate the new position
        let newScrollPosition = slides[0].clientWidth * index;
        slider.scrollTo({
            top: 0,
            left: newScrollPosition,
            behavior: 'smooth',
        });
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to 0 if at the last slide
        moveToSlide(currentIndex);
    }

    function moveToPreviousSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to the last slide if at the first
        moveToSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(moveToNextSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextButton.addEventListener('click', () => {
        moveToNextSlide();
        // Restart the auto-slide to reset the timer when manually navigating
        stopAutoSlide();
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        moveToPreviousSlide();
        // Restart the auto-slide to reset the timer when manually navigating
        stopAutoSlide();
        startAutoSlide();
    });

    // Start auto-sliding when the document is loaded
    startAutoSlide();

    // Optional: Stop auto-slide when the user hovers over the slider, resume on mouse leave
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
});
