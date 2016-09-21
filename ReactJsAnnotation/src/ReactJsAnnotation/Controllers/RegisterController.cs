using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactJsAnnotation.Models;
using ReactJsAnnotation.Code;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactJsAnnotation.Controllers
{
	public class RegisterController : Controller
	{
		// GET: /<controller>/
		public IActionResult Index()
		{
			var regModel = new vmRegister()
			{
				FirstName = "I AM ME"
			};

			var displayNames = AttributeExtensions.GetDataAnnotationAttribute<DisplayAttribute>(typeof(vmRegister))
								.Select(x => x.Name).ToList();

			var type = regModel.GetType();
			var properties = type.GetProperties();
			var listOfRegisterInfo = new List<vmRegisterInfo>();
			for (var i = 0; i < properties.Count(); i++)
			{
				var property = properties[i];
				var dataAnnotationDictionary = new Dictionary<string, List<Attribute>>();

				var displayName = AttributeExtensions.GetAttributeFrom<DisplayAttribute>(regModel, property.Name).Name;
				var requiredAttr = AttributeExtensions.GetAttributeFrom<RequiredAttribute>(regModel, property.Name);
				var emailAttr = AttributeExtensions.GetAttributeFrom<EmailAddressAttribute>(regModel, property.Name);
				var phoneAttr = AttributeExtensions.GetAttributeFrom<PhoneAttribute>(regModel, property.Name);
				var regexAttr = AttributeExtensions.GetAttributeFrom<RegularExpressionAttribute>(regModel, property.Name);
				var rangeAttr = AttributeExtensions.GetAttributeFrom<RangeAttribute>(regModel, property.Name);
				var creditcardAttr = AttributeExtensions.GetAttributeFrom<CreditCardAttribute>(regModel, property.Name);

				var allAttributes = new List<Attribute>()
				{
					requiredAttr, emailAttr, phoneAttr, regexAttr, rangeAttr, creditcardAttr
				}.Where(x => x != null).ToList();

				dataAnnotationDictionary.Add(property.Name, allAttributes);

				var info = new vmRegisterInfo()
				{
					FieldName = property.Name,
					FieldValue = property.GetValue(regModel, null),
					DisplayName = displayName,
					DataAnnotations = dataAnnotationDictionary
				};

				listOfRegisterInfo.Add(info);
			}

			var model = new vmRegisterContainer()
			{
				AllPropertyAnnotation = listOfRegisterInfo
			};

			return View(model);
		}
	}
}
