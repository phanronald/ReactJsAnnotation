var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        _super.apply(this, arguments);
    }
    Register.prototype.render = function () {
        var dataFromServer = this.props.dataFromServer;
        return (React.createElement("div", null, 
            React.createElement("section", null, Object.keys(dataFromServer).map(function (key, index) {
                var customAnnotation = dataFromServer[index];
                var dataAnnotationModel = new DataAnnotationModel(customAnnotation);
                var customReactElement = new System.Web.Mvc.Html.TextBoxFor(customAnnotation.fieldName, customAnnotation.fieldValue, dataAnnotationModel.GetAnnotations()).GetReactJsElement();
                return (React.createElement("div", {className: "row", key: index}, 
                    React.createElement("div", null, 
                        React.createElement("label", {htmlFor: customAnnotation.fieldName}, 
                            customAnnotation.displayName, 
                            ": "), 
                        customReactElement)
                ));
            })), 
            React.createElement("section", null, 
                React.createElement("div", null, 
                    React.createElement("button", null, 
                        React.createElement("div", null), 
                        "submit")
                )
            )));
    };
    return Register;
}(React.Component));
var regModel = new DataFromServerModel(registerModel);
ReactDOM.render(React.createElement(Register, {dataFromServer: regModel.dataFromServer}), document.getElementById('container'));
