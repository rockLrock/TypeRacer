// Typing Test - Sample Text Management

// Define text samples for each difficulty level
const textSamples = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect when learning to type.",
    "The cat sat on the mat and fell asleep."
  ],
  medium: [
    "Consistent practice improves both speed and accuracy in typing skills.",
    "The development of typing proficiency requires dedication and regular exercise.",
    "Modern keyboards are designed to reduce strain during extended typing sessions."
  ],
  hard: [
    "Proficiency in typing fundamentally depends upon muscle memory development through systematic, intentional practice.",
    "Technological advancement has revolutionized communication, necessitating enhanced typing competencies across professional and academic domains.",
    "The intricate correlation between cognitive processing and motor skill execution directly influences typing velocity and accuracy metrics."
  ]
};

// Function to get a random text based on difficulty level
function getRandomText(difficulty) {
  const texts = textSamples[difficulty];
  if (!texts || texts.length === 0) {
    return "No text available for this difficulty level.";
  }
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

let currentSampleText = '';
let currentSampleWords = [];

// Render sample text as individually wrapped words for live feedback
function renderSampleText(text) {
  const sampleTextElement = document.getElementById('sample-text');
  if (!sampleTextElement) return;

  currentSampleText = text;
  currentSampleWords = text.trim().split(/\s+/);

  const wordSpans = currentSampleWords.map((word, index) => {
    return `<span class="sample-word" data-index="${index}">${word}</span>`;
  }).join(' ');

  sampleTextElement.innerHTML = wordSpans;
}

// Function to display text in the sample-text element
function displayText(difficulty) {
  const randomText = getRandomText(difficulty);
  renderSampleText(randomText);
  resetLiveFeedback();
}

// Timer Management Variables
let testStartTime = null;
let testEndTime = null;
let testInProgress = false;

// Function to start the test and begin timing
function startTest() {
  testStartTime = Date.now();
  testEndTime = null;
  testInProgress = true;
  
  // Disable start button and enable stop button
  disableStartButton();
  enableStopButton();
  
  // Enable user input
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.disabled = false;
    userInput.value = '';
    userInput.focus();
  }
  
  resetLiveFeedback();
  
  console.log('Test started at:', new Date(testStartTime).toLocaleTimeString());
}

// Function to stop the test and calculate elapsed time
function stopTest() {
  testEndTime = Date.now();
  testInProgress = false;
  
  // Disable stop button and enable start button
  disableStopButton();
  enableStartButton();
  
  // Disable user input
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.disabled = true;
  }
  
  // Calculate and display the test time
  displayTestTime();
  
  console.log('Test stopped at:', new Date(testEndTime).toLocaleTimeString());
}

// Function to calculate and display the elapsed time in results
function displayTestTime() {
  if (testStartTime && testEndTime) {
    const elapsedMilliseconds = testEndTime - testStartTime;
    const elapsedSeconds = elapsedMilliseconds / 1000;
    const timeRounded = elapsedSeconds.toFixed(2);
    
    // Display time in the results area
    const timeDisplay = document.getElementById('time');
    if (timeDisplay) {
      timeDisplay.textContent = timeRounded;
    }
    
    console.log(`Test completed in ${timeRounded} seconds`);
  }
}

// Function to disable the start button
function disableStartButton() {
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.disabled = true;
  }
}

// Function to enable the start button
function enableStartButton() {
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.disabled = false;
  }
}

// Function to disable the stop button
function disableStopButton() {
  const stopBtn = document.getElementById('stop-btn');
  if (stopBtn) {
    stopBtn.disabled = true;
  }
}

// Function to enable the stop button
function enableStopButton() {
  const stopBtn = document.getElementById('stop-btn');
  if (stopBtn) {
    stopBtn.disabled = false;
  }
}

// Function to reset the test
function resetTest() {
  testStartTime = null;
  testEndTime = null;
  testInProgress = false;
  
  // Reset buttons to initial state
  enableStartButton();
  disableStopButton();
  
  // Clear user input
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.value = '';
    userInput.disabled = true;
  }
  
  // Reset time display
  const timeDisplay = document.getElementById('time');
  if (timeDisplay) {
    timeDisplay.textContent = '0';
  }
  
  resetLiveFeedback();
  
  console.log('Test reset');
}

// Clear any live feedback highlights
function resetLiveFeedback() {
  const sampleTextElement = document.getElementById('sample-text');
  if (!sampleTextElement) return;
  const spans = sampleTextElement.querySelectorAll('.sample-word');
  spans.forEach(span => {
    span.classList.remove('word-correct', 'word-incorrect');
  });
}

