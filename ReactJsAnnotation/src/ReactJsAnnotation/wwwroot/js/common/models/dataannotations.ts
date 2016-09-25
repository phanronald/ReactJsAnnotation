/// <reference path="../../typings/dataannotation.d.ts" />

class GenericDataAnnotation implements ICSharpDataAnnotation {
	public AnnotationType: CSharpDataAnnoationType;
	public ErrorMessage: string;
	public DefaultErrorMessage: string;
	public DataValueAttribute: Dictionary<string, Object>;

	protected isValidErrorMessage: boolean;

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		this.DataValueAttribute = new Dictionary<string, any>();

		this.ErrorMessage = errorMessage;
		if (this.ErrorMessage !== undefined && this.ErrorMessage !== null) {
			this.ErrorMessage = this.ErrorMessage.replace("{0}", field);
		}

		this.isValidErrorMessage = (this.ErrorMessage !== undefined && this.ErrorMessage !== null &&
			this.ErrorMessage !== "");

		this.DataValueAttribute.Add("data-val", true);
		this.DataValueAttribute.Add("data-val-required", (this.isValidErrorMessage ? this.ErrorMessage : `The ${field} field is required.`));

		if (typeof (fieldValue) === "number") {
			this.DataValueAttribute.Add("data-val-number", `The field ${field} must be a number.`);
		}
	}
}

class DisplayDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = "";
		this.AnnotationType = CSharpDataAnnoationType.Display;
		this.DataValueAttribute.Clear();
	}
}

class RequiredDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is required.`;
		this.AnnotationType = CSharpDataAnnoationType.Required;
	}
}

class EmailDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid e-mail address.`;
		this.AnnotationType = CSharpDataAnnoationType.EmailAddress;
		this.DataValueAttribute.Clear();
		this.DataValueAttribute.Add("data-val-email", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
	}

}

class PhonedDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any ,errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid phone number.`;
		this.AnnotationType = CSharpDataAnnoationType.Phone;
		this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
	}
}

class RegexDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue: any, regexPattern: string, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not valid.`;
		this.AnnotationType = CSharpDataAnnoationType.RegularExpression;
		this.DataValueAttribute.Add("data-val-regex", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-regex-pattern", regexPattern);
	}

}

class CreditCardDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any, errorMessage: string = "") {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The ${field} field is not a valid credit card number.`;
		this.AnnotationType = CSharpDataAnnoationType.CreditCard;
		this.DataValueAttribute.Add("data-val-creditcard", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
	}

}

class RangeDataAnnotation extends GenericDataAnnotation {

	constructor(field: string, fieldValue:any, errorMessage: string = "", min: number = 0, max: number = 100) {
		super(field, fieldValue, errorMessage);
		this.DefaultErrorMessage = `The field ${field} must be between ${min} and ${max}.`;
		this.AnnotationType = CSharpDataAnnoationType.Range
		this.DataValueAttribute.Add("data-val-phone", (this.isValidErrorMessage ? this.ErrorMessage : this.DefaultErrorMessage));
		this.DataValueAttribute.Add("data-val-range-min", `${min}`);
		this.DataValueAttribute.Add("data-val-range-max", `${max}`);
	}

}