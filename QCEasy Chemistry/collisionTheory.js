const canvas = document.getElementById("collisionCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

class Particle {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.dx = (Math.random() - 0.5) * this.speed;
        this.dy = (Math.random() - 0.5) * this.speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy *= -1;
        }
    }
}

const particles = [];
for (let i = 0; i < 10; i++) {
    particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        10,
        "blue",
        2
    ));
}

function detectCollision(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < p1.radius + p2.radius) {
        if (Math.random() > 0.5) { 
            p1.color = "red"; // Successful reaction
            p2.color = "red";
        } else {
            const tempDx = p1.dx;
            const tempDy = p1.dy;
            p1.dx = p2.dx;
            p1.dy = p2.dy;
            p2.dx = tempDx;
            p2.dy = tempDy;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.move();
        p.draw();
    });
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            detectCollision(particles[i], particles[j]);
        }
    }

    requestAnimationFrame(animate);
}

animate();
