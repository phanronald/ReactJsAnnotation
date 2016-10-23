/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../common/helpers/htmlutility.ts" />
/// <reference path="../common/helpers/tagbuilder.ts" />
/// <reference path="../common/helpers/inputhelper.ts" />
/// <reference path="../common/helpers/labelhelper.ts" />

/// <reference path="../typings/interface.d.ts" />
/// <reference path="../typings/dataannotation.d.ts" />
/// <reference path="../models/vmregister.ts" />


//class Register extends React.Component<ICustomDataAnnotationModel, any> {
class Register extends React.Component<any, any> {
	render() {

		//var { dataFromServer } = this.props;

		var registerModel = new vmRegister();
		registerModel.FirstName = "First";
		registerModel.LastName = "last";
		registerModel.CreditCard = 4111111111111111;

		var displayFor = [];
		var textboxFor = [];

		for (var property in registerModel) {
			//let valuesForProperty = System.ComponentModel.DataAnnotations.GenericValidationAnnotation.Where(x => x.key[0] == property && x.key[1] == vmRegister);
			const currentPropertyHtml = new System.Web.Mvc.Html.TextBoxFor(vmRegister, property, (propertyName: string) => registerModel[propertyName]).GetHtml();
			const currentLabelForHtml = new System.Web.Mvc.Html.LabelFor(vmRegister, property, null).GetHtml();
			displayFor.push(currentLabelForHtml);
			textboxFor.push(currentPropertyHtml);
		}

		return (

			<div>
				<section>
					{
						Object.keys(textboxFor).map((key, index) => {
							const textboxRegister = textboxFor[index];
							const labelRegister = displayFor[index];
							return (
								<div className="row" key={index}>
									<div>
										{labelRegister}
										{textboxRegister}
									</div>
								</div>
							)

						})
					}
					
				</section>
				<section>
					<div>
						<button><div></div>submit</button>
					</div>
				</section>
			</div>

		);
	}
}

//declare var registerModel: any;
//var regModel = new DataFromServerModel(registerModel);
//ReactDOM.render(<Register dataFromServer={regModel.dataFromServer} />, document.getElementById('container'));
ReactDOM.render(<Register />, document.getElementById('container'));