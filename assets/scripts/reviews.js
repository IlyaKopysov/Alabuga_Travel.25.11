document = addEventListener('DOMContentLoaded', async function (){
const reviewContent = document.querySelector('.reviews__content');
fetch('https://673611ff5995834c8a954d48.mockapi.io/reviews')
.then(response => response.json())
.then(reviews => {
    reviews.forEach(review => {
    reviewContent.innerHTML +=`
    <div class="reviews__card">
        <div class="reviews__card__avatar">
            <img class="review__img" src="${review.avatar}"><img class="review__stars" src="${review.stars}">
            <p class="review__name">${review.name}</p>
        </div>
        <p class="review__text">${review.text}<p>
    </div>
        `;
    })
})

})