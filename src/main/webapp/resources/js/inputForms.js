let xSelected = null;

function switchX(button) {
    xSelected = button;

    const xInput = document.getElementById("input-form:x-input");
    xInput.value = button.value;
    document.querySelectorAll('.x-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function checkX() {
    return selected != null;
}