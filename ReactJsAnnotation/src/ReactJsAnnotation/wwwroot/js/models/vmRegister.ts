/// <reference path="../typings/decorator.ts" />

import annotation = System.ComponentModel.DataAnnotations

class vmRegister {

	@annotation.required("")
	public FirstName: string = "Test";

	public LastName: string = "";
	public Email: string = "";
	public Phone: number = 0;
	public Address1: string = "";
	public Address2: string = "";
	public City: string = "";
	public State: string = "";
	public Zipcode: number = 0;
	public CreditCard: number = 0;
	public NumberOfEmployees: number = 0;

	constructor() {

	}
}