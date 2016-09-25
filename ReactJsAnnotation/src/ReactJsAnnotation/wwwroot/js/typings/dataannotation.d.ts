/// <reference path="../common/dictionary.ts" />

declare enum CSharpDataAnnoationType {
	Custom,
	DateTime,
	Date,
	Time,
	Duration,
	Phone,
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
	AnnotationType: CSharpDataAnnoationType;
	ErrorMessage: string;
	DefaultErrorMessage: string;
	DataValueAttribute: Dictionary<string, Object>;
}