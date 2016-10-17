/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../common/helpers/htmlutility.ts" />
/// <reference path="../common/helpers/tagbuilder.ts" />
/// <reference path="../common/helpers/inputhelper.ts" />

/// <reference path="../typings/interface.d.ts" />
/// <reference path="../typings/dataannotation.d.ts" />
/// <reference path="dataannotationmodel.ts" />
/// <reference path="../models/vmregister.ts" />


//class Register extends React.Component<ICustomDataAnnotationModel, any> {
class Register extends React.Component<any, any> {
	render() {

		//var { dataFromServer } = this.props;

		var registerModel = new vmRegister();
		registerModel.FirstName = "First";
		registerModel.LastName = "last";
		registerModel.CreditCard = 4111111111111111;


		var textboxFor = [];

		for (var property in registerModel) {
			let valuesForProperty = System.ComponentModel.DataAnnotations.GenericDataAnnotation.Where(x => x.key[0] == property);
			const currentPropertyHtml = new System.Web.Mvc.Html.TextBoxFor(property, (propertyName: string) => registerModel[propertyName]).GetHtml();
			textboxFor.push(currentPropertyHtml);
		}

		return (

			<div>
				<section>
					{
						Object.keys(textboxFor).map((key, index) => {
							const textboxRegister = textboxFor[index];

							return (
								<div className="row" key={index}>
									<div>
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