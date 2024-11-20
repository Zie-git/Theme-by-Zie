// Put your application javascript here


  // Select the elements
const reviewsSection = document.querySelector('#shopify-section-template--16037962121306__reviews_Q43BQ3');
const stickySection = document.querySelector('#shopify-section-template--16037962121306__zoom_section_yP4rgJ');

function checkOverlap() {
  // Get bounding rectangles
  const reviewsRect = reviewsSection.getBoundingClientRect();
  const stickyRect = stickySection.getBoundingClientRect();

  // Check if there is any overlap
  const isOverlapping = !(reviewsRect.right < stickyRect.left ||
                          reviewsRect.left > stickyRect.right ||
                          reviewsRect.bottom < stickyRect.top ||
                          reviewsRect.top > stickyRect.bottom);

  // Log the result or take action
  if (isOverlapping) {
    console.log('The reviews section is overlapping the sticky section.');
  } else {
    console.log('The reviews section is NOT overlapping the sticky section.');
  }
}

// Run the check on scroll and resize
window.addEventListener('scroll', checkOverlap);
window.addEventListener('resize', checkOverlap);

// Initial check
checkOverlap();

