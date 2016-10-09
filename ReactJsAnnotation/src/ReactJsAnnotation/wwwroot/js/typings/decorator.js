var System;
(function (System) {
    var ComponentModel;
    (function (ComponentModel) {
        var DataAnnotations;
        (function (DataAnnotations) {
            function required(errorMessage) {
                function requiredDecorator(target, key) {
                    var currentPropertyValue = this[key];
                    var requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue, errorMessage);
                    var getter = function () {
                        console.log("Get: " + key + " => " + currentPropertyValue);
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        console.log("Set: " + key + " => " + newVal);
                        requiredDataAnnotation.DataValueAttribute = newVal;
                        currentPropertyValue = newVal;
                    };
                    if (delete this[key]) {
                        Object.defineProperty(target, key, {
                            get: getter,
                            set: setter,
                            enumerable: true,
                            configurable: true
                        });
                    }
                }
                return requiredDecorator;
            }
            DataAnnotations.required = required;
        })(DataAnnotations = ComponentModel.DataAnnotations || (ComponentModel.DataAnnotations = {}));
    })(ComponentModel = System.ComponentModel || (System.ComponentModel = {}));
})(System || (System = {}));
function logClass(target) {
    var original = target;
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("New: " + original.name);
        return construct(original, args);
    };
    f.prototype = original.prototype;
    return f;
}
