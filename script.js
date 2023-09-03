const box = document.querySelector(".box");
const light = document.querySelector(".light");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "deepskyblue",
  "greenyellow",
  "hotpink",
];
let colorIndex = 0;
const numberOfLetters = 1500;
let isMouseDown = false;
let scaleFactor = 1;
let timeoutId;

light.addEventListener("mousedown", () => {
  isMouseDown = true;
  light.classList.add("decreasing");
  box.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  timeoutId = setTimeout(() => {
    light.classList.remove("decreasing");
    light.classList.add("active"); // Add the "active" class
  }, 400);

  scaleFactor = 1.5;
});

light.addEventListener("mouseup", () => {
  if (isMouseDown) {
    box.style.color = "white";
    isMouseDown = false;
    scaleFactor = 1;
    clearTimeout(timeoutId);
    light.classList.remove("decreasing");
    light.classList.remove("active");
  }
});

function randomString() {
  let string = "";
  for (let i = 0; i < numberOfLetters; i++) {
    let randomNumber = Math.random() * alphabet.length;
    randomNumber = Math.floor(randomNumber);
    string = string + alphabet[randomNumber];
  }
  return string;
}

light.style.background = `radial-gradient(circle at 50% 50%, transparent 10%, rgba(0, 0, 0, 0.95) 30%)`;

box.innerHTML = randomString();

function handleMouseMove(event) {
  box.innerHTML = randomString();
  const { clientX, clientY } = event;
  var bounding = light.getBoundingClientRect();
  var x = (clientX - bounding.left) / scaleFactor;
  var y = (clientY - bounding.top) / scaleFactor;

  setTimeout(() => {
    light.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 10%, rgba(0, 0, 0, 0.95) 30%)`;
  }, 100);
}

let isThrottled = false;
document.addEventListener("mousemove", (event) => {
  if (!isThrottled) {
    handleMouseMove(event);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, 40);
  }
});
