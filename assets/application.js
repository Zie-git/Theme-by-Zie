// Select the sticky section
const stickySection = document.querySelector('#shopify-section-template--16037962121306__zoom_section_yP4rgJ');
const reviewsSection = document.querySelector('#shopify-section-template--16037962121306__reviews_Q43BQ3');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('The reviews section is in front of the sticky section.');
      alert('The reviews section is overlapping the sticky section.');
    } else {
      console.log('The reviews section is NOT in front of the sticky section.');
        alert('The reviews section is NOT overlapping the sticky section.');
    }
  });
}, {
  root: null, // Use the viewport as the root
  threshold: [0] // Trigger if any intersection happens
});

// Observe the reviews section
observer.observe(reviewsSection);

