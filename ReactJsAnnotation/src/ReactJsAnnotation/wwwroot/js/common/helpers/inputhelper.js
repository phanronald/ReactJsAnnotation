var BasicNetCore;
(function (BasicNetCore) {
    var InputExtensions;
    (function (InputExtensions) {
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
                            _this.tagBuilder.MergeAttribute("value", _this.inputValue, true);
                            break;
                        }
                    }
                    ;
                    if (_this.inputType === InputType.CheckBox) {
                        return _this.tagBuilder.ToString(TagRenderMode.SelfClosing);
                    }
                    else {
                        return _this.tagBuilder.ToString(TagRenderMode.SelfClosing);
                    }
                };
                this.SetupReactElement = function () {
                    return BasicNetCore.HtmlUtility.CreateReactJsElement("input", _this.aspnetMvcString);
                };
                this.tagBuilder = new BasicNetCore.HtmlBuilder.TagBuilder("input");
                this.inputValue = (value !== undefined && value !== null) ? value.toString() : "";
                this.aspnetMvcString = this.SetupInput();
            }
            return InputHelper;
        }());
        InputExtensions.InputHelper = InputHelper;
    })(InputExtensions = BasicNetCore.InputExtensions || (BasicNetCore.InputExtensions = {}));
})(BasicNetCore || (BasicNetCore = {}));
