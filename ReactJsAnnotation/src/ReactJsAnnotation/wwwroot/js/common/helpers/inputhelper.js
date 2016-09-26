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
                var CheckBoxFor = (function (_super) {
                    __extends(CheckBoxFor, _super);
                    function CheckBoxFor(fieldName, value, htmlAttributes) {
                        _super.call(this, InputType.CheckBox, fieldName, value, htmlAttributes);
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return CheckBoxFor;
                }(InputHelper));
                Html.CheckBoxFor = CheckBoxFor;
                var HiddenFor = (function (_super) {
                    __extends(HiddenFor, _super);
                    function HiddenFor(fieldName, value, htmlAttributes) {
                        _super.call(this, InputType.Hidden, fieldName, value, htmlAttributes);
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return HiddenFor;
                }(InputHelper));
                Html.HiddenFor = HiddenFor;
                var PasswordFor = (function (_super) {
                    __extends(PasswordFor, _super);
                    function PasswordFor(fieldName, value, htmlAttributes) {
                        _super.call(this, InputType.Password, fieldName, value, htmlAttributes);
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return PasswordFor;
                }(InputHelper));
                Html.PasswordFor = PasswordFor;
                var RadioButtonFor = (function (_super) {
                    __extends(RadioButtonFor, _super);
                    function RadioButtonFor(fieldName, value, htmlAttributes) {
                        _super.call(this, InputType.Radio, fieldName, value, htmlAttributes);
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return RadioButtonFor;
                }(InputHelper));
                Html.RadioButtonFor = RadioButtonFor;
                var TextBoxFor = (function (_super) {
                    __extends(TextBoxFor, _super);
                    function TextBoxFor(fieldName, value, htmlAttributes) {
                        _super.call(this, InputType.Text, fieldName, value, htmlAttributes);
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return TextBoxFor;
                }(InputHelper));
                Html.TextBoxFor = TextBoxFor;
                var InputHelper = (function () {
                    function InputHelper(inputType, fieldName, value, htmlAttributes) {
                        var _this = this;
                        this.inputType = inputType;
                        this.fieldName = fieldName;
                        this.value = value;
                        this.htmlAttributes = htmlAttributes;
                        this.GetHtmlString = function () {
                            return _this.aspnetMvcString;
                        };
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
                            return Mvc.HtmlUtility.CreateReactJsElement("input", _this.aspnetMvcString);
                        };
                        this.tagBuilder = new System.Web.Mvc.TagBuilder("input");
                        this.inputValue = (value !== undefined && value !== null) ? value.toString() : "";
                        this.aspnetMvcString = this.SetupInput();
                    }
                    return InputHelper;
                }());
            })(Html = Mvc.Html || (Mvc.Html = {}));
        })(Mvc = Web.Mvc || (Web.Mvc = {}));
    })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
