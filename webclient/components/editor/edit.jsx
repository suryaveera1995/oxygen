import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {
    FormsyCheckbox,
    FormsyDate,
    FormsyRadio,
    FormsyRadioGroup,
    FormsySelect,
    FormsyText,
    FormsyTime,
    FormsyToggle,
    FormsyAutoComplete
} from 'formsy-material-ui/lib';
/**
   * As an alternative to `MuiThemeProvider` you can add a theme directly into context.
   * See the [Material-UI themes](http://www.material-ui.com/#/customization/themes) docs for details.
   *
   * childContextTypes: {
   *   muiTheme: React.PropTypes.object,
   * },
   * getChildContext(){
   *   return {
   *     muiTheme: getMuiTheme(),
   *   }
   * },
   */
const styles = {
    div: {
        width: 10,
        margin: 10,
        padding: 20
    },
    switchStyle: {
        marginBottom: 16
    },
    submitStyle: {
        marginTop: 32
    }
}
export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            openDialog: false
        };
    }
    enableButton() {
        this.setState({canSubmit: true});
    }
    disableButton() {
        this.setState({canSubmit: false});
    }
    submitForm(data) {
        alert(JSON.stringify(data, null, 4));
    }
    notifyFormError(data) {
        console.error('Form error:', data);
    }
    handleClose = () => {
        this.setState({openDialog: true});
    };
    render() {
        let {paperStyle, switchStyle, submitStyle} = styles;
        return (
            <div>
                <Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.submitForm}>
                    <FormsyText name="Subject" validations="isWords" required hintText="Subject name" floatingLabelText="Subject name"/>
                    <br/>
                    <FormsyText name="Name" validations="isWords" required hintText="Name" floatingLabelText="name"/>
                    <br/>

                    <FormsyText name="properties" validations="isWords" hintText="properties" floatingLabelText="properties"/>
                </Formsy.Form>
            </div>
        );
    }
}
