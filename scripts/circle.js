const C = [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01];
const Db = [
	17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92,
];
const D = [
	18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64,
];
const Eb = [
	19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03,
];
const E = [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02];
const F = [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83];
const Gb = [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96];
const G = [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96];
const Ab = [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44];
const A = [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0];
const Bb = [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31];
const B = [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07];

// WORLD VARIABLES
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const speedInput = document.getElementById("speed");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// BALL OBJECT
let initialBall = {
	name: "Red Ball",
	x: 1281,
	y: 900,
	radius: 50,
	// dx: parseFloat(speedInput.value),
	dx: 0,
	dy: parseFloat(speedInput.value),
	gravity: 0.6,
	elasticity: 1.02,
	useGravity: true,
	useElasticity: true,
	color: { h: 1, s: 100, l: 50 },
	targetColor: { h: Math.random() * 360, s: 100, l: 50 },
	colorTransitionSpeed: 0.1,
	sizeIncrement: 4.5, // Amount by which the radius increases on each bounce

};
let secondaryBall = {
	name: "Blue Ball",
	x: 800,
	y: canvas.width / 2,
	radius: 40,
	dx: parseFloat(speedInput.value),
	dy: parseFloat(speedInput.value),
	gravity: 0.24,
	elasticity: 1.001,
	useGravity: true,
	useElasticity: true,
	color: { h: 235,s: 100, l: 50 },
	targetColor: { h: Math.random() * 360, s: 100, l: 50 },
	colorTransitionSpeed: 0.1,
	sizeIncrement: 4.5, // Amount by which the radius increases on each bounce
	maxRadius: 50, // Maximum radius to prevent the ball from growing indefinitely
};
let ternaryBall = {
	name: "Green Ball",
	x: 700,
	y: canvas.width / 2,
	radius: 40,
	dx: parseFloat(speedInput.value),
	dy: parseFloat(speedInput.value),
	gravity: 0.24,
	elasticity: 1.001,
	useGravity: true,
	useElasticity: true,
	color: { h: 129, s: 100, l: 50 },
	targetColor: { h: Math.random() * 360, s: 100, l: 50 },
	colorTransitionSpeed: 0.1,
	sizeIncrement: 4.5, // Amount by which the radius increases on each bounce
	maxRadius: 50, // Maximum radius to prevent the ball from growing indefinitely
};
let quartenaryBall = {
	name: "Pink Ball",
	x: 900,
	y: 1,
	radius: 40,
	dx: parseFloat(speedInput.value),
	dy: parseFloat(speedInput.value),
	gravity: 0.24,
	elasticity: 1.001,
	useGravity: true,
	useElasticity: true,
	color: { h: 293, s: 100, l: 50 },
	targetColor: { h: Math.random() * 360, s: 100, l: 50 },
	colorTransitionSpeed: 0.1,
	sizeIncrement: 4.5, // Amount by which the radius increases on each bounce
	maxRadius: 50, // Maximum radius to prevent the ball from growing indefinitely
};

const aliveTime = 4000;
//let balls = [initialBall,secondaryBall,ternaryBall,quartenaryBall]; // Array to store all balls
let balls = [initialBall]
let deadballs = [];
resizeCanvas();
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let boundaryRadius = canvas.width / 5;
const gapAngle = Math.PI / 10; // Width of the gap in radians
let rotationAngle = 0; // DO NOT CHANGE
const rotationSpeed = 0.02; // Speed of rotation
let circleBroken = false;
const duplication = true;
const gap = true;
const boundaryColor = {
    h: 1,
    s: 100,
    l: 50,
    targetColor: { h: Math.random() * 360, s: 100, l: 50 },
    colorTransitionSpeed: 0.005
};
balls.forEach((ball)=>{
	ball.radius = 30;
})

