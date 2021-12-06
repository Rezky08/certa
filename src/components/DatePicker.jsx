import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePickerMui from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? null,
    };
  }
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePickerMui
          {...this.props}
          value={this.state.value}
          onChange={(newValue) =>
            this.setState({ value: newValue }, () =>
              this.props.onChange(this.state.value)
            )
          }
          renderInput={(params) => <TextField {...params} {...this.props} />}
        />
      </LocalizationProvider>
    );
  }
}

DatePicker.defaultProps = {
  onChange: () => {},
};

export default DatePicker;
