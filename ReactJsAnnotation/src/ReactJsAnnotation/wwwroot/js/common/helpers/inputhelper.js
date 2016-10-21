var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var System;
(function (System) {
    var Web;
    (function (Web) {
        var Mvc;
        (function (Mvc) {
            var Html;
            (function (Html) {
                var InputHelper = (function () {
                    function InputHelper(inputType, fieldName, value, htmlAttributes) {
                        var _this = this;
                        this.inputType = inputType;
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                        this.GetReactJsElement = function () {
                            return _this.SetupReactElement();
                        };
                        this.GetInputTypeString = function (inputType) {
                            switch (inputType) {
                                case InputType.CheckBox: {
                                    return "checkbox";
                                }
                                case InputType.Hidden: {
                                    return "hidden";
                                }
                                case InputType.Password: {
                                    return "password";
                                }
                                case InputType.Radio: {
                                    return "radio";
                                }
                                case InputType.Text: {
                                    return "text";
                                }
                                default:
                                    {
                                        return "text";
                                    }
                            }
                            ;
                        };
                        this.SetupInput = function () {
                            _this.inputTypeString = _this.GetInputTypeString(_this.inputType);
                            _this.tagBuilder.MergeAttributes(_this.htmlAttributes, false);
                            _this.tagBuilder.MergeAttribute("type", _this.inputTypeString, false);
                            _this.tagBuilder.MergeAttribute("name", _this.fieldName, true);
                            _this.tagBuilder.GenerateId(_this.fieldName);
                            switch (_this.inputType) {
                                case InputType.CheckBox: {
                                    if (_this.inputValue !== "") {
                                        if (_this.value instanceof Boolean) {
                                            var booleanVersionOfValue = _this.value;
                                            if (booleanVersionOfValue) {
                                                _this.tagBuilder.MergeAttribute("checked", "checked", true);
                                            }
                                        }
                                    }
                                }
                                case InputType.Password:
                                case InputType.Hidden:
                                case InputType.Radio:
                                case InputType.Text:
                                default: {
                                    _this.tagBuilder.MergeAttribute("defaultValue", _this.inputValue, true);
                                    break;
                                }
                            }
                            ;
                            return _this.tagBuilder.ToString(TagRenderMode.SelfClosing);
                        };
                        this.SetupReactElement = function () {
                            return Html.HtmlUtility.CreateReactJsElement("input", _this.aspnetMvcString);
                        };
                        this.tagBuilder = new System.Web.Mvc.TagBuilder("input");
                        this.inputValue = (value !== undefined && value !== null) ? value.toString() : "";
                        this.aspnetMvcString = this.SetupInput();
                    }
                    return InputHelper;
                }());
                var InputElementHelper = (function () {
                    function InputElementHelper(className, property, keySelector) {
                        this.collectionOfAnnotations = new Dictionary();
                        this.property = property;
                        this.propertyValue = keySelector(property);
                        if (System.ComponentModel.DataAnnotations.GenericValidationAnnotation.Count() > 0) {
                            var allDataAnnotationForProperty = System.ComponentModel.DataAnnotations.GenericValidationAnnotation.Where(function (x) { return x.key[0] == property && x.key[1] == className.name; });
                            if (allDataAnnotationForProperty.Count() > 0) {
                                var allDataAnnotations = allDataAnnotationForProperty.GetValues();
                                for (var i = 0; i < allDataAnnotations.length; i++) {
                                    var dataAnnotationDictionary = allDataAnnotations[i];
                                    if (dataAnnotationDictionary !== undefined) {
                                        this.collectionOfAnnotations.AddRange(dataAnnotationDictionary.DataValueAttribute.ToArray());
                                    }
                                }
                            }
                        }
                    }
                    return InputElementHelper;
                }());
                var CheckBoxFor = (function (_super) {
                    __extends(CheckBoxFor, _super);
                    function CheckBoxFor(className, property, keySelector) {
                        _super.call(this, className, property, keySelector);
                    }
                    CheckBoxFor.prototype.GetHtml = function () {
                        return new InputHelper(InputType.CheckBox, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
                    };
                    return CheckBoxFor;
                }(InputElementHelper));
                Html.CheckBoxFor = CheckBoxFor;
                var HiddenFor = (function (_super) {
                    __extends(HiddenFor, _super);
                    function HiddenFor(className, property, keySelector) {
                        _super.call(this, className, property, keySelector);
                    }
                    HiddenFor.prototype.GetHtml = function () {
                        return new InputHelper(InputType.Hidden, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
                    };
                    return HiddenFor;
                }(InputElementHelper));
                Html.HiddenFor = HiddenFor;
                var PasswordFor = (function (_super) {
                    __extends(PasswordFor, _super);
                    function PasswordFor(className, property, keySelector) {
                        _super.call(this, className, property, keySelector);
                    }
                    PasswordFor.prototype.GetHtml = function () {
                        return new InputHelper(InputType.Password, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
                    };
                    return PasswordFor;
                }(InputElementHelper));
                Html.PasswordFor = PasswordFor;
                var RadioButtonFor = (function (_super) {
                    __extends(RadioButtonFor, _super);
                    function RadioButtonFor(className, property, keySelector) {
                        _super.call(this, className, property, keySelector);
                    }
                    RadioButtonFor.prototype.GetHtml = function () {
                        return new InputHelper(InputType.Radio, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
                    };
                    return RadioButtonFor;
                }(InputElementHelper));
                Html.RadioButtonFor = RadioButtonFor;
                var TextBoxFor = (function (_super) {
                    __extends(TextBoxFor, _super);
                    function TextBoxFor(className, property, keySelector) {
                        _super.call(this, className, property, keySelector);
                    }
                    TextBoxFor.prototype.GetHtml = function () {
                        return new InputHelper(InputType.Text, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
                    };
                    return TextBoxFor;
                }(InputElementHelper));
                Html.TextBoxFor = TextBoxFor;
            })(Html = Mvc.Html || (Mvc.Html = {}));
        })(Mvc = Web.Mvc || (Web.Mvc = {}));
    })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
