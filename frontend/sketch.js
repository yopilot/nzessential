let signaturePad;
let drawing = false;
let signatureContent = null; // Variable to store the signature content

function setup() {
  let canvasWidth = windowWidth > 460 ? 400 : 500;
  let canvasHeight = 200; // Fixed height

  // Create the signature canvas and attach it to the signaturePadHolder div
  signaturePad = createCanvas(canvasWidth, canvasHeight);
  signaturePad.parent("signaturePadHolder");
  signaturePad.id("signature-pad");

  // Set initial properties for the signature
  background(255); // Starting with a white background
  strokeWeight(2); // Setting the stroke weight for the signature

  // Add this line to prevent scrolling when touching within the canvas
  document.getElementById('signature-pad').addEventListener('touchmove', function(e) {
    if (e.target == this) {
      e.preventDefault();
    }
  }, { passive: false });
}

function windowResized() {
  let canvasWidth = windowWidth > 460 ? 400 : 500;
  let canvasHeight = 200; // Fixed height
  
  // Store the current signature content if it exists
  if (signatureContent === null) {
    signatureContent = signaturePad.canvas.toDataURL("image/png");
  }

  // Resize the canvas
  resizeCanvas(canvasWidth, canvasHeight);

  // Redraw the signature content if it exists
  if (signatureContent !== null) {
    let img = loadImage(signatureContent, function() {
      image(img, 0, 0); // Draw the signature content back onto the canvas
    });
  }
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
