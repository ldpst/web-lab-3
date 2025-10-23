function validateYInput() {
    const input = document.getElementById('input-form:y-input');
    const error = document.getElementById('input-form:y-error');
    const value = parseFloat(input.value);

    if (isNaN(value) || value < -3 || value > 5) {
        error.style.display = 'inline';
        makeNotification(error.textContent.trim());
    } else {
        error.style.display = 'none';
    }
}