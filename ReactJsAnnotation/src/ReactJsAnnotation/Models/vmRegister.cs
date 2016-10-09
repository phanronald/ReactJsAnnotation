using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactJsAnnotation.Models
{
	public class vmRegisterContainer
	{
		public List<vmRegisterInfo> AllPropertyAnnotation { get; set; }
	}

	public class vmRegisterInfo
	{
		public string FieldName { get; set; }
		public object FieldValue { get; set; }
		public string DisplayName { get; set; }
		public List<ReactCustomDataAnnotation> DataAnnotations { get; set; }
	}

	public class ReactCustomDataAnnotation
	{
		public string AttributeType { get; set; }
		public Attribute DataAnnotationAttribute { get; set; }
	}

	public class vmRegister
	{
		[Display(Name = "First Name")]
		[Required(ErrorMessage = "You need first name.")]
		public string FirstName { get; set; }

		[Display(Name = "Last Name")]
		[Required]
		public string LastName { get; set; }

		[Display(Name = "Email")]
		[EmailAddress]
		public string Email { get; set; }

		[Display(Name = "Phone")]
		[Phone]
		public int Phone { get; set; }

		[Display(Name = "Address1")]
		public string Address1 { get; set; }

		[Display(Name = "Address2")]
		public string Address2 { get; set; }

		[Display(Name = "City")]
		public string City { get; set; }

		[Display(Name = "State")]
		public string State { get; set; }

		[Display(Name = "Zip")]
		[Required]
		[RegularExpression(@"^([0-9]{5}(-[0-9]{4})?)$", ErrorMessage = "Please enter exactly 4 numbers.")]
		public int Zip { get; set; }

		[Display(Name = "Credit Card")]
		[CreditCard]
		public int CreditCard { get; set; }

		[Display(Name = "Number of Employees")]
		[Range(0, 100)]
		public int NumberOfEmployees { get; set; }

	}
}
