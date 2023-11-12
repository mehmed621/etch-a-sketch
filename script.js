// Container and Modifiers
const grid_Container = document.querySelector("#grid-container");
const grid_Settings = document.querySelector("#grid-settings");
const rangeSpans = document.querySelectorAll(".range-span");
const range1 = document.querySelector("#range1");
const color_pref = document.querySelector("#colorpref");

// Buttons
const resetButton = document.querySelector("#reset-btn");
const newGridButton = document.querySelector("#newgrid-btn");
const newColorButton = document.querySelector("#newcolor-btn");
const eraser = document.querySelector("#eraser");

// Starter Values
const defaultGrid = 16;
let defaultColor = "black";
let isEraser = false;
let isPainting = false;
let canvasArr = [];
range1.value = defaultGrid;

// Event Listeners
eraser.addEventListener("click", function () {
  if (!isEraser) {
    isEraser = true;
    eraser.classList.add("eraseron");
    eraser.innerText = "Eraser On";
  } else {
    isEraser = false;
    eraser.classList.remove("eraseron");
    eraser.innerText = "Eraser Off";
  }
});

newGridButton.addEventListener("click", function () {
  clear();
  setGrid(range1.value);
});

range1.addEventListener("mousemove", function () {
  let newArr = Array.from(rangeSpans);
  newArr.map((rangeSpan) => (rangeSpan.textContent = range1.value));
});

newColorButton.addEventListener("click", function () {
  defaultColor = color_pref.value;
});

resetButton.addEventListener("click", clear);
grid_Container.addEventListener("click", startPainting);

// Functions

function paint(e) {
  let currentColor = defaultColor;
  if (isEraser) {
    currentColor = "white";
  }
  e.target.style = `background-color: ${currentColor}`;
}

function clear() {
  canvasArr.map((item) => {
    item.style = "background-color: rgba(255, 255, 255, 0.8)";
    item.removeEventListener("mouseenter", paint);
  });
  currentlyActive = false;
}

function resetCanvas() {
  while (grid_Container.firstChild) {
    grid_Container.removeChild(grid_Container.firstChild);
  }
}

function setGrid(number) {
  resetCanvas();
  grid_Container.style.gridTemplateColumns = `repeat(${number}, 1fr`;
  grid_Container.style.gridTemplateRows = `repeat(${number}, 1fr`;
  let totalDivs = number * number;
  for (let i = 0; i < totalDivs; i++) {
    canvasArr[i] = document.createElement("div");
    canvasArr[i].classList.add("cnvs");
    canvasArr[i].style = "background-color: rgba(255, 255, 255, 0.8)";
    grid_Container.appendChild(canvasArr[i]);
  }
}

function startPainting() {
  if (!isPainting) {
    canvasArr.map((cnvs) => {
      cnvs.addEventListener("mouseleave", paint);
    });
    isPainting = true;
  } else {
    canvasArr.map((cnvs) => {
      cnvs.removeEventListener("mouseleave", paint);
    });
    isPainting = false;
  }
}

window.onload = () => {
  setGrid(defaultGrid);
  let newArr = Array.from(rangeSpans);
  newArr.map((rangeSpan) => (rangeSpan.textContent = defaultGrid));
};
