let timerInterval;
let totalSeconds = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const addTimeBtn = document.getElementById('addTimeBtn');
const removeTimeBtn = document.getElementById('removeTimeBtn');
const addRemoveInput = document.getElementById('addRemoveInput');
const addRemoveUnit = document.getElementById('addRemoveUnit');

function convertToSeconds(value, unit) {
    switch (unit) {
        case 'seconds':
            return value;
        case 'minutes':
            return value * 60;
        case 'hours':
            return value * 3600;
        case 'days':
            return value * 86400; // 24 * 60 * 60
        case 'months':
            return value * 2592000; // Approx. 30 days
        case 'years':
            return value * 31536000; // Approx. 365 days
        default:
            return 0;
    }
}

function updateTimerDisplay() {
    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    const months = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
    const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${String(years).padStart(4, '0')}:${String(months).padStart(2, '0')}:${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Check if countdown is complete and update styles
    if (totalSeconds <= 0) {
        timerDisplay.classList.add('complete'); // Add complete class for red glow
        clearInterval(timerInterval);
        timerInterval = null; // Stop the timer when it reaches zero
    } else {
        timerDisplay.classList.remove('complete'); // Remove complete class if still counting down
    }
}

function startCountdown() {
   // Start countdown only if totalSeconds is set correctly
   if (totalSeconds > 0) {
       if (!timerInterval) {
           timerInterval = setInterval(() => {
               if (totalSeconds > 0) {
                   totalSeconds--;
                   updateTimerDisplay();
               } else {
                   updateTimerDisplay(); // Ensure display updates at zero
               }
           }, 1000);
       }
   }
}

function stopTimer() {
   clearInterval(timerInterval);
   timerInterval = null;
}

function resetTimer() {
   stopTimer();
   totalSeconds = 0; // Set total seconds to zero on reset
   updateTimerDisplay();
}

function addTime() {
   const amountToAdd = convertToSeconds(parseFloat(addRemoveInput.value), addRemoveUnit.value); // Convert to seconds
   if (!isNaN(amountToAdd)) {
       totalSeconds += amountToAdd; // Add time to countdown
       updateTimerDisplay();
       addRemoveInput.value = ''; // Clear input field
   }
}

function removeTime() {
   const amountToRemove = convertToSeconds(parseFloat(addRemoveInput.value), addRemoveUnit.value); // Convert to seconds
   if (!isNaN(amountToRemove) && totalSeconds >= amountToRemove) {
       totalSeconds -= amountToRemove; // Remove time from countdown
       updateTimerDisplay();
       addRemoveInput.value = ''; // Clear input field
   }
}

// Add event listeners for buttons
startBtn.addEventListener('click', startCountdown);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
addTimeBtn.addEventListener('click', addTime);
removeTimeBtn.addEventListener('click', removeTime);





