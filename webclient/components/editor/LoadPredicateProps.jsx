import React from 'react';
import TextField from 'material-ui/TextField';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';
import RemoveButton from 'material-ui/svg-icons/content/remove';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

export default class LoadPredicateProps extends React.Component{
  constructor(props){
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);
    this.resetPredicateProps = this.resetPredicateProps.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.savePredicate = this.savePredicate.bind(this);
    this.state = {
      name:'',
      propertyCount: 0,
      keyValue: [],
      attributes: {}
    };
  }

  resetPredicateProps(){
    let self = this;
    return new Promise(
      function(resolve, reject){
        self.setState({
          attributes: {},
          keyValue: [],
          propertyCount: 0,
          name: ''
        }, function(){
            if(self.state.keyValue.length == 0){
              resolve(Object.keys(self.state.attributes).length);
            }else{
              reject(false);
            }
        });
      });
  }

componentWillReceiveProps(nextProps){
    if(nextProps.predicateDetails !== null){
      this.resetPredicateProps().then(result => {
        console.log(nextProps.predicateDetails);
        let that = this;
        console.log(nextProps.predicateDetails['attributes']);
        Object.keys(nextProps.predicateDetails['attributes']).forEach(function(key,index){
          that.state.keyValue.push(that.tempFunc(key,nextProps.predicateDetails['attributes'][key],index));
          that.setState(that.state);
        });
        let propertyCount = this.state.propertyCount;
        this.setState({
          name: nextProps.predicateDetails['name'],
          propertyCount: propertyCount + Object.keys(this.state.attributes).length
        });
      }, err => {
        console.log('here at promise fail');
      }
    );
  }else{
    this.resetPredicateProps().then(result => {
      console.log('Done');
    });
  }

}

  removeProperty(key){
    this.state.keyValue[key] = null;
    this.setState(this.state);
  }

  tempFunc(key,value,index){
    return (
      <div>
        <FormsyText
        name= {'k' + index}
        defaultValue = {key}
        required
        floatingLabelText="property name"
        style={{
            width: '40%'
        }}
      />
      <FormsyText
        name={'v' + index}
        defaultValue = {value}
        required
        floatingLabelText="property value"
        style={{
            width: '40%'
        }}
      />
    <IconButton onTouchTap = {this.removeProperty.bind(this,index)} style={{
            width: '20%'
        }}>
        <RemoveButton/>
        </IconButton>
     </div>
  );
  }

  submitForm(data) {
    let formData = {
      attributes: {

      }
    };
    Object.keys(data).forEach(function(key,index){
      if(index < 1){
        formData[key] = data[key];
      }else{
        let k = key.substr(1,key.length);
        let v = data['v'+k];
        if(Object.keys(formData['attributes']).indexOf(data[key]) == -1 && key.substr(0,1) == 'k'){
          formData['attributes'][data[key]] = v;
        }
      }
    });

    this.savePredicate(formData);
  }

  savePredicate(formData){
    this.props.updatePredicateCard(formData);
  }

  addProperty(){
    let propertyCount = this.state.propertyCount;
    this.state.keyValue.push(this.tempFunc('','',propertyCount));
    this.setState(this.state);
    this.setState({
      propertyCount: propertyCount + 1,
    });
  }

  render(){
    return (
      <div>
        <Formsy.Form
          onValid={this.enableButton}
          onValidSubmit={this.submitForm}
        >
        <FormsyText
          name="name"
          defaultValue={this.state.name}
          required
          floatingLabelText="Predicate Name"
          style={{
              width: '100%'
          }}
        />
      {this.state.keyValue}
      <FlatButton label='Add Property'
         primary={true}
         onTouchTap = {this.addProperty}
         style = {{
           marginTop: '20px'
         }}
         />
       <Divider/>
       <FlatButton type="submit" label="save" style={{
           float: 'right'
       }}/>
      </Formsy.Form>
      </div>
    )
  }
}
