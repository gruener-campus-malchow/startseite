/*
 _____  _          _       _
|  __ \(_)        | |     (_)                    _
| |  | |_ ___  ___| | __ _ _ _ __ ___   ___ _ __(_)
| |  | | / __|/ __| |/ _` | | '_ ` _ \ / _ \ '__|
| |__| | \__ \ (__| | (_| | | | | | | |  __/ |   _
|_____/|_|___/\___|_|\__,_|_|_| |_| |_|\___|_|  (_)

this was originally created to run in the browser's tab icon
when scaled up, it might behave strangely
*/

let snake = {
  load: function () {
    snake.cell = document.querySelector('.grid-cell[data-label="Snake"]');
    snake.cell.addEventListener('click', snake.init);
  },
  init: function () {
    snake.cell.removeEventListener('click', snake.init);
    snake.cell.addEventListener('click', snake.start);
    snake.cell.classList.add('static');
    snake.cell.classList.add('snake');
    snake.cell.innerHTML = '';

    snake.canvas = document.createElement('CANVAS');
    snake.canvas.width = 16;
    snake.canvas.height = 16;
    snake.cell.appendChild(snake.canvas);
    snake.renderingContext = snake.canvas.getContext('2d');

    document.body.addEventListener('keydown', snake.control);

    snake.snake = []; // nailed the naming on this one
    snake.food = {};

    snake.start();
  },


  start: function () {
    snake.snake = [{x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}];
    snake.direction = snake.directions.right;
    snake.gameOver = false;
    snake.generateFood();

    if (snake.interval) window.clearInterval(snake.interval);
    snake.interval = window.setInterval(snake.loop, 200);
    snake.render();
  },

  loop: function () {
    if (!snake.gameOver) {
      snake.move();

      if (snake.bodyAt(snake.food.x, snake.food.y)) {
        let tail = snake.snake[snake.snake.length - 1];
        // instead of having an instance, make a copy
        tail = {x: tail.x, y: tail.y};
        snake.snake.splice(0, 0, tail);

        snake.generateFood();
      }

      snake.render();
      document.title = 'Score: ' + (snake.snake.length - 3) + ' | Snake';
    } else {
      document.title = 'GAME OVER – <SPACE> to restart';
    }
  },


  render: function () {
    let imageData = snake.renderingContext.getImageData(0, 0, 16, 16);

    for (let x = 0; x < 16; x ++) {
      for (let y = 0; y < 16; y ++) {
        if (snake.bodyAt(x, y)) {
          setPixel(x, y, [0, 170, 68, 255]);
        } else if (snake.food.x == x && snake.food.y == y) {
          setPixel(x, y, [204, 0, 0, 255]);
        } else {
          setPixel(x, y, [238, 238, 238, 255]);
        }
      }
    }

    snake.renderingContext.putImageData(imageData, 0, 0);

    function setPixel(px, py, data) {
      let pos = (py * 16 + px) * 4;
      imageData.data[pos] = data[0];
      imageData.data[pos + 1] = data[1];
      imageData.data[pos + 2] = data[2];
      imageData.data[pos + 3] = data[3];
    }
  },



  move: function() {
    snake.snake.splice(0, 1);

    let head = snake.snake[snake.snake.length - 1];
    // instead of having an instance, make a copy
    head = {x: head.x, y: head.y};
    switch (snake.direction) {
      case snake.directions.right:
        head.x ++;
      break;
      case snake.directions.down:
        head.y ++;
      break;
      case snake.directions.left:
        head.x --;
      break;
      case snake.directions.up:
        head.y --;
    }

    if (snake.bodyAt(head.x, head.y) || head.x > 15 || head.x < 0 || head.y > 15 || head.y < 0) {
      snake.gameOver = true;
    }

    snake.snake.push(head);
  },

  control: function (e) {
    if (e.target != document.body) return;

    switch (e.keyCode) {
      case 87:
      case 38:
        if (snake.direction != snake.directions.down) snake.direction = snake.directions.up;
        break;
      case 65:
      case 37:
        if (snake.direction != snake.directions.right) snake.direction = snake.directions.left;
        break;
      case 83:
      case 40:
        if (snake.direction != snake.directions.up) snake.direction = snake.directions.down;
        break;
      case 68:
      case 39:
        if (snake.direction != snake.directions.left) snake.direction = snake.directions.right;
        break;
      case 32:
        snake.start();
      default:
        return;
    }

    e.preventDefault();
  },
  directions: {
    right: 0,
    down: 1,
    left: 2,
    up: 3
  },


  generateFood: function() {
    let touchingSnake = true;
    while (touchingSnake) {
      snake.food.x = Math.floor(Math.random() * 16);
      snake.food.y = Math.floor(Math.random() * 16);

      touchingSnake = snake.bodyAt(snake.food.x, snake.food.y);
    }
  },

  bodyAt: function(x, y) {
    for (let i = 0; i < snake.snake.length; i ++) {
      if (snake.snake[i].x == x && snake.snake[i].y == y) {
        return true;
      }
    }
    return false;
  }
};

document.addEventListener('DOMContentLoaded', snake.load);
