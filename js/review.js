document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('motorcycleForm');
    const reviewList = document.getElementById('reviewList');
    const filterRating = document.getElementById('filterRating');

    // Initializing reviews with hardcoded data
    let reviews = [
        {
            model: 'X1000',
            brand: 'Yamaha',
            year: 2020,
            type: 'Sport',
            review: 'Excellent performance and handling.',
            rating: 5
        },
        {
            model: 'C500',
            brand: 'Honda',
            year: 2018,
            type: 'Cruiser',
            review: 'Comfortable ride with a classic look.',
            rating: 4
        }
    ];

    let editIndex = -1;

    const saveReviews = () => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
    };

    const displayReviews = () => {
        const reviewList = document.getElementById('reviewList');
        reviewList.innerHTML = '';
        const filterRating = document.getElementById('filterRating');
        const filteredReviews = filterRating.value === 'all' ? reviews : reviews.filter(review => review.rating == filterRating.value);

        if (filteredReviews.length === 0) {
            const noRecordMessage = document.createElement('p');
            noRecordMessage.textContent = 'No record found';
            reviewList.appendChild(noRecordMessage);
        } else {
            filteredReviews.forEach((review, index) => {
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review-item');
                reviewItem.innerHTML = `
                    <p><strong>Model:</strong> ${review.model}</p>
                    <p><strong>Brand:</strong> ${review.brand}</p>
                    <p><strong>Year:</strong> ${review.year}</p>
                    <p><strong>Type:</strong> ${review.type}</p>
                    <p><strong>Review:</strong> ${review.review}</p>
                    <p><strong>Rating:</strong> ${'<i class="fa fa-star" style="font-family: FontAwesome"></i>'.repeat(review.rating)}</p>
                    <button class="edit-button" data-index="${index}" style="font-size: 15px;">Edit</button>
                    <button class="delete-button" data-index="${index}" style="font-size: 15px;">Delete</button>
                `;
                reviewList.appendChild(reviewItem);
            });
        }

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                editReview(event.target.getAttribute('data-index'));
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                deleteReview(index); 
            });
        });
    };

    const addReview = (review) => {
        reviews.push(review);
        saveReviews();
    };

    const editReview = (index) => {
        const review = reviews[index];
        form.model.value = review.model;
        form.brand.value = review.brand;
        form.year.value = review.year;
        form.type.value = review.type;
        form.review.value = review.review;
        form.rating.value = review.rating;

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.remove('selected');
            if (star.getAttribute('data-value') <= review.rating) {
                star.classList.add('selected');
            }
        });

        editIndex = index;

        form.scrollIntoView({ behavior: 'smooth' });
        form.model.focus();
    };

    const updateReview = (index, updatedReview) => {
        reviews[index] = updatedReview;
        saveReviews();
    };

    const deleteReview = (index) => {
        reviews.splice(index, 1); 
        saveReviews();
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const newReview = {
            model: form.model.value,
            brand: form.brand.value,
            year: form.year.value,
            type: form.type.value,
            review: form.review.value,
            rating: form.rating.value
        };

        if (editIndex >= 0) {
            updateReview(editIndex, newReview);
            editIndex = -1;
        } else {
            addReview(newReview);
        }

        form.reset();
        document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
    });

    filterRating.addEventListener('change', function() {
        displayReviews();
    });

    displayReviews();
});
