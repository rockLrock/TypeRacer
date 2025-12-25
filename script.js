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

// Function to display text in the sample-text element
function displayText(difficulty) {
  const sampleTextElement = document.getElementById('sample-text');
  const randomText = getRandomText(difficulty);
  
  if (sampleTextElement) {
    sampleTextElement.textContent = randomText;
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
  
  // Additional event listeners for buttons (stub for future functionality)
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const retryBtn = document.getElementById('retry-btn');
  
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      console.log('Start button clicked');
      // Future: Start timer and enable input
    });
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', function() {
      console.log('Stop button clicked');
      // Future: Stop timer and calculate results
    });
  }
  
  if (retryBtn) {
    retryBtn.addEventListener('click', function() {
      console.log('Retry button clicked');
      const currentDifficulty = document.getElementById('difficulty').value;
      displayText(currentDifficulty);
      // Future: Reset input, timer, and results
    });
  }
});
