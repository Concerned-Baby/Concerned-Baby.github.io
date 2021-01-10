var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
const paddleSpeed = 7;
console.log("program started")
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(key) 
{
	if(key.key == "Right" || key.key == "ArrowRight")  /*There conditionals are not being called */
	{
		rightPressed = true;
		console.log("Right True");
	}
	else if (key.key == "MoveLeft" || key.key == "ArrowLeft") 
	{
		leftPressed = true;
		console.log("Left True");
	}
	console.log(key.key); /* it is an object */
}

function keyUpHandler(key) 
{
	if(key.key == "Right" || key.key == "ArrowRight") 
	{
		rightPressed = false;
	}
	else if (key.key == "MoveLeft" || key.key == "ArrowLeft") 
	{
		leftPressed = false;
	}
}

function drawBall() 
{
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0099DD";
	ctx.fill();
	ctx.closePath();
}
function drawPaddle() 
{
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0099DD";
	ctx.fill();
	ctx.closePath();
}

function draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) 
	{
		dx = -dx;
	}
	
	if (y + dy < ballRadius)
	{
		dy = -dy;
	}
	else if (y + dy > canvas.height - ballRadius) 
	{
		if(x > paddleX && x < paddleX + paddleWidth) 
		{
			dy = -dy * 1.1;
		}
		else 
		{
			alert("GAME OVER");
			//document.location.reload();
			//clearInterval(interval);
			x = Math.floor(Math.random() * canvas.width) + ballRadius;
			y = Math.floor(Math.random() * canvas.height) + ballRadius;
			dx = Math.floor(Math.random() * 2) + 1;
			dy = Math.floor(Math.random() * 2) + 1;
		}
	}

	if (rightPressed) 
	{
		paddleX += paddleSpeed;
		if (paddleX + paddleWidth > canvas.width)
		{
			paddleX = canvas.width - paddleWidth;
		}
	}
	else if(leftPressed) 
	{
		paddleX -= paddleSpeed;
		if (paddleX < 0)
		{
			paddleX = 0;
		}
	}

	x += dx;
	y += dy;
}

setInterval(draw, 12);