var System;
(function (System) {
    var ComponentModel;
    (function (ComponentModel) {
        var DataAnnotations;
        (function (DataAnnotations) {
            DataAnnotations.GenericDataAnnotation = new Dictionary();
            function required(errorMessage) {
                function requiredDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var requiredDataAnnotation;
                    if (errorMessage === "") {
                        requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue);
                    }
                    else {
                        requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue, errorMessage);
                    }
                    var getter = function () {
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericDataAnnotation.Add([key, CSharpDataAnnoationType.Required], requiredDataAnnotation);
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
            function email(errorMessage) {
                function emailDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var emailDataAnnotation;
                    if (errorMessage === "") {
                        emailDataAnnotation = new EmailDataAnnotation(key, currentPropertyValue);
                    }
                    else {
                        emailDataAnnotation = new EmailDataAnnotation(key, currentPropertyValue, errorMessage);
                    }
                    var getter = function () {
                        console.log("Get: " + key + " => " + currentPropertyValue);
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        console.log("Set: " + key + " => " + newVal);
                        DataAnnotations.GenericDataAnnotation.Add([key, CSharpDataAnnoationType.EmailAddress], emailDataAnnotation);
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
                return emailDecorator;
            }
            DataAnnotations.email = email;
        })(DataAnnotations = ComponentModel.DataAnnotations || (ComponentModel.DataAnnotations = {}));
    })(ComponentModel = System.ComponentModel || (System.ComponentModel = {}));
})(System || (System = {}));
