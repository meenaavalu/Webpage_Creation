document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating .star');
    const ratingInput = document.getElementById('rating');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value; 
            highlightStars(value); // Update visual stars
        });

        star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            highlightStars(value, true); // Highlight stars on hover
        });

        star.addEventListener('mouseout', function() {
            const value = ratingInput.value;
            highlightStars(value); // Restore stars to selected state on mouseout
        });
    });

    // Function to highlight stars based on selected rating
    function highlightStars(value, isHover = false) {
        stars.forEach(star => {
            const starValue = star.getAttribute('data-value');
            if (starValue <= value) {
                star.classList.add('selected');
                star.querySelector('i').classList.remove('fa-star-o');
                star.querySelector('i').classList.add('fa-star');
            } else {
                star.classList.remove('selected');
                star.querySelector('i').classList.remove('fa-star');
                star.querySelector('i').classList.add('fa-star-o');
            }
        });
    }

    // Initially highlight stars based on existing rating value (if any)
    highlightStars(ratingInput.value);
});
