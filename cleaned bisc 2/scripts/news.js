// Powers the "Read more" popup on the News page.
// Each .event-card carries its own placeholder article text in data-body,
// so this just reads the card's title/date/body and drops them into the
// shared modal markup instead of following a dead "#" link.

document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("articleModal");
    if (!modal) return;

    var modalTitle = document.getElementById("articleModalTitle");
    var modalDate = document.getElementById("articleModalDate");
    var modalBody = document.getElementById("articleModalBody");
    var closeEls = modal.querySelectorAll("[data-close]");
    var lastFocused = null;

    function openModal(card) {
        var titleEl = card.querySelector("h3");
        var dateEl = card.querySelector(".event-date");
        var body = card.getAttribute("data-body") ||
            "Full story coming soon. Check back shortly for the complete article.";

        modalTitle.textContent = titleEl ? titleEl.textContent.trim() : "";
        modalDate.textContent = dateEl ? dateEl.textContent.trim() : "";
        modalBody.textContent = body;

        lastFocused = document.activeElement;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        var closeBtn = modal.querySelector(".article-modal-close");
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocused && typeof lastFocused.focus === "function") {
            lastFocused.focus();
        }
    }

    document.querySelectorAll(".event-card").forEach(function (card) {
        var trigger = card.querySelector(".read-more-btn");
        var titleLink = card.querySelector(".event-title-link");

        [trigger, titleLink].forEach(function (el) {
            if (!el) return;
            el.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(card);
            });
        });
    });

    closeEls.forEach(function (el) {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });
});
