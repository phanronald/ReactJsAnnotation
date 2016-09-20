/// <reference path="../../typings/dataannotation.d.ts" />

class GenericDataAnnotation implements ICSharpDataAnnotation {
	public AnnotationType: CSharpDataAnnoation;
	public FieldName: string;
	public ErrorMessage: string;
	public VariableType: string;
	public DefaultErrorMessage: string;
	public DataValueAttribute: Dictionary<string, Object>;

	protected isValidErrorMessage: boolean;

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		this.FieldName = field;
		this.VariableType = (typeof fieldValue);
		this.DataValueAttribute = new Dictionary<string, any>();

		this.ErrorMessage = errorMessage;
		this.DataValueAttribute.Add("data-val", true);
		this.DataValueAttribute.Add("data-val-required", `The ${field} field is required.`);

		if (typeof (fieldValue) === "number") {
			this.DataValueAttribute.Add("data-val-number", `The field ${field} must be a number.`);
		}

		this.isValidErrorMessage = (this.ErrorMessage !== undefined && this.ErrorMessage !== null &&
									this.ErrorMessage !== "");
	}
}

class DisplayDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = "";
		this.AnnotationType = CSharpDataAnnoation.Display;
		this.DataValueAttribute.Clear();
	}
}

class RequiredDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is required.`;
		this.AnnotationType = CSharpDataAnnoation.Required
		this.DataValueAttribute.Add("data-val-required", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
	}
}

class EmailDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid e-mail address.`;
		this.AnnotationType = CSharpDataAnnoation.EmailAddress;
		this.DataValueAttribute.Clear();
		this.DataValueAttribute.Add("data-val-email", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
	}

}

class PhonedDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any ,errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid phone number.`;
		this.AnnotationType = CSharpDataAnnoation.PhoneNumber;
		this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-required", `The ${field} field is required.`);
	}
}

class RegexDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, regexPattern: string, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not valid.`;
		this.AnnotationType = CSharpDataAnnoation.RegularExpression;
		this.DataValueAttribute.Add("data-val-regex", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-regex-pattern", regexPattern);
		this.DataValueAttribute.Add("data-val-required", `The ${field} field is required.`);
	}

}

class CreditCardDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid credit card number.`;
		this.AnnotationType = CSharpDataAnnoation.CreditCard;
		this.DataValueAttribute.Add("data-val-creditcard", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-required", `The ${field} field is required.`);
	}

}

class RangeDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any, errorMessage: string = "", min: number = 0, max: number = 100) {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The field ${field} must be between ${min} and ${max}.`;
		this.AnnotationType = CSharpDataAnnoation.Range
		this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? errorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-range-min", `${min}`);
		this.DataValueAttribute.Add("data-val-range-max", `${max}`);
		this.DataValueAttribute.Add("data-val-required", `The ${field} field is required.`);
	}

}