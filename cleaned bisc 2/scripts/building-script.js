// 1. Define the callback function
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    // Check if the element is currently intersecting the viewport
    if (entry.isIntersecting) {
      console.log('The element is on the screen!');
      // Add the fade class to animate it
      entry.target.classList.add('h2-fade');
      
      // Optional: Stop observing once it has been seen
      // observer.unobserve(entry.target);
    }
  });
};

// 2. Create the Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // uses the viewport
  threshold: 0.1 // triggers when 10% of the element is visible
});

// 3. Target the element and start observing
const targetElement = document.getElementById('to-fade');
observer.observe(targetElement);