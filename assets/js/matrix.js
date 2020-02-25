function MatrixFactory(config_) {

    //-------------config setting-----------------
    var config = config_;

    var defaultConfig = {
        cellTag: 'div',
        cellClass: 'cell'
    };

    if (config !== undefined) {
        Object.keys(defaultConfig).map(function (key) {
            if (config[key] === undefined) {
                config[key] = defaultConfig[key];
            }
        });
    } else {
        config = defaultConfig;
    }
    //______________________config setting______________________

    this.create = function (rows_, columns_) {

        var rows = rows_;
        var columns = columns_;
        var matrix = [];

        for (var y = 0; y < rows; y++) {
            matrix[y] = [];

            for (var x = 0; x < columns; x++) {
                matrix[y][x] = {className: config.cellClass, tagName: config.cellTag};
            }
        }

        return matrix;
    };

}

/*
var matrix = [
    [{className: 'snake', tagName: 'div'}, {className: 'snake', tagName: 'div'}, {className: 'cell', tagName: 'div'}],
    [{className: 'cell', tagName: 'div'}, {className: 'snake', tagName: 'div'}, {className  : 'cell', tagName: 'div'}],
    [{className: 'cell', tagName: 'div'}, {className: 'cell', tagName: 'div'}, {className: 'cell', tagName: 'div'}]
];
*/