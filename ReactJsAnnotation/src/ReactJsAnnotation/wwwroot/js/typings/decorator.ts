/// <reference path="../common/models/dataannotations.ts" />

namespace System.ComponentModel.DataAnnotations {
	export function required(errorMessage?: string) {

		function requiredDecorator(target: any, key: string ): void {
			// property value
			let currentPropertyValue = this[key];
			let requiredDataAnnotation = new RequiredDataAnnotation(key, currentPropertyValue, errorMessage);

			// property getter
			var getter = function () {
				console.log(`Get: ${key} => ${currentPropertyValue}`);
				return currentPropertyValue;
			};

			// property setter
			var setter = function (newVal) {
				console.log(`Set: ${key} => ${newVal}`);
				requiredDataAnnotation.DataValueAttribute = newVal;
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
}

function logClass(target: any) {

	// save a reference to the original constructor
	var original = target;

	// a utility function to generate instances of a class
	function construct(constructor, args) {
		var c: any = function () {
			return constructor.apply(this, args);
		}
		c.prototype = constructor.prototype;
		return new c();
	}

	// the new constructor behaviour
	var f: any = function (...args) {
		console.log("New: " + original.name);
		return construct(original, args);
	}

	// copy prototype so intanceof operator still works
	f.prototype = original.prototype;

	// return new constructor (will override original)
	return f;
}