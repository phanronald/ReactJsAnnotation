using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace ReactJsAnnotation.Code
{
	public static class AttributeExtensions
	{
		public static TAttribute GetAttribute<TAttribute>(this Enum enumValue)
		   where TAttribute : Attribute
		{
			return enumValue.GetType().GetMember(enumValue.ToString())
							.First().GetCustomAttribute<TAttribute>();
		}

		public static IHtmlContent DisplayFor<TModel, TValue>(this IHtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression)
		{
			if (html == null) throw new ArgumentNullException(nameof(html));
			if (expression == null) throw new ArgumentNullException(nameof(expression));

			var modelExplorer = ExpressionMetadataProvider.FromLambdaExpression(expression, html.ViewData, html.MetadataProvider);
			if (modelExplorer == null) throw new InvalidOperationException($"Failed to get model explorer for {ExpressionHelper.GetExpressionText(expression)}");

			return new HtmlString(modelExplorer.Metadata.DisplayName);
		}

		public static IEnumerable<T> GetDataAnnotationAttribute<T>(Type t, bool showNull = false) where T : Attribute
		{
			var listOfAttributes = t.GetProperties().Select(x => x.GetCustomAttribute<T>())
					.Where(x => x != null || showNull);

			return listOfAttributes;
		}

		public static T GetAttributeFrom<T>(object instance, string propertyName) where T : Attribute
		{
			var attrType = typeof(T);
			var property = instance.GetType().GetProperty(propertyName);
			var customAttributes = property.GetCustomAttributes(attrType, false);
			if (customAttributes.Any())
			{
				return customAttributes.First() as T;
			}

			return null;
		}
	}
}