const notes = [[A[3],C[4],E[4],F[4],A[4],A[5]], E[6],A[5],E[6],[B[3],E[4],G[4],B[5]],E[6],B[5],E[6],  [A[3],C[4],E[4],A[4],C[6]],E[6],C[6],E[6],[B[3],D[4],E[4],G[4],D[6]],E[6],D[6],E[6],B[5]]
const accompany = [[A[3],C[4],E[4],F[4],A[4]],[B[3],E[4],G[4]],[A[3],C[4],E[4],A[4]],[B[3],D[4],E[4],G[4]]]
//const notes = [Bb[5], Bb[5], Bb[5], Bb[5], Bb[5], B[5], Eb[6], Bb[5], Bb[5], Bb[5], B[5], Eb[6], Bb[5], Bb[5], Bb[5], B[5], Eb[6], Bb[5], Bb[5], Bb[5], B[5],Eb[6],F[6],F[6],Ab[6],Gb[6],F[6],Eb[6],Eb[6],Ab[6],Gb[6],F[6],Eb[6],Eb[6],Bb[5],B[5],Eb[6],Bb[5],Bb[5]] 
const sampler = new Tone.Sampler({
	urls: {
		G3: "media/Samples/Piano.wav",
	},
}).toDestination();
let iteration = 0;
let chorditeration = 0;
let trail = [];

function duplicateBall(originalBall) {
    // Create a new ball object with the same properties as the original ball
	const bufferdist = 100;
    let newBall = {
        x: rand(
            (canvas.width / 2) - boundaryRadius + bufferdist,
            (canvas.width / 2) + boundaryRadius - bufferdist
        ),
        y: rand(
            (canvas.height / 2) - boundaryRadius + bufferdist,
            (canvas.height / 2) + boundaryRadius - bufferdist
        ),
        radius: originalBall.radius,
        dx: parseFloat(speedInput.value),
        dy: parseFloat(speedInput.value),
        gravity: originalBall.gravity,
        elasticity: originalBall.elasticity,
        useGravity: initialBall.useGravity, // Keeps the gravity setting of the original ball
        useElasticity: initialBall.useElasticity,
        color: { h: rand(1, 360), s: rand(70, 100), l: rand(40, 80) },
        targetColor: { ...originalBall.targetColor },
        colorTransitionSpeed: originalBall.colorTransitionSpeed,
        sizeIncrement: originalBall.sizeIncrement,
        maxRadius: originalBall.maxRadius,
    };

    // Add the new ball to the array of balls
    balls.push(newBall);

    // Leave the original ball's properties unchanged, but move the new ball
    originalBall.dx = 0;
    originalBall.dy = 0;
    originalBall.useGravity = false; // Disable gravity only for the new ball
}

function rand(min, max) {
	return min + Math.random() * (max - min);
}
function playSound() {
	let frequency = notes[iteration % notes.length];
	const vol0vol = new Tone.Volume(-30).toDestination()
	iteration++;
	try {
		if (iteration % 4 === 1 || iteration == 1){
			sampler.triggerAttackRelease(frequency, 1.2).connect(vol0vol)
		}else{
		sampler.triggerAttackRelease(frequency, 1.2).connect(vol0vol)
		}
	} catch (e) {
		let error = e;
	}
}

function interpolateColor(current, target, speed) {
	const diff = {
		h: ((target.h - current.h + 360) % 360) - 180,
		s: target.s - current.s,
		l: target.l - current.l,
	};
	return {
		h: (current.h + diff.h * speed + 360) % 360,
		s: current.s + diff.s * speed,
		l: current.l + diff.l * speed,
	};
}

function drawBall(ball) {
	ctx.beginPath();
	ctx.fillStyle = `hsl(${ball.color.h}, ${ball.color.s}%, ${ball.color.l}%)`;
	document.getElementById("canvas").style.border = "none";
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fill();
	//ctx.moveTo(ball.x,ball.y)
	//ctx.lineTo(centerX,centerY)
	//ctx.lineTo(ball.x,centerY)
	//ctx.lineTo(ball.x,ball.y)
	ctx.lineWidth = 1;
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();
}
function updateBoundaryColor() {
    // Interpolate the color
    boundaryColor.h = interpolateColor(
        boundaryColor,
        boundaryColor.targetColor,
        boundaryColor.colorTransitionSpeed
    ).h;

    // Check if the boundary color is close to the target color
    if (
        Math.abs(((boundaryColor.h - boundaryColor.targetColor.h + 360) % 360) - 180) < 1
    ) {
        // Generate a new target color
        boundaryColor.targetColor = { h: Math.random() * 360, s: 100, l: 50 };
    }
}
function drawBoundary(ball) {
	let startAngle = rotationAngle;
	if (gap){var endAngle = rotationAngle + Math.PI * 2 - gapAngle;}
	else{var endAngle = rotationAngle + Math.PI * 2;}
	ctx.beginPath();
	ctx.arc(centerX, centerY, boundaryRadius, startAngle, endAngle);
	//ctx.lineTo(centerX,centerY)
	//ctx.lineTo(centerX+boundaryRadius,centerY)
	// ctx.strokeStyle = `hsl(${ball.color.h}, ${ball.color.s}%, ${ball.color.l}%)`;
	ctx.strokeStyle = `hsl(${boundaryColor.h}, ${boundaryColor.s}%, ${boundaryColor.l}%)`;
	ctx.lineWidth = 10;
	ctx.stroke();
	ctx.closePath();
	updateBoundaryColor()
}

