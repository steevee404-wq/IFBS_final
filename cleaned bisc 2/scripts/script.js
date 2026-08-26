// One close-timer per dropdown id, so leaving one item can't
// accidentally cancel another item's pending close.
let closeTimers = {};

function dropdown(id){
    // Cancel this dropdown's own pending close, if any
    clearTimeout(closeTimers[id]);

    // Immediately hide any other dropdown that's still open
    document.querySelectorAll(".dropdown.dropdown-dropped").forEach((el) => {
        if (el.id !== id) {
            clearTimeout(closeTimers[el.id]);
            el.classList.remove("dropdown-dropped");
            el.style.display = "none";
        }
    });

    let item = document.getElementById(id);
    item.classList.add("dropdown-dropped");
    item.style.display = "block";
}

function resetdropdown(id){
    let item = document.getElementById(id);
    closeTimers[id] = setTimeout(() => {
        item.classList.remove("dropdown-dropped");
        item.style.display = "none";
    }, 200);
}

function keepDropdown(id){
    clearTimeout(closeTimers[id]);
    let item = document.getElementById(id);
    item.style.display = "block";
}

// ---------------------------------------------------------------
// Persistent mobile "home" button
//
// The desktop nav already has a logo <li> inside .mainul that links
// back to index.html — but on mobile that whole <ul> becomes an
// off-canvas panel that's translated out of view until the hamburger
// is opened, so the logo (and the way back home) disappears with it.
//
// Rather than hard-code a relative path per page (root pages use
// "index.html"/"assets/logo.png", subfolder pages use
// "../index.html"/"../assets/logo.png"), we clone the logo link that's
// already correctly wired up in each page's own markup and place the
// clone directly inside <nav class="main-menu">, as a sibling of
// .mainul rather than a child of it — that way it sits outside the
// panel's slide transform and stays visible (and tappable) at all
// times on mobile, styled as a round button via CSS.
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    var logoImg = document.querySelector(".mainul .menu-logo");
    var mainMenu = document.querySelector(".main-menu");
    var mainul = document.querySelector(".mainul");
    if (!logoImg || !mainMenu || !mainul) return;

    var logoLink = logoImg.closest("a");
    if (!logoLink) return;

    var homeBtn = logoLink.cloneNode(true);
    homeBtn.classList.add("mobile-logo-btn");
    homeBtn.setAttribute("aria-label", "Go to homepage");

    mainMenu.insertBefore(homeBtn, mainul);
});