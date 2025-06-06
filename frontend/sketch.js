let signaturePad;
let drawing = false;

function setup() {
  let canvasWidth = windowWidth > 460 ? 400 : windowWidth - 60;
  let canvasHeight = 200; // Fixed height

  signaturePad = createCanvas(canvasWidth, canvasHeight).parent(
    "signaturePadHolder"
  );
  signaturePad.id("signature-pad");
  background(255); // Starting with a white background
  strokeWeight(2); // Setting the stroke weight for the signature

  // Ensure the canvas resizes dynamically with the window
  windowResized(); // Call once to ensure initial adjustment

  // Add this line to prevent scrolling when touching within the canvas
  document.getElementById('signature-pad').addEventListener('touchmove', function(e) {
    if (e.target == this) {
      e.preventDefault();
    }
  }, { passive: false });
}

function windowResized() {
  let canvasWidth = windowWidth > 460 ? 400 : windowWidth - 60;

}

function draw() {
  stroke(0); // Set stroke color to black
  if (mouseIsPressed) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      // Check if the mouse is within the canvas bounds
      drawing = true;
      line(pmouseX, pmouseY, mouseX, mouseY); // Draw lines following the mouse
    }
  } else {
    if (drawing) {
      drawing = false;
    }
  }
}

// Function to clear the signature pad
function clearSignature() {
  background(255); // Clear canvas by repainting it with a white background
}

function exportSignature() {
  let signatureDataURL = signaturePad.canvas.toDataURL("image/png");
  return signatureDataURL;
}

window.exportSignature = exportSignature;
