/// <reference path="../typings/decorator.ts" />

import annotation = System.ComponentModel.DataAnnotations

class vmRegister {

	@annotation.display("First Name")
	@annotation.required("")
	public FirstName: string = "Test";

	public LastName: string = "";

	@annotation.email("")
	public Email: string = "";

	@annotation.phone("")
	public Phone: number = 0;
	public Address1: string = "";
	public Address2: string = "";
	public City: string = "";
	public State: string = "";

	@annotation.regex("", "^([0-9]{5}(-[0-9]{4})?)$")
	public Zipcode: number = 0;

	@annotation.creditcard("")
	public CreditCard: number = 0;

	@annotation.range("", 0, 100)
	public NumberOfEmployees: number = 0;

	constructor() {

	}
}