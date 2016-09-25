/// <reference path="../typings/interface.d.ts" />
/// <reference path="../typings/dataannotation.d.ts" />
/// <reference path="../common/models/dataannotations.ts" />
/// <reference path="../common/collection.ts" />
/// <reference path="../common/dictionary.ts" />

class FieldAttributes implements IFieldAttributes {
	public DataAnnotations: Collection<ICSharpDataAnnotation>;

	constructor() {
		this.DataAnnotations = new Collection<ICSharpDataAnnotation>();
	}
}

class DataFromServerModel implements ICustomDataAnnotationModel {

	constructor(public dataFromServer: ICustomDataAnnotationProps[]) {

	}
}

class DataAnnotationModel {

	private collectionOfAnnotations: Dictionary<string, Object> = new Dictionary<string, Object>();

	constructor(customDataAnnotationProperties: ICustomDataAnnotationProps) {

		const customAnnotationProp: ICustomDataAnnotationProps = customDataAnnotationProperties;

		for (let j = 0; j < customAnnotationProp.dataAnnotations.length; j++) {

			const dataAnnotation: IDataAnnotations = customAnnotationProp.dataAnnotations[j];
			const dataAnnotationType: string = dataAnnotation.attributeType;
			const dataAnnotationTypeEnum: CSharpDataAnnoationType = CSharpDataAnnoationType[dataAnnotationType.replace("Attribute", "")];

			let currentFieldAttributes: FieldAttributes = new FieldAttributes();

			switch (dataAnnotationTypeEnum) {
				case CSharpDataAnnoationType.Required: {
					currentFieldAttributes.DataAnnotations.Add(new RequiredDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}
				case CSharpDataAnnoationType.EmailAddress: {
					currentFieldAttributes.DataAnnotations.Add(new EmailDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}

				case CSharpDataAnnoationType.Phone: {

					currentFieldAttributes.DataAnnotations.Add(new PhonedDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}

				case CSharpDataAnnoationType.RegularExpression: {

					currentFieldAttributes.DataAnnotations.Add(new RegexDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}

				case CSharpDataAnnoationType.Range: {

					currentFieldAttributes.DataAnnotations.Add(new RangeDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}

				case CSharpDataAnnoationType.CreditCard: {

					currentFieldAttributes.DataAnnotations.Add(new CreditCardDataAnnotation(customAnnotationProp.fieldName,
						customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));

					break;
				}
			};

			if (currentFieldAttributes.DataAnnotations.Count() > 0) {
				for (let i = 0; i < currentFieldAttributes.DataAnnotations.Count(); i++) {

					let currentAnnotation: ICSharpDataAnnotation = currentFieldAttributes.DataAnnotations.ElementAt(i);
					this.collectionOfAnnotations.AddRange(currentAnnotation.DataValueAttribute.ToArray());
				}

			}

		}
	}

	public GetAnnotations = (): Dictionary<string, Object> => {
		return this.collectionOfAnnotations.Distinct();
	}

}