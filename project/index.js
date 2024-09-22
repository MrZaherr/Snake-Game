const pixel = 25;

const [right, left, up, down] = [0, 90, 180, 270];

const image = document.getElementById('head')
image.style.position = 'relative';


let randomX = getRandomInt(0, 19);
let randomY = getRandomInt(0, 19);

let score = 0;
//create food element
const food = document.createElement('img');
food.src = 'food.png';
food.style.position = 'absolute';

food.width = 25;
food.height = 25;

food.style.left = `${randomX * pixel}px`;
food.style.top = `${randomY * pixel}px`;

document.getElementById('board').appendChild(food);


setInterval(movement, 50);
setInterval(valid_game, 50);
document.addEventListener('keydown', handleKeyDown);

let bodyIndex = 0;

let snake = {
    left : 0,
    top : 0,
    direction : null,
    body : [

    ]
}

formerInfo = [];

let formerLeft;
let formerTop;

function valid_game() {
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.body[i].left === snake.left && snake.body[i].top === snake.top) {
            localStorage.setItem('score', score);
            window.location.href = 'gameover.html';
        }
    }
}


function updateValues(prev_left, prev_top) {
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.body[i].top === null && i === 0) {

            snake.body[i].left = prev_left;
            snake.body[i].top = prev_top;
            document.getElementById('board').appendChild(createElement(prev_left, prev_top));
        }
        else if (snake.body[i].top === null) {

            formerLeft = formerInfo[i - 1].left;
            formerTop = formerInfo[i - 1].top;

            snake.body[i].left = formerLeft;
            snake.body[i].top = formerTop;
            document.getElementById('board').appendChild(createElement(formerLeft, formerTop));
        }
        else {

            if (i > 0){
                formerLeft = formerInfo[i - 1].left;
                formerTop = formerInfo[i - 1].top;
            }

            snake.body[i].left = (i > 0) ? formerLeft : prev_left;
            snake.body[i].top = (i > 0) ? formerTop : prev_top;

            selectId = `${i}`;
            document.getElementById(selectId).style.left =  `${snake.body[i].left}px`;
            document.getElementById(selectId).style.top =  `${snake.body[i].top}px`;
        }
    }
}

function appendingBody() {

    let newPart = {left: null, top: null};
    snake.body.push(newPart);
}

function createElement(left, top) {
    const body = document.createElement('img');
    body.src = 'snake1.png';
    body.style.position = 'absolute';

    body.width = 25;
    body.height = 25;

    body.style.left = `${left}px`;
    body.style.top = `${top}px`;
    body.id = `${bodyIndex}`;
    bodyIndex ++;

    return body;
}

function handleKeyDown(event) {
     // Control events
    if (event.key === "ArrowRight") {
        snake.direction = right;
    }

    else if (event.key === "ArrowLeft") {
        snake.direction = left;
    }

    else if (event.key === "ArrowUp") {
        snake.direction = up;
    }

    else if (event.key === "ArrowDown") {
        snake.direction = down;
    }
}

function movement() {
    let prevLeft = snake.left;
    let prevRight = snake.top;

    for (let i = 0; i < snake.body.length; i++) {
        if (formerInfo[i] === undefined) {
            let astop = snake.body[i].top;
            let asleft = snake.body[i].left;
            formerInfo.push({left: asleft, top: astop});
        }
        else {
            formerInfo[i].left = snake.body[i].left;
            formerInfo[i].top = snake.body[i].top;
        }
    }


    if (snake.direction === right) {

        snake.left += pixel

        if (snake.left >= 500) {
            snake.left = 0;
        }

        image.style.left = `${snake.left}px`;
        onFood();
        updateValues(prevLeft, prevRight);
    }

    else if (snake.direction === left) {

        snake.left -= pixel

        if (snake.left < 0) {
            snake.left = 475;
        }

        image.style.left = `${snake.left}px`;
        onFood();
        updateValues(prevLeft, prevRight);
    }

    else if (snake.direction === up) {

        snake.top -= pixel

        if (snake.top < 0) {
            snake.top = 475;
        }

        image.style.top = `${snake.top}px`;
        onFood();
        updateValues(prevLeft, prevRight);
    }

    else if (snake.direction === down) {

        snake.top += pixel

        if (snake.top >= 500) {
            snake.top = 0;
        }

        image.style.top = `${snake.top}px`;
        onFood();
        updateValues(prevLeft, prevRight);
    }

}

function onFood() {
    if (image.style.top === food.style.top && image.style.left === food.style.left) {
        let randomX = getRandomInt(0, 19);
        let randomY = getRandomInt(0, 19);

        food.style.left = `${randomX * pixel}px`;
        food.style.top = `${randomY * pixel}px`;
        appendingBody();

        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

