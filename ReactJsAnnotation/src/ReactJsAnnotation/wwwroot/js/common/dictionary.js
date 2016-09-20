var Dictionary = (function () {
    function Dictionary() {
        var _this = this;
        this.internalArray = {};
        this.Add = function (key, value) {
            _this.internalArray[String(key)] = { key: key, value: value };
        };
        this.AddRange = function (items) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var kvPair = items_1[_i];
                _this.Add(kvPair.key, kvPair.value);
            }
        };
        this.Any = function (expression) {
            return expression === undefined ? _this.Count() > 0 : _this.ToArray().some(expression);
        };
        this.Clear = function () {
            _this.internalArray = {};
        };
        this.Concat = function (second) {
            var newConcatArray = _this.ToArray().concat(second.ToArray());
            return _this.ConvertArrayToDictionary(newConcatArray);
        };
        this.Contains = function (kvPair) {
            return _this.ToArray().some(function (x) { return x === kvPair; });
        };
        this.ContainsKey = function (key) {
            return (_this.GetItem(key) !== undefined);
        };
        this.ContainsValue = function (value) {
            var allValues = _this.GetValues();
            for (var _i = 0, allValues_1 = allValues; _i < allValues_1.length; _i++) {
                var val = allValues_1[_i];
                if (val === value) {
                    return true;
                }
            }
            return false;
        };
        this.Count = function (expression) {
            return expression === undefined ? Object.keys(_this.internalArray).length : _this.Where(expression).Count();
        };
        this.Distinct = function () {
            return _this.Where(function (value, index, iter) { return iter.indexOf(value) === index; });
        };
        this.ElementAt = function (index) {
            var kvPair = _this.internalArray[index];
            if (typeof (kvPair) === 'undefined') {
                return undefined;
            }
            return kvPair;
        };
        this.ElementAtOrDefault = function (index) {
            return _this.ElementAt(index) || undefined;
        };
        this.First = function (expression) {
            return expression === undefined ? _this.internalArray[0] : _this.Where(expression)[0];
        };
        this.FirstOrDefault = function (expression) {
            if (_this.Count() <= 0) {
                return undefined;
            }
            var firstKVPair = _this.First(expression);
            return (firstKVPair === undefined ? undefined : firstKVPair);
        };
        this.GetKeys = function () {
            var keyArray;
            Object.keys(_this.internalArray).map(function (key, index) {
                var kvPair = _this.internalArray[String(key)];
                keyArray.push(kvPair.key);
            });
            return keyArray;
        };
        this.GetItem = function (key) {
            return _this.internalArray[String(key)];
        };
        this.GetValue = function (key) {
            var kvPair = _this.internalArray[String(key)];
            if (typeof (kvPair) === 'undefined') {
                return undefined;
            }
            return kvPair.value;
        };
        this.GetValues = function () {
            var valueArray;
            Object.keys(_this.internalArray).map(function (key, index) {
                var kvPair = _this.internalArray[String(key)];
                valueArray.push(kvPair.value);
            });
            return valueArray;
        };
        this.Last = function (expression) {
            var dictionaryLengthIndex = _this.Count() - 1;
            return expression === undefined ? _this.internalArray[dictionaryLengthIndex] : _this.Where(expression)[dictionaryLengthIndex];
        };
        this.LastOrDefault = function (expression) {
            if (_this.Count() <= 0) {
                return undefined;
            }
            var lastKVPair = _this.Last(expression);
            return (lastKVPair === undefined ? undefined : lastKVPair);
        };
        this.OrderBy = function (keySelector) {
            var orderArrayComparer = _this.ComparerForKey(keySelector, false);
            var sortedArray = _this.ToArray().sort(orderArrayComparer);
            return _this.ConvertArrayToDictionary(sortedArray);
        };
        this.Reverse = function () {
            var reversedDictionary = new Dictionary();
            var arrayInReverse = _this.ToArray().reverse();
            for (var _i = 0, arrayInReverse_1 = arrayInReverse; _i < arrayInReverse_1.length; _i++) {
                var kvPair = arrayInReverse_1[_i];
                reversedDictionary.Add(kvPair.key, kvPair.value);
            }
            return reversedDictionary;
        };
        this.Select = function (expression) {
            var newArrayMapper = _this.ToArray().map(expression);
            return _this.ConvertArrayToDictionary(newArrayMapper);
        };
        this.Single = function (expression) {
            if (_this.Count() !== -1) {
                throw new TypeError('The collection does not contain exactly one element.');
            }
            return _this.First(expression);
        };
        this.SingleOrDefault = function (expression) {
            if (_this.Count() > 1) {
                throw new TypeError('The collection contains more than one element.');
            }
            return _this.Single(expression);
        };
        this.ToArray = function () {
            var dictionaryInArray = [];
            Object.keys(_this.internalArray).map(function (key, index) {
                var kvPair = _this.internalArray[String(key)];
                dictionaryInArray.push(kvPair);
            });
            return dictionaryInArray;
        };
        this.Union = function (second) {
            return _this.Concat(second).Distinct();
        };
        this.Where = function (expression) {
            var filteredArray = _this.ToArray().filter(expression);
            return _this.ConvertArrayToDictionary(filteredArray);
        };
        this.ConvertArrayToDictionary = function (arrayItems) {
            var newDictionary = new Dictionary();
            for (var _i = 0, arrayItems_1 = arrayItems; _i < arrayItems_1.length; _i++) {
                var kvPair = arrayItems_1[_i];
                newDictionary.Add(kvPair.key, kvPair.value);
            }
            return newDictionary;
        };
        this.ComparerForKey = function (keySelector, descending) {
            return function (a, b) {
                return _this.Compare(a, b, keySelector, descending);
            };
        };
        this.Compare = function (a, b, keySelector, descending) {
            var sortKeyA = keySelector(a);
            var sortKeyB = keySelector(b);
            var typeOfVariable = typeof (sortKeyA) == 'string';
            return typeOfVariable ? sortKeyA.localeCompare(b) : sortKeyA - sortKeyB;
        };
    }
    return Dictionary;
}());
