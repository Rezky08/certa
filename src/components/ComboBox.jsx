import { Autocomplete, TextField } from "@mui/material";
import React from "react";

class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    let inputPropList = [
      "label",
      "variant",
      "name",
      "helperText",
      "error",
      "onBlur",
    ];

    this.state = {
      inputPropList: inputPropList,
      inputProps: {},
      comboBoxProps: {},
    };
    this.inputPropsFilter = this.inputPropsFilter.bind(this);
    this.comboBoxPropsFilter = this.comboBoxPropsFilter.bind(this);
    this.filterProps = this.filterProps.bind(this);

    this.state = {
      ...this.state,
      inputProps: this.inputPropsFilter(this.props),
      comboBoxProps: this.comboBoxPropsFilter(this.props),
    };
  }
  filterProps() {
    this.setState({
      inputProps: this.inputPropsFilter(this.props),
      comboBoxProps: this.comboBoxPropsFilter(this.props),
    });
  }
  inputPropsFilter(props) {
    return Object.fromEntries(
      Object.entries(props).filter(([key, value]) =>
        this.state.inputPropList.includes(key)
      )
    );
  }
  comboBoxPropsFilter(props) {
    return Object.fromEntries(
      Object.entries(props).filter(
        ([key]) => !this.state.inputPropList.includes(key)
      )
    );
  }
  componentDidUpdate(props) {
    for (let [key] of Object.entries(props)) {
      if (props[key] !== this.props[key]) {
        this.filterProps();
        break;
      }
    }
  }
  render() {
    return (
      <Autocomplete
        disablePortal
        className="cr-combo-box"
        options={this.state.comboBoxProps?.options ?? []}
        sx={{ width: "100%" }}
        {...this.state.comboBoxProps}
        onChange={(event, newValue) =>
          this.state.comboBoxProps?.onChange(newValue)
        }
        onInputChange={(event, newInputValue) => {
          this.state.comboBoxProps?.onInputChange(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} {...this.state.inputProps} />
        )}
      />
    );
  }
}
ComboBox.defaultProps = {
  onChange: () => {},
  onInputChange: () => {},
};
export default ComboBox;
