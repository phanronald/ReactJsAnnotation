var BasicNetCore;
(function (BasicNetCore) {
    var HtmlBuilder;
    (function (HtmlBuilder) {
        var TagBuilder = (function () {
            function TagBuilder(tagName) {
                var _this = this;
                this.AddCss = function (value) {
                    var classAttribute = _this.Attributes.GetItem("class");
                    if (classAttribute !== undefined || classAttribute !== null) {
                        var currentCssClass = classAttribute.value + " " + value;
                        classAttribute[classAttribute.key] = currentCssClass;
                    }
                };
                this.CreateSanitizedId = function (originalId, invalidCharReplacement) {
                    if (originalId === undefined || originalId === null || originalId === "") {
                        return undefined;
                    }
                    if (invalidCharReplacement === undefined || invalidCharReplacement === null) {
                        return new Error("invalidCharReplacement");
                    }
                    var ch = originalId.charAt(0);
                    if (_this.IsLetter(ch.charCodeAt(0))) {
                        return undefined;
                    }
                    var sb = ch;
                    for (var i = 1; i < originalId.length; i++) {
                        var nextCh = originalId.charAt(i);
                        if (_this.IsValidIdCharacter(nextCh.charCodeAt(0))) {
                            sb += nextCh;
                        }
                        else {
                            sb += invalidCharReplacement;
                        }
                    }
                    return sb;
                };
                this.GenerateId = function (name) {
                    if (!_this.Attributes.ContainsKey("id")) {
                        var value = _this.CreateSanitizedId(name, _this.GetIdAttributeDotReplacement());
                        if (typeof value === "string") {
                            _this.Attributes["id"] = value;
                        }
                    }
                };
                this.GetIdAttributeDotReplacement = function () {
                    if (_this.IdAttributeDotReplacement === undefined || _this.IdAttributeDotReplacement === null || _this.IdAttributeDotReplacement === "") {
                        _this.IdAttributeDotReplacement = "_";
                    }
                    return _this.IdAttributeDotReplacement;
                };
                this.MergeAttribute = function (key, value, replaceExisting) {
                    if (replaceExisting || !_this.Attributes.ContainsKey(key)) {
                        _this.Attributes.Add(key, value);
                    }
                };
                this.MergeAttributes = function (attributes, replaceExisting) {
                    if (attributes !== undefined && attributes !== null) {
                        for (var _i = 0, _a = attributes.ToArray(); _i < _a.length; _i++) {
                            var kvPair = _a[_i];
                            var key = String(kvPair.key);
                            var value = String(kvPair.value);
                            _this.MergeAttribute(key, value, replaceExisting);
                        }
                    }
                };
                this.SetIdAttributeDotReplacement = function (idAttributeDotReplacement) {
                    _this.IdAttributeDotReplacement = idAttributeDotReplacement;
                };
                this.SetInnerText = function (innerText) {
                    _this.InnerHtml = BasicNetCore.HtmlUtility.HtmlEncode(innerText);
                };
                this.ToString = function (renderMode) {
                    var sb = "";
                    switch (renderMode) {
                        case TagRenderMode.StartTag: {
                            sb += "<" + _this.TagName + _this.AppendAttributes() + " >";
                            break;
                        }
                        case TagRenderMode.EndTag: {
                            sb += "</" + _this.TagName + ">";
                            break;
                        }
                        case TagRenderMode.SelfClosing: {
                            sb += "<" + _this.TagName + _this.AppendAttributes() + " />";
                            break;
                        }
                        default: {
                            sb += "<" + _this.TagName + _this.AppendAttributes() + " >";
                            sb += _this.InnerHtml + "</" + _this.TagName + ">";
                            break;
                        }
                    }
                    ;
                    return sb;
                };
                this.AppendAttributes = function () {
                    var htmlAttributeString = "";
                    if (_this.Attributes !== undefined && _this.Attributes !== null) {
                        for (var _i = 0, _a = _this.Attributes.ToArray(); _i < _a.length; _i++) {
                            var kvPair = _a[_i];
                            var key = kvPair.key;
                            if (key !== "id" || kvPair.value !== "") {
                                htmlAttributeString += " " + key + "=\"" + kvPair.value + "\"";
                            }
                        }
                    }
                    return htmlAttributeString;
                };
                this.IsAllowableSpecialCharacter = function (ch) {
                    return ch === 45 || ch === 58 || ch === 95;
                };
                this.IsDigit = function (ch) {
                    return ch >= 48 && ch <= 57;
                };
                this.IsLetter = function (ch) {
                    return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122);
                };
                this.IsValidIdCharacter = function (ch) {
                    return _this.IsLetter(ch) || _this.IsDigit(ch) || _this.IsAllowableSpecialCharacter(ch);
                };
                this.TagName = tagName;
                this.Attributes = new Dictionary();
            }
            return TagBuilder;
        }());
        HtmlBuilder.TagBuilder = TagBuilder;
    })(HtmlBuilder = BasicNetCore.HtmlBuilder || (BasicNetCore.HtmlBuilder = {}));
})(BasicNetCore || (BasicNetCore = {}));
