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
                var LabelHelper = (function () {
                    function LabelHelper(fieldName, text, htmlAttributes) {
                        var _this = this;
                        this.fieldName = fieldName;
                        this.text = text;
                        this.htmlAttributes = htmlAttributes;
                        this.GetHtmlString = function () {
                            return _this.aspnetMvcString;
                        };
                        this.GetReactJsElement = function () {
                            return _this.SetupReactElement();
                        };
                        this.SetupLabel = function () {
                            var sanitizedFieldName = _this.tagBuilder.CreateSanitizedId(_this.fieldName, "_");
                            var sanitizedLabelFieldName = "";
                            if (typeof sanitizedFieldName === "string") {
                                sanitizedLabelFieldName = sanitizedFieldName;
                            }
                            _this.tagBuilder.MergeAttribute("for", sanitizedLabelFieldName, false);
                            _this.tagBuilder.SetInnerText(_this.labelText);
                            _this.tagBuilder.MergeAttributes(_this.htmlAttributes, true);
                            return _this.tagBuilder.ToString(TagRenderMode.Normal);
                        };
                        this.SetupReactElement = function () {
                            return Html.HtmlUtility.CreateReactJsElement("label", _this.aspnetMvcString);
                        };
                        this.tagBuilder = new System.Web.Mvc.TagBuilder("label");
                        this.labelText = (text !== undefined && text !== null ? text.toString() : "");
                        this.aspnetMvcString = this.SetupLabel();
                    }
                    return LabelHelper;
                }());
                var LabelFor = (function (_super) {
                    __extends(LabelFor, _super);
                    function LabelFor(fieldName, text, htmlAttributes) {
                        _super.call(this, fieldName, text, htmlAttributes);
                        this.fieldName = fieldName;
                        this.text = text;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return LabelFor;
                }(LabelHelper));
                Html.LabelFor = LabelFor;
            })(Html = Mvc.Html || (Mvc.Html = {}));
        })(Mvc = Web.Mvc || (Web.Mvc = {}));
    })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