// Update live accuracy feedback while the user types
function updateLiveFeedback() {
  const sampleTextElement = document.getElementById('sample-text');
  const userInputElement = document.getElementById('user-input');
  if (!sampleTextElement || !userInputElement) return;

  const typedValue = userInputElement.value;
  const hasTrailingSpace = /\s$/.test(typedValue);
  const typedWords = typedValue.trim().length ? typedValue.trim().split(/\s+/) : [];
  const sampleWords = currentSampleWords;
  const wordSpans = sampleTextElement.querySelectorAll('.sample-word');

  wordSpans.forEach(span => span.classList.remove('word-correct', 'word-incorrect'));

  for (let i = 0; i < wordSpans.length; i++) {
    const typedWord = typedWords[i];
    if (typedWord === undefined) continue;

    const isLastTyped = i === typedWords.length - 1;
    const isCompleteWord = hasTrailingSpace || !isLastTyped;

    if (!isCompleteWord && isLastTyped) {
      // Only mark incomplete words incorrect if the prefix already diverges
      if (!sampleWords[i].startsWith(typedWord)) {
        wordSpans[i].classList.add('word-incorrect');
      }
      continue;
    }

    if (typedWord === sampleWords[i]) {
      wordSpans[i].classList.add('word-correct');
    } else {
      wordSpans[i].classList.add('word-incorrect');
    }
  }
}

// Initialize the page with a default easy text
document.addEventListener('DOMContentLoaded', function() {
  // Display initial text (easy level)
  displayText('easy');
  
  // Add event listener to difficulty selector
  const difficultySelect = document.getElementById('difficulty');
  if (difficultySelect) {
    difficultySelect.addEventListener('change', function() {
      const selectedDifficulty = this.value;
      displayText(selectedDifficulty);
      console.log(`Difficulty changed to: ${selectedDifficulty}`);
    });
  }
  
  // Event listeners for buttons
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const retryBtn = document.getElementById('retry-btn');
  const userInput = document.getElementById('user-input');
  
  // Initialize stop button as disabled
  if (stopBtn) {
    stopBtn.disabled = true;
  }
  
  if (startBtn) {
    startBtn.addEventListener('click', startTest);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', stopTest);
  }
  
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      const currentDifficulty = document.getElementById('difficulty').value;
      displayText(currentDifficulty);
      resetTest();
    });
  }

  if (userInput) {
    userInput.addEventListener('input', updateLiveFeedback);
  }
});

// Function to calculate correctly typed words
function calculateCorrectWords(sampleText, userInput) {
  const sampleWords = sampleText.trim().split(/\s+/);
  const userWords = userInput.trim().split(/\s+/);
  
  let correctWords = 0;
  
  // Compare each word from user input with sample text
  for (let i = 0; i < userWords.length && i < sampleWords.length; i++) {
    if (userWords[i] === sampleWords[i]) {
      correctWords++;
    }
  }
  
  return correctWords;
}

// Function to calculate WPM
function calculateWPM(correctWords, elapsedSeconds) {
  if (elapsedSeconds === 0) return 0;
  
  const minutes = elapsedSeconds / 60;
  const wpm = correctWords / minutes;
  
  return Math.round(wpm);
}

// Function to display results
function displayResults() {
  const sampleTextElement = document.getElementById('sample-text');
  const userInputElement = document.getElementById('user-input');
  const difficultySelect = document.getElementById('difficulty');
  
  if (!sampleTextElement || !userInputElement) return;
  
  const sampleText = sampleTextElement.textContent;
  const userInput = userInputElement.value;
  const selectedDifficulty = difficultySelect.value;
  
  // Calculate correct words
  const correctWords = calculateCorrectWords(sampleText, userInput);
  
  // Calculate elapsed time in seconds
  const elapsedMilliseconds = testEndTime - testStartTime;
  const elapsedSeconds = elapsedMilliseconds / 1000;
  
  // Calculate WPM
  const wpm = calculateWPM(correctWords, elapsedSeconds);
  
  // Display results
  const levelDisplay = document.getElementById('level');
  const wpmDisplay = document.getElementById('wpm');
  
  if (levelDisplay) {
    levelDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
  }
  
  if (wpmDisplay) {
    wpmDisplay.textContent = wpm;
  }
  
  console.log(`Correct words: ${correctWords}, WPM: ${wpm}`);
}

// Modified stopTest function to include results display
// Replace the existing stopTest function with this:
function stopTest() {
  testEndTime = Date.now();
  testInProgress = false;
  
  // Disable stop button and enable start button
  disableStopButton();
  enableStartButton();
  
  // Disable user input
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.disabled = true;
  }
  
  // Calculate and display the test time and results
  displayTestTime();
  displayResults();
  
  console.log('Test stopped at:', new Date(testEndTime).toLocaleTimeString());
}

// ...existing code...