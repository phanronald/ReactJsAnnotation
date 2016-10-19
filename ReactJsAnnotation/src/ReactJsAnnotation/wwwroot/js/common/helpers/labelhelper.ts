/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	class LabelHelper {

		private tagBuilder: System.Web.Mvc.TagBuilder;
		private labelText: string;
		private aspnetMvcString: string;

		constructor(public fieldName: string, public text:string, public htmlAttributes: Dictionary<string, Object>) {

			this.tagBuilder = new System.Web.Mvc.TagBuilder("label");
			this.labelText = (text !== undefined && text !== null ? text.toString() : "");
			this.aspnetMvcString = this.SetupLabel();
		}

		public GetHtmlString = (): string => {
			return this.aspnetMvcString;
		}

		public GetReactJsElement = (): React.DOMElement<{}, Element> => {
			return this.SetupReactElement();
		}

		private SetupLabel = (): string => {
			let sanitizedFieldName: string | Error = this.tagBuilder.CreateSanitizedId(this.fieldName, "_");
			let sanitizedLabelFieldName: string = "";
			if (typeof sanitizedFieldName === "string") {
				sanitizedLabelFieldName = sanitizedFieldName;
			}
			this.tagBuilder.MergeAttribute("for", sanitizedLabelFieldName, false);
			this.tagBuilder.SetInnerText(this.labelText);
			this.tagBuilder.MergeAttributes(this.htmlAttributes, true);
			return this.tagBuilder.ToString(TagRenderMode.Normal);
		}

		private SetupReactElement = (): React.DOMElement<{}, Element> => {

			return HtmlUtility.CreateReactJsElement("label", this.aspnetMvcString);
		}
	}

	export class LabelFor extends LabelHelper {
		constructor(public fieldName: string, public text: string, public htmlAttributes: Dictionary<string, Object>) {
			super(fieldName, text, htmlAttributes);
		}
	}
}