let count = 0;
let timerInterval = null;
let isTimerRunning = false;
let originalTime = 0;

function changeCounter(change) {
    if (!isTimerRunning) {
        count += change;
        // Ensure count doesn't go below 0
        if (count < 0) {
            count = 0;
        }
        updateDisplay();
        animateCounter();
    }
}

function resetCounter() {
    stopTimer();
    count = 0;
    updateDisplay();
    animateCounter();
}

function updateDisplay() {
    const counterInput = document.getElementById('counter');
    counterInput.value = count;
}

function updateCountFromInput() {
    if (!isTimerRunning) {
        const input = document.getElementById('counter');
        const newValue = parseInt(input.value) || 0;
        count = Math.max(0, newValue); // Ensure non-negative
        input.value = count; // Ensure clean display
        animateCounter();
    }
}

function animateCounter() {
    const counterContainer = document.getElementById('counter-container');
    counterContainer.classList.add('animate');
    setTimeout(() => {
        counterContainer.classList.remove('animate');
    }, 200);
}

function toggleTimer() {
    if (!isTimerRunning) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    if (count <= 0) {
        updateTimerStatus('Please set a time greater than 0');
        return;
    }
    
    if (isTimerRunning) {
        updateTimerStatus('Timer is already running');
        return;
    }
    
    originalTime = count;
    isTimerRunning = true;
    document.body.classList.add('timer-running');
    updateTimerButton();
    updateTimerStatus('Timer running...');
    
    timerInterval = setInterval(() => {
        count--;
        updateDisplay();
        flashNumber();
        
        if (count <= 0) {
            stopTimer();
            showCelebration();
            updateTimerStatus('Time\'s up! 🎉');
        }
    }, 1000);
}

function stopTimer() {
    isTimerRunning = false;
    document.body.classList.remove('timer-running');
    clearInterval(timerInterval);
    updateTimerButton();
    updateTimerStatus('Timer stopped');
}

function updateTimerButton() {
    const btn = document.getElementById('start-stop-btn');
    const icon = document.getElementById('timer-icon');
    const text = document.getElementById('timer-text');
    
    if (isTimerRunning) {
        btn.className = 'btn btn-danger timer-btn btn-lg rounded-pill px-4';
        icon.className = 'bi bi-stop-fill';
        text.textContent = 'Stop';
    } else {
        btn.className = 'btn btn-success timer-btn btn-lg rounded-pill px-4';
        icon.className = 'bi bi-play-fill';
        text.textContent = 'Start';
    }
}

function updateTimerStatus(message) {
    document.getElementById('timer-status').textContent = message;
}

function flashNumber() {
    const counterContainer = document.getElementById('counter-container');
    counterContainer.classList.add('flash');
    setTimeout(() => {
        counterContainer.classList.remove('flash');
    }, 500);
}

function showCelebration() {
    const container = document.getElementById('celebration-container');
    container.style.display = 'block';
    
    // Show celebration text
    const celebrationText = document.createElement('div');
    celebrationText.className = 'celebration-text';
    celebrationText.textContent = '🎉 TIME\'S UP! 🎉';
    container.appendChild(celebrationText);
    
    // Create confetti pieces
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fab1a0', '#fd79a8', '#6c5ce7'];
    
    // Start with immediate confetti burst
    for (let i = 0; i < 30; i++) {
        createConfetti(container, colors);
    }
    
    // Continue adding confetti frequently for 8 seconds
    const confettiInterval = setInterval(() => {
        createConfetti(container, colors);
        createConfetti(container, colors);
        createConfetti(container, colors);
    }, 100);
    
    // Clean up after 8 seconds
    setTimeout(() => {
        clearInterval(confettiInterval);
        setTimeout(() => {
            container.style.display = 'none';
            container.innerHTML = '';
        }, 3000);
    }, 8000);
}

function createConfetti(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random position and color
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    confetti.style.animationDelay = '0s'; // Start immediately
    
    // Random shape
    if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
    }
    
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 4000);
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
            if (!isTimerRunning) {
                document.getElementById('counter').focus();
                document.getElementById('counter').select();
            }
        } else if (event.key === 't' || event.key === 'T') {
            toggleTimer();
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

// Prevent editing input during timer
document.getElementById('counter').addEventListener('focus', function(event) {
    if (isTimerRunning) {
        this.blur();
    }
});
