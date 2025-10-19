function switchX(button) {
    document.querySelectorAll('.x-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}