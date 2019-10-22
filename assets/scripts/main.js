let context, controller, rectangle, loop;

context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 180;
context.canvas.width = 320;

let floor = 36;

rectangle = {
  height: 32,
  jumping: false,
  width: 32,
  x: 144, 
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

controller = {
  left: false,
  right: false,
  up: false,

  keyListener: function(event) {
    let key_state = (event.type === 'keydown') ? true : false;

    switch(event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    }
  }
};

loop = function() {
  if (controller.up && rectangle.jumping === false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  rectangle.y_velocity += 1.5; // gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9; // friction
  rectangle.y_velocity *= 0.9; // friction

  if (rectangle.y > context.canvas.height - 36 - rectangle.height) {
    rectangle.jumping = false;
    rectangle.y = context.canvas.height - 36 - rectangle.height;
    rectangle.y_velocity = 0;
  }

  if (rectangle.x < -rectangle.height) {
    rectangle.x = context.canvas.width;
  } else if (rectangle.x > context.canvas.width) {
    rectangle.x = -rectangle.height;
  }

  context.fillStyle = '#202020';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = '#ff0000';
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = '#202020';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, context.canvas.width - floor);
  context.lineTo(context.canvas.width, context.canvas.width - floor);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);