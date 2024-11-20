document.addEventListener('DOMContentLoaded', () => {
  // Select the elements
  const reviewsSection = document.querySelector('#shopify-section-template--16037962121306__reviews_Q43BQ3');
  const stickySection = document.querySelector('#shopify-section-template--16037962121306__zoom_section_yP4rgJ');

  if (reviewsSection && stickySection) {
    function checkOverlap() {
      // Get bounding rectangles
      const reviewsRect = reviewsSection.getBoundingClientRect();
      const stickyRect = stickySection.getBoundingClientRect();

      // Check if there is any overlap
      const isOverlapping = !(
        reviewsRect.right <= stickyRect.left ||
        reviewsRect.left >= stickyRect.right ||
        reviewsRect.bottom <= stickyRect.top ||
        reviewsRect.top >= stickyRect.bottom
      );

      // Log the result
      if (isOverlapping) {
        console.log('The reviews section is overlapping the sticky section.');
      } else {
        console.log('The reviews section is NOT overlapping the sticky section.');
      }
    }

    // Debounce to avoid firing too frequently on scroll/resize
    let timeout;
    function debounceCheck() {
      clearTimeout(timeout);
      timeout = setTimeout(checkOverlap, 100);
    }

    // Run the check on scroll and resize
    window.addEventListener('scroll', debounceCheck);
    window.addEventListener('resize', debounceCheck);

    // Initial check
    checkOverlap();
  } else {
    console.error('One or both sections are missing from the DOM.');
  }
});
