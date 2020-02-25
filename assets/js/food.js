function FoodFactory() {

    var foodX;
    var foodY;

    this.create = function (matrix, className) {

        var xRange = matrix[0].length;
        var yRange = matrix.length;

        do{
            foodX = Math.floor(Math.random() * xRange);
            foodY = Math.floor(Math.random() * yRange);
        }while(matrix[foodY][foodX].className !== className);

        matrix[foodY][foodX].className = 'food';

        return {x: foodX, y: foodY};
    };

    this.getLocation = function () {
        return {x: foodX, y: foodY};
    }

}