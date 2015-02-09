module.exports = (function () {
    var getInt, getIntArray, getString, i, putInt, putIntArray, putString, storageValue, tmp, value = null;

    get = function (key) {
        if (typeof (Storage) !== "undefined") {
            return localStorage[key];
        }
        return null;
    };

    put = function (key, value) {
        if (typeof (Storage) !== "undefined") {
            localStorage[key] = value;
        }
    };

    getIntArray = function (key) {
        var i, storageValue, tmp, value = null;
        storageValue = get(key);
        if (storageValue) {
            tmp = storageValue.split(',');
            value = [];
            for (i = 0; i < tmp.length; i++) {
                value.push(parseInt(tmp[i]));
            }
        }
        return value;
    };

    getInt = function (key) {
        var value = get(key);
        if (value) {
            return parseInt(value);
        }
        return null;
    };

    getString = function (key) {
        return get(key) || null;
    };

    putIntArray = function (key, value) {
        put(key, '' + value);
    };

    putInt = function (key, value) {
        put(key, '' + value);
    };

    putString = function (key, value) {
        put(key, value);
    };

    return {
        create: function () {
            return {
                getInt: getInt,
                getIntArray: getIntArray,
                getString: getString,
                putInt: putInt,
                putIntArray: putIntArray,
                putString: putString
            };
        }
    };
}());
