document.addEventListener("DOMContentLoaded", () => {
    const mover = document.getElementById("div-mover");
    const table = document.getElementById("scroll-table");

    mover.addEventListener("click", () => {
        table.classList.toggle("close");
    });
});