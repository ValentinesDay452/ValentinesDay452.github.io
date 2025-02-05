document.addEventListener("DOMContentLoaded", function () {
    const revealBtn = document.getElementById("reveal-btn");
    const secretMessage = document.getElementById("secret-message");
    const winMessage = document.createElement("p");
    const revealHiddenBtn = document.createElement("button");
    const hiddenText = document.createElement("p");

    revealBtn.addEventListener("click", function () {
        secretMessage.classList.toggle("hidden");
    });

    
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 500;

    const player = {
        x: canvas.width / 2 - 30,
        y: canvas.height - 60,
        width: 60,
        height: 40,
        speed: 5
    };

    const hearts = [];
    const heartSize = 20;
    let score = 0;
    let misses = 0;
    let leftPressed = false;
    let rightPressed = false;

    function createHeart() {
        const x = Math.random() * (canvas.width - heartSize);
        hearts.push({ x, y: 0, speed: 2 + Math.random() * 2 });
    }

    function drawHeart(x, y, size) {
        ctx.fillStyle = "#e60073";
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
        ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        ctx.fill();
    }

    function drawHands() {
        ctx.fillStyle = "#ffcc99"; 
        ctx.beginPath();

        
        ctx.arc(player.x + 15, player.y + 20, 15, Math.PI, 2 * Math.PI);
        ctx.fill();
        
        
        ctx.arc(player.x + 45, player.y + 20, 15, Math.PI, 2 * Math.PI);
        ctx.fill();

        
        ctx.fillRect(player.x + 15, player.y + 20, 30, 10);
    }

    function drawHearts() {
        hearts.forEach((heart) => {
            drawHeart(heart.x, heart.y, heartSize);
        });
    }

    function moveHearts() {
        hearts.forEach((heart, index) => {
            heart.y += heart.speed;
            if (heart.y > canvas.height) {
                hearts.splice(index, 1);
                misses++;
                checkGameOver();
            }

            if (
                heart.y + heartSize / 2 > player.y &&
                heart.x > player.x &&
                heart.x < player.x + player.width
            ) {
                hearts.splice(index, 1);
                score++;
                checkWin();
            }
        });
    }

    function drawScore() {
        ctx.fillStyle = "#333";
        ctx.font = "18px Arial";
        ctx.fillText("Score: " + score, 10, 30);
        ctx.fillText("Misses: " + misses, 10, 50);
    }

    function checkGameOver() {
        if (misses >= 10) {
            score = 0;
            misses = 0;
            winMessage.remove(); 
            revealHiddenBtn.remove();
            hiddenText.remove();
        }
    }

    function checkWin() {
        if (score === 100) {
            winMessage.textContent = "WOW! YOU FOUND THE HIDDEN MESSAGE! CLICK BELOW TO UNVEIL IT";
            winMessage.style.color = "#e60073";
            winMessage.style.fontSize = "18px";

            revealHiddenBtn.textContent = "Silly :3";
            revealHiddenBtn.style.backgroundColor = "#ff4d94";
            revealHiddenBtn.style.color = "white";
            revealHiddenBtn.style.border = "none";
            revealHiddenBtn.style.padding = "10px 15px";
            revealHiddenBtn.style.fontSize = "16px";
            revealHiddenBtn.style.cursor = "pointer";
            revealHiddenBtn.style.borderRadius = "5px";
            revealHiddenBtn.style.marginTop = "10px";

            document.querySelector(".container").appendChild(winMessage);
            document.querySelector(".container").appendChild(revealHiddenBtn);

            revealHiddenBtn.addEventListener("click", function () {
                hiddenText.innerHTML = `HI HELLO YOU DID IT IM SO PROUD OF YOU!!! YOU REACHED 100 SCORE!! READ IT NEOW <br>
                Oh, my love, your beauty, vast as the sea,<br>
                An eternal force, like the stars’ wild decree.<br>
                As radiant as Aphrodite, from myth’s embrace,<br>
                Your elegance shines in every space.<br><br>
                Like Odysseus, lost, I wander through night,<br>
                But your love, my beacon, guides me to light.<br>
                Through tempests and trials, through oceans so wide,<br>
                Your heart is the shore where my soul must reside.<br><br>
                In the depths of my being, where shadows do creep,<br>
                I’ve wandered through Dante’s Inferno so deep.<br>
                But your touch pulls me out, like a soul from the fire,<br>
                Your love lifts me higher, like wings of desire.<br><br>
                Despite my flaws, my heart made of stone,<br>
                You see past the cracks, to the love I’ve grown.<br>
                Like a scientist’s work, with a delicate hand,<br>
                You nurture me gently, as only you can.<br><br>
                For you, I would fight every demon, every beast,<br>
                Tread the path of Hell, seeking your peace.<br>
                I'd face every torment, each trial, each strife,<br>
                Just to be by your side for the rest of my life.<br><br>
                As long as I breathe, and my heart still beats,<br>
                Your love is the rhythm, the pulse, the sweetest feat.<br>
                Even as dust we return to the stars,<br>
                Know, my love, you’re mine—no distance too far.<br><br>
                My soul forever yours, like the stars we come from,<br>
                Our love will endure, with no end to become.<br>
                So, let this be known, on this day of the heart:<br>
                My love for you, dear, will never depart.`;
                hiddenText.style.color = "#e60073";
                hiddenText.style.fontSize = "18px";
                document.querySelector(".container").appendChild(hiddenText);
                revealHiddenBtn.remove(); 
            });
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHands();
        drawHearts();
        moveHearts();
        drawScore();

        if (leftPressed && player.x > 0) {
            player.x -= player.speed;
        }
        if (rightPressed && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }

        requestAnimationFrame(update);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") leftPressed = true;
        if (event.key === "ArrowRight") rightPressed = true;
    });

    document.addEventListener("keyup", function (event) {
        if (event.key === "ArrowLeft") leftPressed = false;
        if (event.key === "ArrowRight") rightPressed = false;
    });

    setInterval(createHeart, 1000);
    update();
});
