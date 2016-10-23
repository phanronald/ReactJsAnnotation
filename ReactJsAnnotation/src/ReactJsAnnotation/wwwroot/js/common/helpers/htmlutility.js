var System;
(function (System) {
    var Web;
    (function (Web) {
        var Mvc;
        (function (Mvc) {
            var Html;
            (function (Html) {
                var HtmlUtility = (function () {
                    function HtmlUtility() {
                    }
                    HtmlUtility.HtmlEncode = function (source) {
                        var _this = this;
                        return String(source).replace(/[&<>"'\/]/g, function (s) { return _this.entityMap[s]; });
                    };
                    HtmlUtility.HtmlParsed = function (source) {
                        var domParser = new DOMParser();
                        return domParser.parseFromString(source, "text/html");
                    };
                    HtmlUtility.CreateReactJsElement = function (inputType, htmlString) {
                        var elementProperties = {};
                        var inputDocument = System.Web.Mvc.Html.HtmlUtility.HtmlParsed(htmlString);
                        var inputElement = inputDocument.getElementsByTagName(inputType)[0];
                        var attributes = inputElement.attributes;
                        for (var index in attributes) {
                            var currentAttribute = attributes[index];
                            if (currentAttribute !== undefined && currentAttribute !== null && typeof (currentAttribute) !== "function") {
                                if (currentAttribute.name !== undefined && currentAttribute.value !== undefined) {
                                    var attributeName = currentAttribute.name;
                                    if (currentAttribute.name === "defaultvalue") {
                                        attributeName = "defaultValue";
                                    }
                                    if (currentAttribute.name === "htmlfor") {
                                        attributeName = "htmlFor";
                                    }
                                    elementProperties[attributeName] = currentAttribute.value;
                                }
                            }
                        }
                        var isElementWithNoChildren = this.ElementsWithNoChildren.some(function (x) { return x == inputType; });
                        if (isElementWithNoChildren) {
                            return React.createElement(inputType, elementProperties);
                        }
                        else {
                            var childNodes = [];
                            var childValue = "";
                            for (var i = 0; i < inputElement.childNodes.length; i++) {
                                var currentInputElementChildNode = inputElement.childNodes[i];
                                var nodeType = this.NodeTypes[currentInputElementChildNode.nodeType];
                                if (nodeType === "Text") {
                                    childValue = currentInputElementChildNode.nodeValue;
                                }
                            }
                            if (childValue === "") {
                                return React.createElement(inputType, elementProperties, childNodes);
                            }
                            else if (childNodes.length == 0) {
                                return React.createElement(inputType, elementProperties, childValue);
                            }
                        }
                    };
                    HtmlUtility.entityMap = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': '&quot;',
                        "'": '&#39;',
                        "/": '&#x2F;'
                    };
                    HtmlUtility.ElementsWithNoChildren = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                        'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'textarea'];
                    HtmlUtility.NodeTypes = {
                        1: "Element",
                        2: "Attr",
                        3: "Text"
                    };
                    return HtmlUtility;
                }());
                Html.HtmlUtility = HtmlUtility;
            })(Html = Mvc.Html || (Mvc.Html = {}));
        })(Mvc = Web.Mvc || (Web.Mvc = {}));
    })(Web = System.Web || (System.Web = {}));
})(System || (System = {}));
