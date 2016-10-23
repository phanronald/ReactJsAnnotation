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
                    function LabelHelper(className, property, htmlAttributes) {
                        var _this = this;
                        this.className = className;
                        this.property = property;
                        this.htmlAttributes = htmlAttributes;
                        this.GetHtml = function () {
                            return _this.SetupReactElement();
                        };
                        this.SetupLabel = function () {
                            var sanitizedFieldName = _this.tagBuilder.CreateSanitizedId(_this.property, "_");
                            var sanitizedLabelFieldName = "";
                            if (typeof sanitizedFieldName === "string") {
                                sanitizedLabelFieldName = sanitizedFieldName;
                            }
                            _this.tagBuilder.MergeAttribute("htmlFor", sanitizedLabelFieldName, false);
                            _this.tagBuilder.SetInnerText(_this.labelText);
                            _this.tagBuilder.MergeAttributes(_this.htmlAttributes, true);
                            return _this.tagBuilder.ToString(TagRenderMode.Normal);
                        };
                        this.SetupReactElement = function () {
                            return Html.HtmlUtility.CreateReactJsElement("label", _this.aspnetMvcString);
                        };
                        this.tagBuilder = new System.Web.Mvc.TagBuilder("label");
                        var attributeDictionary = System.ComponentModel.DataAnnotations.GenericAttributeAnnotation;
                        if (attributeDictionary.Count() > 0) {
                            var allGenericAnnotationForProperty = attributeDictionary.Where(function (x) { return x.key[0] == property && x.key[1] == className.name; });
                            if (allGenericAnnotationForProperty.Count() > 0) {
                                var allGenericDataAnnotations = allGenericAnnotationForProperty.GetValues();
                                for (var i = 0; i < allGenericDataAnnotations.length; i++) {
                                    var genericAnnotationDictionary = allGenericDataAnnotations[i];
                                    if (genericAnnotationDictionary !== undefined) {
                                        this.labelText = genericAnnotationDictionary.Name;
                                    }
                                }
                            }
                            else {
                                this.labelText = property;
                            }
                        }
                        this.aspnetMvcString = this.SetupLabel();
                    }
                    return LabelHelper;
                }());
                var LabelFor = (function (_super) {
                    __extends(LabelFor, _super);
                    function LabelFor(className, property, htmlAttributes) {
                        _super.call(this, className, property, htmlAttributes);
                        this.className = className;
                        this.property = property;
                        this.htmlAttributes = htmlAttributes;
                    }
                    return LabelFor;
                }(LabelHelper));
                Html.LabelFor = LabelFor;
            })(Html = Mvc.Html || (Mvc.Html = {}));
        })(Mvc = Web.Mvc || (Web.Mvc = {}));
    })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
