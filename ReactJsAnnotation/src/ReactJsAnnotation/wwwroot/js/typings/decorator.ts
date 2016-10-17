/// <reference path="dataannotation.d.ts" />
/// <reference path="../common/models/dataannotations.ts" />
/// <reference path="../common/dictionary.ts" />

namespace System.ComponentModel.DataAnnotations {

	export var GenericDataAnnotation: Dictionary<[string, CSharpDataAnnoationType], GenericDataAnnotation> = new Dictionary<[string, CSharpDataAnnoationType], GenericDataAnnotation>();

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
				GenericDataAnnotation.Add([key, CSharpDataAnnoationType.Required], requiredDataAnnotation);
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
				console.log(`Get: ${key} => ${currentPropertyValue}`);
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				console.log(`Set: ${key} => ${newVal}`);

				GenericDataAnnotation.Add([key, CSharpDataAnnoationType.EmailAddress], emailDataAnnotation);
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
}