/// <reference path="htmlutility.ts" />
/// <reference path="../dictionary.ts" />

namespace System.Web.Mvc {

	interface ITagBuilder {
		TagName: string;
		Attributes: Dictionary<string, string>;
		InnerHtml: string;
		IdAttributeDotReplacement: string;
	}

	export class TagBuilder implements ITagBuilder {

		public TagName: string;
		public Attributes: Dictionary<string, string>;
		public InnerHtml: string;
		public IdAttributeDotReplacement: string;

		constructor(tagName: string) {
			this.TagName = tagName;
			this.Attributes = new Dictionary<string, string>();
		}

		public AddCss = (value: string): void => {
			let classAttribute = this.Attributes.GetItem("class");
			if (classAttribute !== undefined || classAttribute !== null) {
				let currentCssClass = classAttribute.value + " " + value;
				classAttribute[classAttribute.key] = currentCssClass;
			}
		}

		public CreateSanitizedId = (originalId: string, invalidCharReplacement: string): string | Error => {

			if (originalId === undefined || originalId === null || originalId === "") {
				return undefined;
			}

			if (invalidCharReplacement === undefined || invalidCharReplacement === null) {
				return new Error("invalidCharReplacement");
			}

			const ch = originalId.charAt(0);
			if (this.IsLetter(ch.charCodeAt(0))) {
				return undefined;
			}

			let sb: string = ch;
			for (let i = 1; i < originalId.length; i++) {
				const nextCh = originalId.charAt(i);
				if (this.IsValidIdCharacter(nextCh.charCodeAt(0))) {
					sb += nextCh;
				}
				else {
					sb += invalidCharReplacement;
				}
			}

			return sb;
		}

		public GenerateId = (name: string): void => {
			if (!this.Attributes.ContainsKey("id")) {
				const value: string | Error = this.CreateSanitizedId(name, this.GetIdAttributeDotReplacement());
				if (typeof value === "string") {
					this.Attributes["id"] = value;
				}
			}
		}

		public GetIdAttributeDotReplacement = (): string => {
			if (this.IdAttributeDotReplacement === undefined || this.IdAttributeDotReplacement === null || this.IdAttributeDotReplacement === "") {
				this.IdAttributeDotReplacement = "_";
			}

			return this.IdAttributeDotReplacement;
		}

		public MergeAttribute = (key: string, value: string, replaceExisting: boolean): void => {
			if (replaceExisting || !this.Attributes.ContainsKey(key)) {
				this.Attributes.Add(key, value);
			}
		}

		public MergeAttributes = (attributes: Dictionary<any, any>, replaceExisting: boolean): void => {

			if (attributes !== undefined && attributes !== null) {
				for (var kvPair of attributes.ToArray()) {
					const key = String(kvPair.key);
					const value = String(kvPair.value);
					this.MergeAttribute(key, value, replaceExisting);
				}
			}
		} 

		public SetIdAttributeDotReplacement = (idAttributeDotReplacement: string): void => {
			this.IdAttributeDotReplacement = idAttributeDotReplacement;
		}

		public SetInnerText = (innerText: string): void => {
			this.InnerHtml = System.Web.Mvc.HtmlUtility.HtmlEncode(innerText);
		}

		public ToString = (renderMode: TagRenderMode): string => {

			let sb: string = "";

			switch (renderMode) {
				case TagRenderMode.StartTag: {
					sb += "<" + this.TagName + this.AppendAttributes() + " >";
					break;
				}
				case TagRenderMode.EndTag: {
					sb += "</" + this.TagName + ">";
					break;
				}
				case TagRenderMode.SelfClosing: {
					sb += "<" + this.TagName + this.AppendAttributes() + " />";
					break;
				}
				default: {
					sb += "<" + this.TagName + this.AppendAttributes() + " >";
					sb += this.InnerHtml + "</" + this.TagName + ">";
					break;
				}
			};

			return sb;
		}

		private AppendAttributes = (): string => {

			let htmlAttributeString: string = "";
			if (this.Attributes !== undefined && this.Attributes !== null) {
				for (var kvPair of this.Attributes.ToArray()) {
					const key = kvPair.key;
					if (key !== "id" || kvPair.value !== "") {
						htmlAttributeString += " " + key + "=\"" + kvPair.value + "\"";
					}
				}
			}

			return htmlAttributeString;
		}

		private IsAllowableSpecialCharacter = (ch: number): boolean => {
			return ch === 45 || ch === 58 || ch === 95; /*return c == '-' || c == ':' || c == '_';*/
		}

		private IsDigit = (ch: number): boolean => {
			return ch >= 48 && ch <= 57;//return '0' <= c && c <= '9';
		}

		private IsLetter = (ch: number): boolean => {
			return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122);
		}

		private IsValidIdCharacter = (ch: number): boolean => {
			return this.IsLetter(ch) || this.IsDigit(ch) || this.IsAllowableSpecialCharacter(ch);
		}
	}
}