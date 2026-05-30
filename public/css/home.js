function submitReview() {
  fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      message: document.getElementById('message').value
    })
  })
  .then(() => {
    document.getElementById('reviewStatus').innerText =
      'Thank you! Review submitted for approval.';
    document.getElementById('reviewForm').reset();
  });
}


let testimonialIndex = 0;

function moveTestimonial(direction) {
  const track = document.getElementById('testimonialTrack');
  const cards = track.querySelectorAll('.testimonial-card');

  if (!cards.length) return;

  const visibleCards = window.innerWidth <= 768 ? 1 : 2;
  const maxIndex = cards.length - visibleCards;

  testimonialIndex += direction;

  if (testimonialIndex < 0) testimonialIndex = 0;
  if (testimonialIndex > maxIndex) testimonialIndex = maxIndex;

  const cardWidth = cards[0].offsetWidth + 20; // gap included
  track.style.transform =
    `translateX(-${testimonialIndex * cardWidth}px)`;
}


document.addEventListener("DOMContentLoaded", () => {

    const circles =
      document.querySelectorAll(".treatment-circle");

    const panel =
      document.getElementById("treatmentDetail");

    const title =
      document.getElementById("detailTitle");

    const description =
      document.getElementById("detailDescription");

    const image =
      document.getElementById("detailImage");

    circles.forEach(circle => {

        circle.addEventListener("click", e => {

            e.preventDefault();

            title.textContent =
              circle.dataset.title;

            description.textContent =
              circle.dataset.description;

            image.src =
              circle.dataset.image;

            panel.classList.add("active");

            panel.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

const productCards =
document.querySelectorAll(".product-card");

const productPanel =
document.getElementById("homeProductDetail");

const productTitle =
document.getElementById("homeProductTitle");

const productDescription =
document.getElementById("homeProductDescription");

const productImage =
document.getElementById("homeProductImage");

const productPrice =
document.getElementById("homeProductPrice");

if(productCards.length){

productCards.forEach(card=>{

card.addEventListener("click",()=>{

productTitle.textContent =
card.dataset.title;

productDescription.textContent =
card.dataset.description;

productImage.src =
card.dataset.image;

productPrice.textContent =
card.dataset.price;

productPanel.classList.add("active");

productPanel.scrollIntoView({
behavior:"smooth"
});

});

});

}