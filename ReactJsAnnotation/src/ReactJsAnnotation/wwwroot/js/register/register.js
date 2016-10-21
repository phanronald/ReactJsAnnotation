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
        var registerModel = new vmRegister();
        registerModel.FirstName = "First";
        registerModel.LastName = "last";
        registerModel.CreditCard = 4111111111111111;
        var displayFor = [];
        var textboxFor = [];
        for (var property in registerModel) {
            var currentPropertyHtml = new System.Web.Mvc.Html.TextBoxFor(vmRegister, property, function (propertyName) { return registerModel[propertyName]; }).GetHtml();
            var displayValuesForDisplayProperty = System.ComponentModel.DataAnnotations.GenericAttributeAnnotation.Where(function (x) { return x.key[0] == property && x.key[1] == vmRegister; });
            textboxFor.push(currentPropertyHtml);
        }
        return (React.createElement("div", null, 
            React.createElement("section", null, Object.keys(textboxFor).map(function (key, index) {
                var textboxRegister = textboxFor[index];
                return (React.createElement("div", {className: "row", key: index}, 
                    React.createElement("div", null, textboxRegister)
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
ReactDOM.render(React.createElement(Register, null), document.getElementById('container'));
