var Snake = function (position_) {

    var position = position_;
    var pastDirection;
    var crash = false;

    function contraDirectionCheck(pastDirection_, direction_) {
        if ((pastDirection_ === 'left' && direction_ === 'right') ||
            (pastDirection_ === 'right' && direction_ === 'left') ||
            (pastDirection_ === 'up' && direction_ === 'down') ||
            (pastDirection_ === 'down' && direction_ === 'up')) {
            crash = true;
        }
    }

    this.move = function (direction_, grow_) {
        contraDirectionCheck(pastDirection, direction_);

        if (crash === true) {
            console.error('Game Over');
            return false;
        } else {
            switch (direction_) {
                case 'left':
                    position.push({x: position[position.length - 1].x - 1, y: position[position.length - 1].y});
                    if(grow_ === false) position.shift();
                    break;
                case 'up':
                    position.push({x: position[position.length - 1].x, y: position[position.length - 1].y - 1});
                    if(grow_ === false) position.shift();
                    break;
                case 'down':
                    position.push({x: position[position.length - 1].x, y: position[position.length - 1].y + 1});
                    if(grow_ === false) position.shift();
                    break;
                case 'right':
                    position.push({x: position[position.length - 1].x + 1, y: position[position.length - 1].y});
                    if(grow_ === false) position.shift();
                    break;
                default: break;
            } // end of switch

            pastDirection = direction_;
            return true;
        } // end of else

    }; // end of move method
/*
    this.grow = function (snakeLastPartLocation_) {
        position.unshift(snakeLastPartLocation_);
    };
*/
    this.getPosition = function () {
        return position;
    };

}; // end of Snake class