interface ICustomDataAnnotationModel {
	dataFromServer: ICustomDataAnnotationProps[];
}

interface ICustomDataAnnotationProps {
	fieldName: string;
	fieldValue: Object;
	displayName: string;
	dataAnnotations: IDataAnnotations[];
}

interface IDataAnnotations {
	attributeType: string;
	dataAnnotationAttribute: IDataAnnotationAttribute;
}

interface IDataAnnotationAttribute {
	allowEmptyStrings: boolean;
	requiresValidationContext: boolean;
	errorMessage: string;
	errorMessageResourceName: string;
	errorMessageResourceType: Object;
}

interface IFieldAttributes {
	DataAnnotations: Collection<ICSharpDataAnnotation>;
}
