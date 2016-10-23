var System;
(function (System) {
    var ComponentModel;
    (function (ComponentModel) {
        var DataAnnotations;
        (function (DataAnnotations) {
            DataAnnotations.GenericValidationAnnotation = new Dictionary();
            DataAnnotations.GenericAttributeAnnotation = new Dictionary();
            ;
            function display(displayName) {
                function displayDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var displayDataAnnotation;
                    displayDataAnnotation = new DisplayDataAnnotation(key, displayName);
                    var getter = function () {
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericAttributeAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.Display], displayDataAnnotation);
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
                return displayDecorator;
            }
            DataAnnotations.display = display;
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
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.Required], requiredDataAnnotation);
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
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.EmailAddress], emailDataAnnotation);
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
            function phone(errorMessage) {
                function phoneDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var phoneDataAnnotation;
                    if (errorMessage === "") {
                        phoneDataAnnotation = new PhonedDataAnnotation(key, currentPropertyValue);
                    }
                    else {
                        phoneDataAnnotation = new PhonedDataAnnotation(key, currentPropertyValue, errorMessage);
                    }
                    var getter = function () {
                        ;
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.Phone], phoneDataAnnotation);
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
                return phoneDecorator;
            }
            DataAnnotations.phone = phone;
            function regex(regexPattern, errorMessage) {
                function regexDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var regexDataAnnotation;
                    if (errorMessage === "") {
                        regexDataAnnotation = new RegexDataAnnotation(key, currentPropertyValue, regexPattern);
                    }
                    else {
                        regexDataAnnotation = new RegexDataAnnotation(key, currentPropertyValue, regexPattern, errorMessage);
                    }
                    var getter = function () {
                        ;
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.RegularExpression], regexDataAnnotation);
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
                return regexDecorator;
            }
            DataAnnotations.regex = regex;
            function creditcard(errorMessage) {
                function creditcardDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var creditCardDataAnnotation;
                    if (errorMessage === "") {
                        creditCardDataAnnotation = new CreditCardDataAnnotation(key, currentPropertyValue);
                    }
                    else {
                        creditCardDataAnnotation = new CreditCardDataAnnotation(key, currentPropertyValue, errorMessage);
                    }
                    var getter = function () {
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.CreditCard], creditCardDataAnnotation);
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
                return creditcardDecorator;
            }
            DataAnnotations.creditcard = creditcard;
            function range(errorMessage, minimum, maximum) {
                function rangeDecorator(target, key) {
                    target.constructor();
                    var currentPropertyValue = target[key];
                    var rangeDataAnnotation;
                    if (errorMessage === "") {
                        rangeDataAnnotation = new RangeDataAnnotation(key, currentPropertyValue);
                    }
                    else {
                        rangeDataAnnotation = new RangeDataAnnotation(key, currentPropertyValue, errorMessage);
                    }
                    var getter = function () {
                        return currentPropertyValue;
                    };
                    var setter = function (newVal) {
                        DataAnnotations.GenericValidationAnnotation.Add([key, target.constructor.name, CSharpDataAnnoationType.Range], rangeDataAnnotation);
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
                return rangeDecorator;
            }
            DataAnnotations.range = range;
        })(DataAnnotations = ComponentModel.DataAnnotations || (ComponentModel.DataAnnotations = {}));
    })(ComponentModel = System.ComponentModel || (System.ComponentModel = {}));
})(System || (System = {}));
