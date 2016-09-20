/// <reference path="../common/dictionary.ts" />

declare enum CSharpDataAnnoation {
	Custom,
	DateTime,
	Date,
	Time,
	Duration,
	PhoneNumber,
	Currency,
	Text,
	Html,
	MultilineText,
	EmailAddress,
	Password,
	Url,
	ImageUrl,
	CreditCard,
	PostalCode,
	Upload,
	Required,
	Display,
	RegularExpression,
	Range
}

declare enum InputType {
	CheckBox,
	Hidden,
	Password,
	Radio,
	Text
}

declare enum TagRenderMode {
	Normal,
	StartTag,
	EndTag,
	SelfClosing
}

interface ICSharpDataAnnotation {
	AnnotationType: CSharpDataAnnoation;
	FieldName: string;
	VariableType: string;
	ErrorMessage: string;
	DefaultErrorMessage: string;
	DataValueAttribute: Dictionary<string, Object>;
}