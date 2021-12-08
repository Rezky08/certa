import React from "react";
import Validator from "laravel-reactjs-validation";

class SayembaraCreateBase extends React.Component {
  constructor(props) {
    super(props);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.form = new Validator(this);
  }
  setFieldValue(name, value) {
    // console.log(value?.constructor?.name);
    let fields = { ...this.state.fields };
    fields[name] = value ?? this.state.fields[name];
    this.setState({ fields: fields }, this.onFieldChange);
    this.props.setFieldValue(name, value);
  }

  onFieldChange() {
    this.props.onChange(Object.keys(this.state.errors).length === 0);
  }

  validateAll() {
    this.form.validateAll();
    this.props.onChange(Object.keys(this.state.errors).length === 0);
    if (Object.keys(this.state.errors).length === 0) {
      this.props.onValid(this.state.fields);
    }
  }
}

SayembaraCreateBase.defaultProps = {
  onChange: () => {},
  setFieldValue: () => {},
  onValid: () => {},
};

export default SayembaraCreateBase;
