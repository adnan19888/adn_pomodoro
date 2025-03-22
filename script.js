class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.longBreakTime = 15 * 60; // 15 minutes in seconds
        this.sessions = 4; // Number of work sessions before long break
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.isWorkTime = true;
        this.sessionCount = 0;
        this.timer = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.timerStatus = document.getElementById('timer-status');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');

        // Event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startButton.disabled = true;
            this.pauseButton.disabled = false;

            this.timer = setInterval(() => {
                this.currentTime--;
                this.updateDisplay();

                if (this.currentTime === 0) {
                    this.playNotification();
                    this.switchMode();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startButton.disabled = false;
            this.pauseButton.disabled = true;
            clearInterval(this.timer);
        }
    }

    reset() {
        this.pause();
        this.currentTime = this.workTime;
        this.isWorkTime = true;
        this.sessionCount = 0;
        this.updateDisplay();
        this.updateStatus();
    }

    switchMode() {
        this.pause();

        if (this.isWorkTime) {
            this.sessionCount++;
            if (this.sessionCount === this.sessions) {
                this.currentTime = this.longBreakTime;
                this.isWorkTime = false;
                this.sessionCount = 0;
            } else {
                this.currentTime = this.breakTime;
                this.isWorkTime = false;
            }
        } else {
            this.currentTime = this.workTime;
            this.isWorkTime = true;
        }

        this.updateStatus();
        this.start();
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;

        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    updateStatus() {
        this.timerStatus.textContent = this.isWorkTime ? 'Work Time' :
            (this.currentTime === this.longBreakTime ? 'Long Break' : 'Short Break');
    }

    playNotification() {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play().catch(error => console.log('Audio play failed:', error));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 