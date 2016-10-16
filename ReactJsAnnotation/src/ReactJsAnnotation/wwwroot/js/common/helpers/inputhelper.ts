/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	class InputHelper {

		private tagBuilder: System.Web.Mvc.TagBuilder;
		private hasCheckboxFlag: boolean;
		private inputTypeString: string;
		private inputValue: string;
		private aspnetMvcString: string;

		constructor(public inputType: InputType, public fieldName: string, public value: Object,
			public htmlAttributes: Dictionary<string, Object>) {

			this.tagBuilder = new System.Web.Mvc.TagBuilder("input");
			this.inputValue = (value !== undefined && value !== null) ? value.toString() : "";
			this.aspnetMvcString = this.SetupInput();
		}

		public GetReactJsElement = (): React.DOMElement<{}, Element> => {
			return this.SetupReactElement();
		}

		private GetInputTypeString = (inputType: InputType): string => {

			switch (inputType) {
				case InputType.CheckBox: {
					return "checkbox";
				}
				case InputType.Hidden: {
					return "hidden";
				}
				case InputType.Password: {
					return "password";
				}
				case InputType.Radio: {
					return "radio";
				}
				case InputType.Text: {
					return "text";
				}
				default:
					{
						return "text";
					}
			};
		}

		private SetupInput = (): string => {
			this.inputTypeString = this.GetInputTypeString(this.inputType);
			this.tagBuilder.MergeAttributes(this.htmlAttributes, false);
			this.tagBuilder.MergeAttribute("type", this.inputTypeString, false);
			this.tagBuilder.MergeAttribute("name", this.fieldName, true);
			this.tagBuilder.GenerateId(this.fieldName);

			switch (this.inputType) {
				case InputType.CheckBox: {
					if (this.inputValue !== "") {
						if (this.value instanceof Boolean) {
							const booleanVersionOfValue: boolean = <boolean>this.value;
							if (booleanVersionOfValue) {
								this.tagBuilder.MergeAttribute("checked", "checked", true);
							}
						}
					}
				}

				case InputType.Password:
				case InputType.Hidden:
				case InputType.Radio:
				case InputType.Text:
				default: {
					this.tagBuilder.MergeAttribute("defaultValue", this.inputValue, true);
					break;
				}
			};

			return this.tagBuilder.ToString(TagRenderMode.SelfClosing);
		}

		private SetupReactElement = (): React.DOMElement<{}, Element> => {

			return HtmlUtility.CreateReactJsElement("input", this.aspnetMvcString);
		}
	}

	interface IInputElement {
		property: string;
		propertyValue: Object;
		collectionOfAnnotations: Dictionary<string, Object>;
	}

	export class TextBoxFor implements IInputElement {

		collectionOfAnnotations: Dictionary<string, Object> = new Dictionary<string, Object>();
		property: string;
		propertyValue: Object;

		constructor(property: string, keySelector: (key: string) => any) {
			this.property = property;
			this.propertyValue = keySelector(property);
			if (System.ComponentModel.DataAnnotations.GenericDataAnnotation.Count() > 0) {
				const allDataAnnotationForProperty = System.ComponentModel.DataAnnotations.GenericDataAnnotation.Where(x => x.key == property);
				if (allDataAnnotationForProperty.Count() > 0) {

					const allDataAnnotations = allDataAnnotationForProperty.GetValues();

					for (let i = 0; i < allDataAnnotations.length; i++) {
						const dataAnnotationDictionary = allDataAnnotations[i];
						if (dataAnnotationDictionary !== undefined) {
							this.collectionOfAnnotations.AddRange(dataAnnotationDictionary.DataValueAttribute.ToArray());
						}
					}
				}
			}
		}

		public GetHtml(): React.DOMElement<{}, Element> {
			return new InputHelper(InputType.Text, this.property, this.propertyValue, this.collectionOfAnnotations).GetReactJsElement();
		}
	}
}