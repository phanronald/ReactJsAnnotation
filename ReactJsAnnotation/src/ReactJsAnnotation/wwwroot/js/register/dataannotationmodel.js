var FieldAttributes = (function () {
    function FieldAttributes() {
        this.DataAnnotations = new Collection();
    }
    return FieldAttributes;
}());
var DataFromServerModel = (function () {
    function DataFromServerModel(dataFromServer) {
        this.dataFromServer = dataFromServer;
    }
    return DataFromServerModel;
}());
var DataAnnotationModel = (function () {
    function DataAnnotationModel(customDataAnnotationProperties) {
        var _this = this;
        this.collectionOfAnnotations = new Dictionary();
        this.GetAnnotations = function () {
            return _this.collectionOfAnnotations.Distinct();
        };
        var customAnnotationProp = customDataAnnotationProperties;
        for (var j = 0; j < customAnnotationProp.dataAnnotations.length; j++) {
            var dataAnnotation = customAnnotationProp.dataAnnotations[j];
            var dataAnnotationType = dataAnnotation.attributeType;
            var dataAnnotationTypeEnum = CSharpDataAnnoationType[dataAnnotationType.replace("Attribute", "")];
            var currentFieldAttributes = new FieldAttributes();
            switch (dataAnnotationTypeEnum) {
                case CSharpDataAnnoationType.Required: {
                    currentFieldAttributes.DataAnnotations.Add(new RequiredDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
                case CSharpDataAnnoationType.EmailAddress: {
                    currentFieldAttributes.DataAnnotations.Add(new EmailDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
                case CSharpDataAnnoationType.Phone: {
                    currentFieldAttributes.DataAnnotations.Add(new PhonedDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
                case CSharpDataAnnoationType.RegularExpression: {
                    currentFieldAttributes.DataAnnotations.Add(new RegexDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
                case CSharpDataAnnoationType.Range: {
                    currentFieldAttributes.DataAnnotations.Add(new RangeDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
                case CSharpDataAnnoationType.CreditCard: {
                    currentFieldAttributes.DataAnnotations.Add(new CreditCardDataAnnotation(customAnnotationProp.fieldName, customAnnotationProp.fieldValue, dataAnnotation.dataAnnotationAttribute.errorMessage));
                    break;
                }
            }
            ;
            if (currentFieldAttributes.DataAnnotations.Count() > 0) {
                for (var i = 0; i < currentFieldAttributes.DataAnnotations.Count(); i++) {
                    var currentAnnotation = currentFieldAttributes.DataAnnotations.ElementAt(i);
                    this.collectionOfAnnotations.AddRange(currentAnnotation.DataValueAttribute.ToArray());
                }
            }
        }
    }
    return DataAnnotationModel;
}());
