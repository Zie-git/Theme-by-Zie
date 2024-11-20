document.addEventListener('DOMContentLoaded', () => {
  // Select the elements
  const reviewsSection = document.querySelector('#shopify-section-template--16037962121306__reviews_Q43BQ3');
  const stickySection = document.querySelector('#shopify-section-template--16037962121306__zoom_section_yP4rgJ');
  const zoomEffect = document.querySelector('.zoom-effect');

  if (reviewsSection && stickySection && zoomEffect) {
    // Initial clip-path value
    let clipValue = 35; // Starting at 35%
    const CLIP_INCREMENT = 10;
    const MAX_CLIP = 35;
    const MIN_CLIP = 0;
    let allowClipPathChange = true;

    // Function to check for overlap
    function checkOverlap() {
      const reviewsRect = reviewsSection.getBoundingClientRect();
      const stickyRect = stickySection.getBoundingClientRect();

      const isOverlapping = !(
        reviewsRect.right <= stickyRect.left ||
        reviewsRect.left >= stickyRect.right ||
        reviewsRect.bottom <= stickyRect.top ||
        reviewsRect.top >= stickyRect.bottom
      );

      // Allow or prevent clip-path updates based on overlap
      allowClipPathChange = !isOverlapping;

      if (isOverlapping) {
        console.log('The reviews section is overlapping the sticky section. Clip-path updates paused.');
      } else {
        console.log('The reviews section is NOT overlapping the sticky section. Clip-path updates allowed.');
      }
    }

    // Function to update clip-path on scroll
    function handleScroll(e) {
      if (!allowClipPathChange) return;

      // Adjust clip value based on scroll direction
      if (e.deltaY > 0) {
        clipValue -= CLIP_INCREMENT; // Scroll down - zoom out
      } else {
        clipValue += CLIP_INCREMENT; // Scroll up - zoom in
      }

      // Clamp the clip value within the range
      clipValue = Math.max(MIN_CLIP, Math.min(MAX_CLIP, clipValue));

      // Apply the updated clip-path value
      zoomEffect.style.clipPath = `inset(${clipValue}%)`;
    }

    // Debounce overlap check for better performance
    let timeout;
    function debounceCheck() {
      clearTimeout(timeout);
      timeout = setTimeout(checkOverlap, 100);
    }

    // Event listeners
    window.addEventListener('scroll', debounceCheck);
    window.addEventListener('resize', debounceCheck);
    window.addEventListener('wheel', handleScroll);

    // Initial check
    checkOverlap();
  } else {
    console.error('One or more required elements are missing from the DOM.');
  }
});
