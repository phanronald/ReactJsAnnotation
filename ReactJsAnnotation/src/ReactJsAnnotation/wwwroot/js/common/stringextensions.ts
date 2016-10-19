/// <reference path="../typings/interface.d.ts" />

String.prototype.IsNullOrWhitespace = function (str) {
	return str.trim() === "";
}