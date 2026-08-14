document.addEventListener("DOMContentLoaded", function() {
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('start-animation');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.title, .img-wrapper').forEach(el => {
        observer.observe(el);
    });

    // Image cycler
    const images = document.querySelectorAll('.image-cycler img');
    let currentIndex = 0;

    if (images.length > 1) {
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 5000); 
    }
});