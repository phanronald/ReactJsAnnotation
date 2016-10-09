/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../common/helpers/htmlutility.ts" />
/// <reference path="../common/helpers/tagbuilder.ts" />
/// <reference path="../common/helpers/inputhelper.ts" />

/// <reference path="../typings/interface.d.ts" />
/// <reference path="../typings/dataannotation.d.ts" />
/// <reference path="dataannotationmodel.ts" />
/// <reference path="../models/vmregister.ts" />


class Register extends React.Component<ICustomDataAnnotationModel, any> {
	render() {

		var { dataFromServer } = this.props;

		var test = new vmRegister();
		var first = test.FirstName;

		return (

			<div>
				<section>

					{
						Object.keys(dataFromServer).map((key, index) => {
							const customAnnotation = dataFromServer[index];
							const dataAnnotationModel = new DataAnnotationModel(customAnnotation);
							var customReactElement = new System.Web.Mvc.Html.TextBoxFor(customAnnotation.fieldName, customAnnotation.fieldValue, dataAnnotationModel.GetAnnotations()).GetReactJsElement();

							return (
								<div className="row" key={index}>
									<div>
										<label htmlFor={customAnnotation.fieldName}>{customAnnotation.displayName}: </label>
										{customReactElement}
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

declare var registerModel: any;
var regModel = new DataFromServerModel(registerModel);
ReactDOM.render(<Register dataFromServer={regModel.dataFromServer} />, document.getElementById('container'));