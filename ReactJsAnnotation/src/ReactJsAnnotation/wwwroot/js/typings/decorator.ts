/// <reference path="dataannotation.d.ts" />
/// <reference path="../common/models/dataannotations.ts" />
/// <reference path="../common/dictionary.ts" />

namespace System.ComponentModel.DataAnnotations {

	export var GenericDataAnnotation: Dictionary<[string, any, CSharpDataAnnoationType], GenericDataAnnotation> = new Dictionary<[string, any, CSharpDataAnnoationType], GenericDataAnnotation>();

	export function display(errorMessage?: string) {

		function displayDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let displayDataAnnotation: DisplayDataAnnotation;

			if (errorMessage === "") {
				displayDataAnnotation = new DisplayDataAnnotation(key, currentPropertyValue);
			}
			else {
				displayDataAnnotation = new DisplayDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.Display], displayDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return displayDecorator;
	}

	export function required(errorMessage?: string) {

		function requiredDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let requiredDataAnnotation:RequiredDataAnnotation;

			if (errorMessage === "") {
				requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue);
			}
			else {
				requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.Required], requiredDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return requiredDecorator;
	}

	export function email(errorMessage?: string) {

		function emailDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let emailDataAnnotation: EmailDataAnnotation;
			if (errorMessage === "") {
				emailDataAnnotation = new EmailDataAnnotation(key, currentPropertyValue);
			}
			else {
				emailDataAnnotation = new EmailDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.EmailAddress], emailDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return emailDecorator;
	}

	export function phone(errorMessage?: string) {

		function phoneDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let phoneDataAnnotation: PhonedDataAnnotation;
			if (errorMessage === "") {
				phoneDataAnnotation = new PhonedDataAnnotation(key, currentPropertyValue);
			}
			else {
				phoneDataAnnotation = new PhonedDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {;
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {

				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.Phone], phoneDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return phoneDecorator;
	}

	export function regex(regexPattern:string, errorMessage?: string) {

		function regexDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let regexDataAnnotation: RegexDataAnnotation;
			if (errorMessage === "") {
				regexDataAnnotation = new RegexDataAnnotation(key, currentPropertyValue, regexPattern);
			}
			else {
				regexDataAnnotation = new RegexDataAnnotation(key, currentPropertyValue, regexPattern, errorMessage);
			}

			// property getter
			var getter = function () {;
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {

				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.RegularExpression], regexDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return regexDecorator;
	}

	export function creditcard(errorMessage?: string) {

		function creditcardDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let creditCardDataAnnotation: CreditCardDataAnnotation;
			if (errorMessage === "") {
				creditCardDataAnnotation = new CreditCardDataAnnotation(key, currentPropertyValue);
			}
			else {
				creditCardDataAnnotation = new CreditCardDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.CreditCard], creditCardDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return creditcardDecorator;
	}

	export function range(errorMessage?: string, minimum?:number, maximum?:number) {

		function rangeDecorator(target: any, key: string): void {
			target.constructor();
			// property value
			let currentPropertyValue = target[key];
			let rangeDataAnnotation: RangeDataAnnotation;
			if (errorMessage === "") {
				rangeDataAnnotation = new RangeDataAnnotation(key, currentPropertyValue);
			}
			else {
				rangeDataAnnotation = new RangeDataAnnotation(key, currentPropertyValue, errorMessage);
			}

			// property getter
			var getter = function () {
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				GenericDataAnnotation.Add([key, target, CSharpDataAnnoationType.Range], rangeDataAnnotation);
				currentPropertyValue = newVal;
			};

			// Delete property.
			if (delete this[key]) {

				// Create new property with getter and setter
				Object.defineProperty(target, key, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
			}
		}

		return rangeDecorator;
	}
}