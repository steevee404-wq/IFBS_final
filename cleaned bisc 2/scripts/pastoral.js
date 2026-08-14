document.addEventListener("DOMContentLoaded", () => {
    // 1. Select all elements with the 'reveal' class
    const reveals = document.querySelectorAll(".reveal");

    // 2. Configure the IntersectionObserver
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // triggers when 15% visible
        rootMargin: "0px 0px -50px 0px" // triggers slightly before hitting the absolute bottom
    };

    // 3. Create the observer function
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the active class to trigger the CSS transition
                entry.target.classList.add("active");
                
                // Stop observing once animated so it doesn't replay backwards
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Attach the observer to every reveal element
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});