var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericDataAnnotation = (function () {
    function GenericDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        this.DataValueAttribute = new Dictionary();
        this.ErrorMessage = errorMessage;
        if (this.ErrorMessage !== undefined && this.ErrorMessage !== null) {
            this.ErrorMessage = this.ErrorMessage.replace("{0}", field);
        }
        this.isValidErrorMessage = (this.ErrorMessage !== undefined && this.ErrorMessage !== null &&
            this.ErrorMessage !== "");
        this.DataValueAttribute.Add("data-val", true);
        this.DataValueAttribute.Add("data-val-required", (this.isValidErrorMessage ? this.ErrorMessage : "The " + field + " field is required."));
        if (typeof (fieldValue) === "number") {
            this.DataValueAttribute.Add("data-val-number", "The field " + field + " must be a number.");
        }
    }
    return GenericDataAnnotation;
}());
var DisplayDataAnnotation = (function (_super) {
    __extends(DisplayDataAnnotation, _super);
    function DisplayDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "";
        this.AnnotationType = CSharpDataAnnoationType.Display;
        this.DataValueAttribute.Clear();
    }
    return DisplayDataAnnotation;
}(GenericDataAnnotation));
var RequiredDataAnnotation = (function (_super) {
    __extends(RequiredDataAnnotation, _super);
    function RequiredDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The " + field + " field is required.";
        this.AnnotationType = CSharpDataAnnoationType.Required;
    }
    return RequiredDataAnnotation;
}(GenericDataAnnotation));
var EmailDataAnnotation = (function (_super) {
    __extends(EmailDataAnnotation, _super);
    function EmailDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The " + field + " field is not a valid e-mail address.";
        this.AnnotationType = CSharpDataAnnoationType.EmailAddress;
        this.DataValueAttribute.Clear();
        this.DataValueAttribute.Add("data-val-email", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
    }
    return EmailDataAnnotation;
}(GenericDataAnnotation));
var PhonedDataAnnotation = (function (_super) {
    __extends(PhonedDataAnnotation, _super);
    function PhonedDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The " + field + " field is not a valid phone number.";
        this.AnnotationType = CSharpDataAnnoationType.Phone;
        this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
    }
    return PhonedDataAnnotation;
}(GenericDataAnnotation));
var RegexDataAnnotation = (function (_super) {
    __extends(RegexDataAnnotation, _super);
    function RegexDataAnnotation(field, fieldValue, regexPattern, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The " + field + " field is not valid.";
        this.AnnotationType = CSharpDataAnnoationType.RegularExpression;
        this.DataValueAttribute.Add("data-val-regex", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
        this.DataValueAttribute.Add("data-val-regex-pattern", regexPattern);
    }
    return RegexDataAnnotation;
}(GenericDataAnnotation));
var CreditCardDataAnnotation = (function (_super) {
    __extends(CreditCardDataAnnotation, _super);
    function CreditCardDataAnnotation(field, fieldValue, errorMessage) {
        if (errorMessage === void 0) { errorMessage = ""; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The " + field + " field is not a valid credit card number.";
        this.AnnotationType = CSharpDataAnnoationType.CreditCard;
        this.DataValueAttribute.Add("data-val-creditcard", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
    }
    return CreditCardDataAnnotation;
}(GenericDataAnnotation));
var RangeDataAnnotation = (function (_super) {
    __extends(RangeDataAnnotation, _super);
    function RangeDataAnnotation(field, fieldValue, errorMessage, min, max) {
        if (errorMessage === void 0) { errorMessage = ""; }
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        _super.call(this, field, fieldValue, errorMessage);
        this.DefaultErrorMessage = "The field " + field + " must be between " + min + " and " + max + ".";
        this.AnnotationType = CSharpDataAnnoationType.Range;
        this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
        this.DataValueAttribute.Add("data-val-range-min", "" + min);
        this.DataValueAttribute.Add("data-val-range-max", "" + max);
    }
    return RangeDataAnnotation;
}(GenericDataAnnotation));
