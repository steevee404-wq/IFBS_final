// Shows a small tooltip with the day's category (e.g. "National Holiday")
// when a highlighted calendar cell is hovered (desktop) or tapped (touch).
document.addEventListener("DOMContentLoaded", () => {
    const days = document.querySelectorAll(".month-card td[data-type]");
    if (!days.length) return;

    const tooltip = document.createElement("div");
    tooltip.className = "day-tooltip";
    document.body.appendChild(tooltip);

    function showTooltip(cell) {
        const type = cell.getAttribute("data-type");
        const date = cell.getAttribute("data-date");
        tooltip.textContent = date ? `${date} — ${type}` : type;

        const rect = cell.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.classList.add("visible");
    }

    function hideTooltip() {
        tooltip.classList.remove("visible");
    }

    days.forEach((cell) => {
        // Desktop: hover
        cell.addEventListener("mouseenter", () => showTooltip(cell));
        cell.addEventListener("mouseleave", hideTooltip);

        // Touch / click: toggle on tap, close on next tap elsewhere
        cell.addEventListener("click", (e) => {
            e.stopPropagation();
            const alreadyVisible = tooltip.classList.contains("visible") && tooltip.dataset.activeCell === cell.dataset.date;
            if (alreadyVisible) {
                hideTooltip();
                tooltip.dataset.activeCell = "";
            } else {
                showTooltip(cell);
                tooltip.dataset.activeCell = cell.dataset.date;
            }
        });
    });

    document.addEventListener("click", hideTooltip);
    window.addEventListener("scroll", hideTooltip, true);
});
