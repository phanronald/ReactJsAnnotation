
namespace System.Web.Mvc.Html {
	export class HtmlUtility {
		private static entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			"/": '&#x2F;'
		};

		private static ElementsWithNoChildren = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
			'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'textarea'];

		public static HtmlEncode(source: string):string {
			return String(source).replace(/[&<>"'\/]/g, s => this.entityMap[s]);
		}

		public static HtmlParsed(source: string): Document {
			const domParser: DOMParser = new DOMParser();
			return domParser.parseFromString(source, "text/html");
		}

		public static CreateReactJsElement(inputType: string, htmlString: string): React.DOMElement<{}, Element> {

			let elementProperties = {};
			const inputDocument: Document = System.Web.Mvc.Html.HtmlUtility.HtmlParsed(htmlString);
			const inputElement:Element = inputDocument.getElementsByTagName(inputType)[0];
			const attributes: NamedNodeMap = inputElement.attributes;

			for (var index in attributes) {
				const currentAttribute:Attr = attributes[index];
				if (currentAttribute !== undefined && currentAttribute !== null && typeof (currentAttribute) !== "function") {
					if (currentAttribute.name !== undefined && currentAttribute.value !== undefined) {
						let attributeName: string = currentAttribute.name;
						if (currentAttribute.name === "defaultvalue") {
							attributeName = "defaultValue";
						}

						elementProperties[attributeName] = currentAttribute.value;
					}
				}
			}

			const isElementWithNoChildren:boolean = this.ElementsWithNoChildren.some(x => x == inputType);
			if (isElementWithNoChildren) {
				return React.createElement(inputType, elementProperties);
			}
			else {
				return React.createElement(inputType, elementProperties, inputElement.childNodes);
			}
		}
	}
}