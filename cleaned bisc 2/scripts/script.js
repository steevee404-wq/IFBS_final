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