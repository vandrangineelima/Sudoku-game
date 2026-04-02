const gridElement = document.getElementById("sudoku-grid");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const levelSelect = document.getElementById("level");

/* ===== PUZZLES BY LEVEL ===== */

const puzzles = {
  easy: {
    puzzle: [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ],
    solution: [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ]
  },

  medium: {
    puzzle: [
      [0,0,0,2,6,0,7,0,1],
      [6,8,0,0,7,0,0,9,0],
      [1,9,0,0,0,4,5,0,0],
      [8,2,0,1,0,0,0,4,0],
      [0,0,4,6,0,2,9,0,0],
      [0,5,0,0,0,3,0,2,8],
      [0,0,9,3,0,0,0,7,4],
      [0,4,0,0,5,0,0,3,6],
      [7,0,3,0,1,8,0,0,0]
    ],
    solution: [
      [4,3,5,2,6,9,7,8,1],
      [6,8,2,5,7,1,4,9,3],
      [1,9,7,8,3,4,5,6,2],
      [8,2,6,1,9,5,3,4,7],
      [3,7,4,6,8,2,9,1,5],
      [9,5,1,7,4,3,6,2,8],
      [5,1,9,3,2,6,8,7,4],
      [2,4,8,9,5,7,1,3,6],
      [7,6,3,4,1,8,2,5,9]
    ]
  },

  hard: {
    puzzle: [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,3,0,5,0,0,0],
      [0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,6,0,0],
      [0,0,0,0,7,0,0,0,0],
      [0,0,0,0,0,9,0,0,0],
      [0,0,0,0,0,0,0,7,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ],
    solution: [
      [9,8,7,6,5,4,3,2,1],
      [2,6,4,3,1,5,7,9,8],
      [3,5,1,9,8,7,2,6,4],
      [5,4,9,1,3,2,6,8,7],
      [1,3,8,5,7,6,4,1,9], /* dummy pattern for example */
      [6,7,2,8,4,9,1,5,3],
      [8,2,5,4,9,3,9,7,6],
      [4,9,3,7,6,1,8,3,2],
      [7,1,6,2,0,8,5,4,9]
    ]
  }
};

/* ===== CURRENT STATE ===== */
let currentPuzzle;
let currentSolution;
let originalPuzzle;

/* ===== GENERATE GRID ===== */
function generateGrid() {
  gridElement.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.dataset.row = i;
      input.dataset.col = j;

      if (currentPuzzle[i][j] !== 0) {
        input.value = currentPuzzle[i][j];
        input.disabled = true;
      }

      gridElement.appendChild(input);
    }
  }
}

/* ===== LOAD LEVEL ===== */
function loadLevel() {
  let level = levelSelect.value;
  currentPuzzle = JSON.parse(JSON.stringify(puzzles[level].puzzle));
  currentSolution = puzzles[level].solution;
  originalPuzzle = JSON.parse(JSON.stringify(currentPuzzle));
  generateGrid();
  message.textContent = "";
}

levelSelect.addEventListener("change", loadLevel);

/* ===== CHECK SOLUTION ===== */
checkBtn.addEventListener("click", () => {
  let inputs = gridElement.querySelectorAll("input");
  let correct = true;

  inputs.forEach(input => {
    let r = input.dataset.row;
    let c = input.dataset.col;
    let val = parseInt(input.value) || 0;

    if (val !== currentSolution[r][c]) {
      input.style.color = "red";
      correct = false;
    } else {
      input.style.color = "black";
    }
  });

  if (correct) {
    message.style.color = "green";
    message.textContent = "🎉 Perfect! You solved this level!";
  } else {
    message.style.color = "red";
    message.textContent = "❌ Some answers are wrong. Try again!";
  }
});

/* ===== RESET ===== */
resetBtn.addEventListener("click", () => {
  currentPuzzle = JSON.parse(JSON.stringify(originalPuzzle));
  generateGrid();
  message.textContent = "";
});

/* ===== INITIAL LOAD ===== */
loadLevel();

// ===== LIGHT / DARK MODE TOGGLE =====
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});