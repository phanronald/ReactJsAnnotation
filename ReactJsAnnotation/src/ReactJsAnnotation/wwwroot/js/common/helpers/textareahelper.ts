/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	class TextAreaHelper {

		private tagBuilder: System.Web.Mvc.TagBuilder;
		private inputValue: string;
		private aspnetMvcString: string;
		private rowsAndColumnsDictionary: Dictionary<string, Object> = new Dictionary<string, Object>();

		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {

			this.rowsAndColumnsDictionary.Add("rows", "2");
			this.rowsAndColumnsDictionary.Add("cols", "20");
			this.tagBuilder = new System.Web.Mvc.TagBuilder("textarea");
			this.inputValue = (value !== undefined && value !== null) ? value.toString() : "";
			this.aspnetMvcString = this.SetupTextArea();
		}

		public GetHtmlString = (): string => {
			return this.aspnetMvcString;
		}

		public GetReactJsElement = (): React.DOMElement<{}, Element> => {
			return this.SetupReactElement();
		}

		private SetupTextArea = (): string => {
			this.tagBuilder.MergeAttributes(this.htmlAttributes, false);
			this.tagBuilder.GenerateId(this.fieldName);
			this.tagBuilder.MergeAttribute("name", this.fieldName, true);
			this.tagBuilder.MergeAttributes(this.rowsAndColumnsDictionary, true);
			this.tagBuilder.SetInnerText(this.inputValue);
			return this.tagBuilder.ToString(TagRenderMode.Normal);
		}

		private SetupReactElement = (): React.DOMElement<{}, Element> => {

			return HtmlUtility.CreateReactJsElement("textarea", this.aspnetMvcString);
		}
	}

	export class TextAreaFor extends TextAreaHelper {
		constructor(public fieldName: string, public value: Object, public htmlAttributes: Dictionary<string, Object>) {
			super(fieldName, value, htmlAttributes);
		}
	}
}