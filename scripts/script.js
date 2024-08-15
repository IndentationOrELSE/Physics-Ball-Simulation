const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const speedInput = document.getElementById('speed');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let ball = {
  x: canvas.width / 3,
  y: canvas.height / 2,
  radius: 25,
  dx: parseFloat(speedInput.value),
  dy: parseFloat(speedInput.value),
  gravity: 0.1,
  elasticity: 1,
  usegravity: true,
  useElasticity: true,
  color: { h: Math.random() * 360, s: 100, l: 50 },
  targetColor: { h: Math.random() * 360, s: 100, l: 50 },
  colorTransitionSpeed: 0.01,
  sizeIncrement: 1 // Amount by which the radius increases on each bounce
};
let trail = []; // Array to store trail balls
  let balls = [ball];
  const C = [16.35, 32.70, 65.41, 130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.01];
  const Db =   [17.32, 34.65, 69.30, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92];
  const D =   [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64];
  const Eb =   [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03];
  const E =   [20.60, 41.20, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02];
  const F =   [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83];
  const Gb =   [23.12, 46.25, 92.50, 185.00, 369.99, 739.99, 1479.98, 2959.96];
  const G =   [24.50, 49.00, 98.00, 196.00, 392.00, 783.99, 1567.98, 3135.96];
  const Ab =   [25.96, 51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44];
  const A =   [27.50, 55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00];
  const Bb =   [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31];
  const B =   [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07];
  //let notes = [329.63, 329.63, 329.63, 261.63, 329.63, 392, 196, 329.63]; // yk what this is 
  let iteration = 0;
  //let notes = [E[6], E[6], E[6], C[6], E[6], G[4],[6], G[4], C[6], G[4], E[5], A[5], B[5], Bb[5], A[5], G[4], E[5], G[4], A[5], F[5], G[4], E[5], C[5], D[5], B[6], C[6], G[4], E[5], A[5], B[5], Bb[5], A[5], G[4], G[4], E[5], G[4], A[5], F[5], G[4], E[5], C[5], D[5], B[6], G[4], C[5], G[4],B[5], F[5], D[5], E[5], G[4], C[5], C[5], D[5], G[4],C[5], G[4],B[5], F[5], D[5], E[5], C[6], C[6], C[6], G[4],C[5], G[4], B[5], F[5], D[5], E[5], G[4], C[5], C[5], D[5], D[5], D[5], C[5],   C[5], C[5], C[5], C[5], D[5], E[5], C[5], G[4], C[5], C[5], C[5], C[5], D[5], E[5], C[5], C[5], C[5], C[5], D[5], E[5], C[5], G[4], E[5], E[5], E[5], C[5], E[5], G[4], G[4],   C[5], G[4], G[4], E[5], G[4], F[5], G[4], E[5], C[5], D[5], C[5], G[4]];
  const notes = [
	  E[5], E[5], E[5],
	  C[5], E[5], G[5],
	  G[4],
	
	  C[5], G[4], E[4],
	  A[4], B[4], Bb[4], A[4],
	
	  G[4], E[5], G[5], A[5],
	  F[5], G[5], E[5], C[5], D[5], B[4],
	
	  C[5], G[4], E[4],
	  A[4], B[4], Bb[4], A[4],
	
	  G[4], E[5], G[5], A[5],
	  F[5], G[5], E[5], C[5], D[5], B[4],	
	  
	  C[5], G[4], E[4],
	  A[4], B[4], Bb[4], A[4],
	
	  G[4], E[5], G[5], A[5],
	  F[5], G[5], E[5], C[5], D[5], B[4],
  
	  G[5], Gb[5], F[5], Eb[5],
	  E[5],
	
	  Ab[4], A[4], C[5], A[4],
	  C[5], D[5],
	
	  G[5], Gb[5], F[5], Eb[5],
	  E[5],
	
	  C[6], C[6], C[6],
	  G[5], Gb[5], F[5], Eb[5],
	  E[5]
	];
  function playSound() {
	fixediteration = iteration % notes.length;
	let frequency = notes[fixediteration];
	let oscillator = audioContext.createOscillator();
	oscillator.type = 'square';
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
	oscillator.connect(audioContext.destination);
	oscillator.start();
	oscillator.stop(audioContext.currentTime + 0.25); //default: 0.1
	iteration++;
  }
  
  function interpolateColor(current, target, speed) {
	const diff = {
	  h: (target.h - current.h + 360) % 360 - 180,
	  s: target.s - current.s,
	  l: target.l - current.l
	};
	
	return {
	  h: (current.h + diff.h * speed + 360) % 360,
	  s: current.s + diff.s * speed,
	  l: current.l + diff.l * speed
	};
  }
  
 
  function drawBall(ballin) {
	ctx.beginPath();
	//ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = `hsl(${ball.color.h}, ${ball.color.s}%, ${ball.color.l}%)`;
	document.getElementById("canvas").style.borderColor = `hsl(${ball.color.h}, ${ball.color.s}%, ${ball.color.l}%)`;
	ctx.strokeStyle = "white"
	ctx.strokeRect(ball.x, ball.y, ball.radius, ball.radius);
	ctx.fillRect(ball.x, ball.y, ball.radius, ball.radius);
	ctx.fill()
	ctx.lineWidth = 5;
	ctx.stroke()
	ctx.fill();
	ctx.closePath();
  }
