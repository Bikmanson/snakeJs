function SnakeGame(wrapperId_, rows_, columns_) {

  /*
  var position = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0}
  ];
  */

  // variables declaration
  var rows = rows_ ? rows_ : 10;
  var columns = columns_ ? columns_ : 10;
  var currentDirection;
  var foodCoordinates;
  var newFood = true;
  var play = false;
  var playSwitch = false;
  var matrix;
  var position = newSnakePosition(3, 'horizontal');

  // needed objects creating
  var matrixFactory = new MatrixFactory();
  var food = new FoodFactory();
  var field = new Field(wrapperId_); // knows were
  var snake;

  //-------------------------declaration methods------------------------------------------

  function newSnakePosition(n, position) {
    var newPosition = [];

    switch (position) {
      case 'horizontal':
        for (var i = 0; i < n; i++) {
          var a = {x: i, y: 0};
          newPosition.push(a);
        }
        break;
      case 'vertical':
        for (var j = 0; j < n; j++) {
          var b = {x: 0, y: j};
          newPosition.push(b);
        }
        break;
    }

    return newPosition;
  }

  // set the start field view
  this.defaultStartView = function() {
    position = newSnakePosition(3, 'horizontal');
    snake = new Snake(position); // knows the first position of snake

    matrix = matrixFactory.create(rows, columns);
    snake.getPosition().map(function (point) {
      matrix[point.y][point.x].className = 'snake';
    });
    foodCoordinates = food.create(matrix, 'cell');
    matrix[foodCoordinates.y][foodCoordinates.x].className = 'food';
    field.render(matrix);
  }

  // checking - grows or not ?
  function toGrow(currentDirection_) {
    switch (currentDirection_) {
      case 'left':
        return (position[position.length - 1].x === (foodCoordinates.x + 1) && position[position.length - 1].y === foodCoordinates.y);
      case 'up':
        return (position[position.length - 1].x === foodCoordinates.x && position[position.length - 1].y === (foodCoordinates.y + 1));
      case 'right':
        return (position[position.length - 1].x === (foodCoordinates.x - 1) && position[position.length - 1].y === foodCoordinates.y);
      case 'down':
        return (position[position.length - 1].x === foodCoordinates.x && position[position.length - 1].y === (foodCoordinates.y - 1));
    }
  }

  function isBroken(position, matrix) {
    // return false;
    console.log(matrix[position[position.length - 1].y][position[position.length - 1].x].className === 'cell')//&&
    //matrix[position[position.length - 1].y][position[position.length - 1].x].className !== 'food');
    //return (matrix[position[position.length - 1].y][position[position.length - 1].x].className !== 'cell' &&
    //  matrix[position[position.length - 1].y][position[position.length - 1].x].className !== 'food');
  }

  /*
      // checking - if breaking
      function breakAgainstTheWall(position_, xLimit_, yLimit_) {
          return (position_[position_.length - 1].x > (xLimit_ - 1) || position_[position_.length - 1].y > (yLimit_ - 1) ||
              position_[position_.length - 1].x < 0 || position_[position_.length - 1].y < 0);
      }

      //checking - is next cell a snake
      function breakAgainstItself(currentPosition_) {
          var broken = false;
          currentPosition_.slice(0, (currentPosition_.length - 1)).map(function(point){
              if(currentPosition_[currentPosition_.length - 1].x === point.x && currentPosition_[currentPosition_.length - 1].y === point.y){
                  broken = true;
              }
          });
          return broken;
      }
      */

  // game on
  this.toPlay = function() {
    //var brokenByWall = false;
    //var brokenByItself = false;
    var broken = false;
    var grow = false;
    var currentPosition = snake.getPosition();
    playSwitch = true;
    var toPlay = setInterval(function () {
        matrix = matrixFactory.create(rows, columns); // matrix creating
        grow = toGrow(currentDirection); // Checking - to grow or not?
        play = snake.move(currentDirection, grow); // snake movement - new snake position
        //brokenByWall = breakAgainstTheWall(position, columns, rows); // Checking - to break against the wall or not?

        // Checking - to break against itself?
        currentPosition = snake.getPosition().slice(); // see the current position
        broken = isBroken(currentPosition, matrix);
        //console.log(broken);
        // brokenByItself = breakAgainstItself(currentPosition);  // the checking

        // stop interval
        if (!play || broken) { //|| brokenByWall || brokenByItself) {
          clearInterval(toPlay);
          document.getElementById('error').style.display = 'block';
          play = false;
          //brokenByWall = false;
          //brokenByItself = false;
          return;
        }

        // show the snake on the field
        snake.getPosition().map(function (point) {
          matrix[point.y][point.x].className = 'snake';
        });

        newFood = (matrix[foodCoordinates.y][foodCoordinates.x].className === 'snake'); // to make new food ?
        if (newFood) {
          foodCoordinates = food.create(matrix, 'cell');
        } else {
          matrix[foodCoordinates.y][foodCoordinates.x].className = 'food'; // show the food on the field
        }

        field.render(matrix); // render new view of field
      }
      , 200);
  }

  var thisFunc = this;
  function newGame() {
    document.getElementById('error').style.display = 'none';
    thisFunc.defaultStartView();
    thisFunc.addEventListeners();
    thisFunc.toPlay();
  }

  //________________________________________declaration methods____________________________________________

  // defaultStartView();

  this.addEventListeners = function(){
    // change direction by keys
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 37) {
        currentDirection = 'left';
        if (!play) play = true;
      }
      if (e.keyCode === 38) {
        currentDirection = 'up';
        if (!play) play = true;
      }
      if (e.keyCode === 39) {
        currentDirection = 'right';
        if (!play) play = true;
        if (!playSwitch) thisFunc.toPlay();
      }
      if (e.keyCode === 40) {
        currentDirection = 'down';
        if (!play) play = true;
        if (!playSwitch) thisFunc.toPlay();
      }
      if (e.keyCode === 13) {
        newGame();
      }
    });
  }

}

// TODO: fix code were it using class FoodFactory
// TODO: fix broken methods
// TODO: make particular class LoseModal (call when game over)
// TODO: make game restart
// TODO: etc. To make class Game less large, less dependent and more using OOP

