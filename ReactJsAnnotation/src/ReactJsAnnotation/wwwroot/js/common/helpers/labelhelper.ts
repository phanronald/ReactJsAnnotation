/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	class LabelHelper {

		private tagBuilder: System.Web.Mvc.TagBuilder;
		private labelText: string;
		private aspnetMvcString: string;

		constructor(public className: any, public property: string, public htmlAttributes: Dictionary<string, Object>) {

			this.tagBuilder = new System.Web.Mvc.TagBuilder("label");
			const attributeDictionary = System.ComponentModel.DataAnnotations.GenericAttributeAnnotation;
			if (attributeDictionary.Count() > 0) {
				const allGenericAnnotationForProperty = attributeDictionary.Where(x => x.key[0] == property && x.key[1] == className.name);
				if (allGenericAnnotationForProperty.Count() > 0) {

					const allGenericDataAnnotations = allGenericAnnotationForProperty.GetValues();
					for (let i = 0; i < allGenericDataAnnotations.length; i++) {
						const genericAnnotationDictionary = allGenericDataAnnotations[i];
						if (genericAnnotationDictionary !== undefined) {
							this.labelText = genericAnnotationDictionary.Name;
						}
					}
					
				}
				else {
					this.labelText = property;
				}
			}
			this.aspnetMvcString = this.SetupLabel();
		}

		public GetHtml = (): React.DOMElement<{}, Element> => {
			return this.SetupReactElement();
		}

		private SetupLabel = (): string => {
			let sanitizedFieldName: string | Error = this.tagBuilder.CreateSanitizedId(this.property, "_");
			let sanitizedLabelFieldName: string = "";
			if (typeof sanitizedFieldName === "string") {
				sanitizedLabelFieldName = sanitizedFieldName;
			}
			this.tagBuilder.MergeAttribute("htmlFor", sanitizedLabelFieldName, false);
			this.tagBuilder.SetInnerText(this.labelText);
			this.tagBuilder.MergeAttributes(this.htmlAttributes, true);
			return this.tagBuilder.ToString(TagRenderMode.Normal);
		}

		private SetupReactElement = (): React.DOMElement<{}, Element> => {

			return HtmlUtility.CreateReactJsElement("label", this.aspnetMvcString);
		}
	}

	export class LabelFor extends LabelHelper {
		constructor(public className:any, public property: string, public htmlAttributes: Dictionary<string, Object>) {
			super(className, property, htmlAttributes);
		}
	}
}