// Trailing Dot Bullet Grid using p5.js

let cursorInside = true; // Track if cursor is inside the browser
let trail = []; // Array to store trail positions

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor(); // Show the cursor

  // Detect when the cursor leaves or enters the browser
  window.addEventListener('mouseout', () => cursorInside = false);
  window.addEventListener('mouseover', () => cursorInside = true);
}

function draw() {
  background('#1a1a1a'); // Eerie Black as background

  let gridSize = 30; // Smaller spacing between dots

  // Add current mouse position to trail
  trail.push({ x: mouseX, y: mouseY });

  // Limit trail length
  if (trail.length > 50) {
    trail.shift();
  }

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let distance = dist(mouseX, mouseY, x, y);
      let size = map(distance, 0, 100, 15, 0); // Make dots appear only when hovering
      size = constrain(size, 0, 15); // Constrain size to avoid extremes

      fill('#3ccc41'); // Lime Green for dots
      noStroke();
      if (size > 0) {
        ellipse(x, y, size, size); // Draw the dots only if size > 0
      }
    }
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    fill('#3ccc41');
    noStroke();
    ellipse(pos.x, pos.y, 5, 5); // Draw slimmer trail dots
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
}
