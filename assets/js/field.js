function Field(wrapperId_, addConfig_) {

    var wrapperId = wrapperId_;
    var addConfig = addConfig_;

    var defaultConfig = {
        wallClass: '', //TODO: make wall default class
        rowClass: 'row',
        rowTag: 'div'
    };
    if (addConfig !== undefined) {
        Object.keys(defaultConfig).map(function (key) {
            if (addConfig[key] === undefined) {
                addConfig[key] = defaultConfig[key];
            }
        });
    } else {
        addConfig = defaultConfig;
    }

    this.render = function (matrix) {
        var wrapper = document.getElementById(wrapperId);
        wrapper.innerHTML = '';

        matrix.map(function (row_) {
            var row = document.createElement(addConfig.rowTag);
            row.className = addConfig.rowClass;

            row_.map(function (cell_) {
                var cell = document.createElement(cell_.tagName);
                cell.className = cell_.className;
                row.appendChild(cell);
            });

            wrapper.appendChild(row);
        });
    };

}