/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	export class CheckBoxFor extends InputHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(InputType.CheckBox, fieldName, value, htmlAttributes);
		}
	}

	export class HiddenFor extends InputHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(InputType.Hidden, fieldName, value, htmlAttributes);
		}
	}

	export class PasswordFor extends InputHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(InputType.Password, fieldName, value, htmlAttributes);
		}
	}

	export class RadioButtonFor extends InputHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(InputType.Radio, fieldName, value, htmlAttributes);
		}
	}

	export class TextBoxFor extends InputHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(InputType.Text, fieldName, value, htmlAttributes);
		}
	}

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

		public GetHtmlString = (): string => {
			return this.aspnetMvcString;
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
}