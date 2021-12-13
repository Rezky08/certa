import React from "react";
import Validator from "laravel-reactjs-validation";

class SayembaraCreateBase extends React.Component {
  constructor(props) {
    super(props);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.setOptionValue = this.setOptionValue.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.form = new Validator(this);
  }
  setFieldValue(name, value) {
    // console.log(value?.constructor?.name);
    let fields = { ...this.state.fields };
    fields[name] = value ?? this.state.fields[name];
    this.setState({ fields: fields }, () => this.onFieldChange(name));
    this.props.setFieldValue(name, value);
  }

  setOptionValue(name, value) {
    // console.log(value?.constructor?.name);
    let options = { ...this.state.options };
    options[name] = value ?? this.state.options[name];
    this.setState({ options: options }, () => this.onOptionChange(name));
  }

  onOptionChange(name) {
    this.props.onOptionChange(this.state.options[name]);
  }
  onFieldChange(name) {
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
  onOptionChange: () => {},
  setFieldValue: () => {},
  onValid: () => {},
};

export default SayembaraCreateBase;
