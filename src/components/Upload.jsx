import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelNoFile: props.labelNoFile ?? "Upload",
      labelHasFile: props.labelNoFile,
      files: props.files ?? undefined,
    };
  }
  render() {
    return (
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) =>
            this.setState({ files: e.target.files }, () =>
              this.props.onChange(e.target.files)
            )
          }
        />
        <Button variant="contained" component="span">
          {this.state.files?.length > 0
            ? this.state.labelHasFile ?? `${this.state.files?.length} Files`
            : this.state.labelNoFile}
        </Button>
      </label>
    );
  }
}

Upload.defaultProps = {
  onChange: () => {},
};

export default Upload;