function updateColour(ball) {
	// Interpolate the color
	ball.color = interpolateColor(
		ball.color,
		ball.targetColor,
		ball.colorTransitionSpeed
	);

	// Check if the ball color is close to the target color
	if (
		Math.abs(((ball.color.h - ball.targetColor.h + 360) % 360) - 180) < 1 &&
		Math.abs(ball.color.s - ball.targetColor.s) < 1 &&
		Math.abs(ball.color.l - ball.targetColor.l) < 1
	) {
		// Generate a new target color
		ball.targetColor = { h: Math.random() * 360, s: 100, l: 50 };
	}
	return ball.color
}
function isBallInGap(
	ballX,
	ballY,
	centerX,
	centerY,
	rotationAngle,
	startAngle,
	endAngle,
	ballRadius
) {
	// Calculate the angle of the ball from the positive y-axis
	let dx = ballX - centerX;
	let dy = ballY - centerY;
	let angleFromXAxis = Math.atan2(dy, dx);
	if (angleFromXAxis < 0) {
		angleFromXAxis += 2 * Math.PI;
	}
	let newBallRadius = ballRadius/3
	let newgapAngle = gapAngle * 180/Math.PI
	function diff(a, b) {
		return a > b ? a - b : b - a;
	}
	if (startAngle > endAngle) {
		if (startAngle >= angleFromXAxis && angleFromXAxis >= endAngle) {
			if (
				// diff(startAngle, angleFromXAxis) > ballRadius &&
				// diff(endAngle, angleFromXAxis) > ballRadius
				newgapAngle >= newBallRadius
			) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		if (angleFromXAxis < startAngle || angleFromXAxis > endAngle) {
			if (
				// diff(startAngle, angleFromXAxis) > ballRadius &&
				// diff(endAngle, angleFromXAxis) > ballRadius
				newgapAngle >= newBallRadius
			) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

function moveBall(ball) {
	if (ball.useGravity){
	ball.dy += ball.gravity;
	}
	ball.x += ball.dx;
	ball.y += ball.dy;
}
function updateSizes(ball){
	adjustedSize = (ball.radius/3).toFixed(2);
	if (ball.name === "Red Ball"){
		document.getElementById("1").innerHTML = `Red Ball: ${adjustedSize}`
	} else if (ball.name === "Blue Ball"){
		document.getElementById("2").innerHTML = `Blue Ball: ${adjustedSize}`
	} else if (ball.name === "Green Ball"){
		document.getElementById("3").innerHTML = `Green Ball: ${adjustedSize}`
	} else if (ball.name === "Pink Ball"){
		document.getElementById("4").innerHTML = `Pink Ball: ${adjustedSize}`
	}
}
winnerball = []
function updateBall(ball) {
    //updateColour(ball)
    moveBall(ball);
    // Circular boundary collision detection
    let distFromCenter = Math.sqrt((ball.x - centerX) ** 2 + (ball.y - centerY) ** 2);
    let angleFromCenter = Math.atan2(ball.y - centerY, ball.x - centerX);

    const startAngle = rotationAngle;
    const endAngle = (rotationAngle + Math.PI * 2 - gapAngle) % (Math.PI * 2);

    if (distFromCenter + ball.radius > boundaryRadius) {
		updateSizes(ball)
		if (ball.radius < 0){
			ball.radius = 1
		}
        let angle = Math.atan2(ball.y - centerY, ball.x - centerX);
        // Calculate the normal vector
        const normalX = Math.cos(angle);
        const normalY = Math.sin(angle);

        // Calculate the dot product of the velocity and the normal
        const dotProduct = ball.dx * normalX + ball.dy * normalY;

        if (isBallInGap(ball.x, ball.y, centerX, centerY, rotationAngle, startAngle, endAngle, ball.radius) && gap) {
            winnerball.push(ball);
            circleBroken = true;
        } else {
            ball.dx = ball.dx - 2 * dotProduct * normalX * ball.elasticity;
            ball.dy = ball.dy - 2 * dotProduct * normalY * ball.elasticity;

            // Ensure the ball is exactly at the boundary
            ball.x = centerX + (boundaryRadius - ball.radius) * normalX;
            ball.y = centerY + (boundaryRadius - ball.radius) * normalY;
			playSound()
        }
    }

    // Check for collision with other balls
	for (let i = 0; i < balls.length; i++) {
        if (balls[i] !== ball) {
            let dx = ball.x - balls[i].x;
            let dy = ball.y - balls[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + balls[i].radius) {
                playSound();
                
                // Separate the balls to prevent them from overlapping
                let overlap = (ball.radius + balls[i].radius) - distance;
                let separationX = (overlap / 2) * (dx / distance);
                let separationY = (overlap / 2) * (dy / distance);
                ball.x += separationX;
                ball.y += separationY;

                // Calculate the normal vector
                let normalX = dx / distance;
                let normalY = dy / distance;

                // Calculate relative velocity
                let relativeVelocityX = ball.dx;
                let relativeVelocityY = ball.dy;

                // Calculate the dot product of the relative velocity and the normal
                let dotProduct = relativeVelocityX * normalX + relativeVelocityY * normalY;

                // Reflect the velocity vector of the moving ball
                ball.dx -= 2 * dotProduct * normalX * ball.elasticity;
                ball.dy -= 2 * dotProduct * normalY * ball.elasticity;
            }
        
        }
    }
}


function draw() {
	resizeCanvas();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (circleBroken) {
		balls.forEach((ball) => {
			drawBoundary(ball);
			drawBall(ball);
		});
		winnerball.forEach((literallyonewinnerletsgoo) => {
			moveBall(literallyonewinnerletsgoo)
		})
	} else {
		balls.forEach((ball) => {
			drawBoundary(ball);
			drawBall(ball);
			//updateBall(ball)
		});
		lastball = balls[balls.length - 1];
		// penultimball = balls[balls.length-2]
		updateBall(lastball);
		// updateBall(penultimball)

		//trail.forEach((trailBall) => drawBall(trailBall));
	}

	rotationAngle += rotationSpeed;
	rotationAngle = rotationAngle % (Math.PI * 2);
	requestAnimationFrame(draw);
}
if (duplication){
let duplicateInterval = setInterval(() => {
	// Call the duplicateBall function with the initial ball as the argument
	if (circleBroken == true) {
		clearInterval(duplicateInterval);
	} else {
		duplicateBall(initialBall);
	}
}, aliveTime);
}
function toggleGravity(checked) {
	balls.forEach((ball) => (initialBall.useGravity = checked));
	checkDisabled();
}

function toggleElasticity(checked) {
	balls.forEach((ball) => (initialBall.useElasticity = checked));
	checkDisabled();
}

function checkDisabled() {
	if (!initialBall.useGravity && !initialBall.useElasticity) {
		speedInput.disabled = false;
	} else {
		speedInput.disabled = true;
		speedInput.value = Math.sqrt(
			initialBall.dx * initialBall.dx + initialBall.dy * initialBall.dy
		).toFixed(1);
	}
}

function updateSpeed(value) {
	balls.forEach((ball) => {
		ball.dx = parseFloat(value);
		ball.dy = parseFloat(value);
	});
}

function resizeCanvas() {
	canvas.width = window.innerWidth * 0.6;
	canvas.height = window.innerHeight * 0.9;
	balls.forEach((ball) => {
		if (ball.x + ball.radius > canvas.width) {
			ball.x = canvas.width - ball.radius;
		}
		if (ball.y + ball.radius > canvas.height) {
			ball.y = canvas.height - ball.radius;
		}
	});
}

resizeCanvas();
draw();
