/// <reference path="../../typings/dataannotation.d.ts" />
/// <reference path="../collection.ts" />
/// <reference path="../dictionary.ts" />
/// <reference path="tagbuilder.ts" />
/// <reference path="../../typings/react/react-global.d.ts" />

namespace System.Web.Mvc.Html {

	export interface ISelectListItem {
		Disabled: boolean;
		Group: ISelectListGroup;
		Selected: boolean;
		Text: string;
		Value: string;
	}

	export class DropDownListFor extends SelectHelper {
		constructor(public fieldName: string, public optionLabel: string, public allowMultiple: boolean,
					public selectList: Collection<ISelectListItem>, public htmlAttributes: Dictionary<string, Object>) {
			super(fieldName, optionLabel, allowMultiple, selectList, htmlAttributes);
		}
	}

	class SelectHelper {

		private tagBuilder: System.Web.Mvc.TagBuilder;
		private internalSelectList: Collection<ISelectListItem> = new Collection<ISelectListItem>();
		private aspnetMvcString: string;

		constructor(public fieldName: string, public optionLabel: string, public allowMultiple: boolean,
					public selectList: Collection<ISelectListItem>, public htmlAttributes: Dictionary<string, Object>) {

			this.tagBuilder = new System.Web.Mvc.TagBuilder("select");
			this.aspnetMvcString = this.SetupInput();
		}

		public GetHtmlString = (): string => {
			return this.aspnetMvcString;
		}

		public GetReactJsElement = (): React.DOMElement<{}, Element> => {
			return this.SetupReactElement();
		}

		private BuildItems = (): void => {
			let sb: string = "";
			if (this.optionLabel !== undefined && this.optionLabel !== null) {
				sb += this.ListItemToOption(null);
			}

		}

		private ListItemToOption = (selectItem: ISelectListItem): string => {

			let tagBuilder: System.Web.Mvc.TagBuilder = new System.Web.Mvc.TagBuilder("option");
			tagBuilder.InnerHtml = System.Web.Mvc.HtmlUtility.HtmlEncode(selectItem.Text);
			if (selectItem.Value !== undefined && selectItem.Value !== null) {
				tagBuilder.Attributes.Add("value", selectItem.Value);
			}

			if (selectItem.Selected) {
				tagBuilder.Attributes.Add("selected", "selected");
			}

			if (selectItem.Disabled) {
				tagBuilder.Attributes.Add("disabled", "disabled");
			}

			return tagBuilder.ToString(TagRenderMode.Normal);
		}

		private SetupInput = (): string => {

			this.tagBuilder.MergeAttributes(this.htmlAttributes, false);
			this.tagBuilder.GenerateId(this.fieldName);
			this.tagBuilder.MergeAttribute("name", this.fieldName, true);

			if (this.allowMultiple) {
				this.tagBuilder.MergeAttribute("multiple", "multiple");
			}

			return this.tagBuilder.ToString(TagRenderMode.Normal);
		}

		private SetupReactElement = (): React.DOMElement<{}, Element> => {

			return HtmlUtility.CreateReactJsElement("input", this.aspnetMvcString);
		}

	}

	interface ISelectListGroup {
		Disabled: boolean;
		Name: string;
	}
}