function updateBall(ballin) {
  // Interpolate the color
  ball.color = interpolateColor(ball.color, ball.targetColor, ball.colorTransitionSpeed);

  // Check if the ball color is close to the target color
  if (Math.abs((ball.color.h - ball.targetColor.h + 360) % 360 - 180) < 1 &&
      Math.abs(ball.color.s - ball.targetColor.s) < 1 &&
      Math.abs(ball.color.l - ball.targetColor.l) < 1) {
    // generate a new target color
    ball.targetColor = { h: Math.random() * 360, s: 100, l: 50 };
  }

  if (ball.usegravity) {
    ball.dy += ball.gravity;
  }	
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius/2 > canvas.width || ball.x - ball.radius/2 < 0) {
	ball.dx = -ball.dx
	if (ball.dx > 0){ ball.dx = -ball.dx; } // if the ball is travelling in negative x, velocity turns to positive x+10
	else {ball.dx = (ball.dx * -1)} // vice versa
    ball.x = ball.x + ball.radius > canvas.width ? canvas.width - ball.radius : ball.radius;
    //ball.radius += ball.sizeIncrement; // Increase the size on bounce
    playSound(400 + Math.random() * 200);
  }
  if (ball.y > canvas.height || ball.y - ball.radius < 0) {
	console.log(ball.dy)
    ball.dy = -ball.dy * (ball.useElasticity ? ball.elasticity : 1);
    ball.y = ball.y + ball.radius > canvas.height ? canvas.height - ball.radius : ball.radius;
    //ball.radius += ball.sizeIncrement; // Increase the size on bounce
    playSound(400 + Math.random() * 200);
  }
   // Check for corner collisions
   if ((ball.x - ball.radius <= 0 && ball.y - ball.radius <= 0) || // Top-left corner
   (ball.x + ball.radius >= canvas.width && ball.y - ball.radius <= 0) || // Top-right corner
   (ball.x - ball.radius <= 0 && ball.y + ball.radius >= canvas.height) || // Bottom-left corner
   (ball.x + ball.radius >= canvas.width && ball.y + ball.radius >= canvas.height)) { // Bottom-right corner
   duplicateBall(ball)
}
  // Add current position and color to trail
  trail.push({ 
    x: ball.x, 
    y: ball.y, 
    radius: ball.radius * 0.9, 
    color: { ...ball.color } 
  });
  trail = trail.slice(-10)
}

function duplicateBall(originalBall) {
	let newBall = { ...originalBall, dx: 90-originalBall.dx, dy: -originalBall.dy };
	balls.push(newBall);
  }

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw all trail balls
  //trail.forEach(trailBall => drawBall(trailBall));
  
  balls.forEach(ballin => {
    drawBall(ballin);
    updateBall(ballin);
  });
  
  requestAnimationFrame(draw);
}

function togglegravity(checked) {
  ball.usegravity = checked;
  checkDisabled();
}

function toggleElasticity(checked) {
  ball.useElasticity = checked;
  checkDisabled();
}

function checkDisabled() {
  if (!ball.usegravity && !ball.useElasticity) {
    speedInput.disabled = false;
  } else {
    speedInput.disabled = true;
    speedInput.value = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy).toFixed(1);
  }
}

function updateSpeed(value) {
  ball.dx = parseFloat(value);
  ball.dy = parseFloat(value);
}

function resizeCanvas() {
  canvas.width = window.innerWidth * 0.3;
  canvas.height = canvas.width;
  if (ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width - ball.radius;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
draw();
