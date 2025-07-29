let count = 0;

function changeCounter(change) {
    count += change;
    updateDisplay();
    animateCounter();
}

function resetCounter() {
    count = 0;
    updateDisplay();
    animateCounter();
}

function updateDisplay() {
    document.getElementById('counter').value = count;
}

function updateCountFromInput() {
    const input = document.getElementById('counter');
    const newValue = parseInt(input.value) || 0;
    count = newValue;
    input.value = count; // Ensure clean display
    animateCounter();
}

function animateCounter() {
    const counterContainer = document.getElementById('counter-container');
    counterContainer.classList.add('animate');
    setTimeout(() => {
        counterContainer.classList.remove('animate');
    }, 200);
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    // Only handle shortcuts if not focused on the input
    if (document.activeElement.id !== 'counter') {
        if (event.key === 'ArrowUp' || event.key === '+') {
            changeCounter(1);
        } else if (event.key === 'ArrowDown' || event.key === '-') {
            changeCounter(-1);
        } else if (event.key === 'r' || event.key === 'R') {
            resetCounter();
        } else if (event.key === 'Enter' || event.key === ' ') {
            document.getElementById('counter').focus();
            document.getElementById('counter').select();
        }
    }
});

// Handle Enter key in input field
document.getElementById('counter').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        this.blur(); // Remove focus from input
        updateCountFromInput();
    }
});
