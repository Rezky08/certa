import React from "react";
// import Validator from "laravel-reactjs-validation";
// import ComboBox from "components/ComboBox";
import { Button } from "@mui/material";
import SayembaraCreateBase from "./SayembaraCreateBase";
import Upload from "components/Upload";
import { UploadFile } from "@mui/icons-material";

class SayembaraCreateAttachmentSection extends SayembaraCreateBase {
  constructor(props) {
    super(props);
    console.log(props.fields);
    this.state = {
      formVariant: props.formVariant ?? "standard",
      errors: {},
      fields: {
        attachments: [],
      },
      rules: {
        attachments: [],
      },
    };
    this.form.useRules(this.state.rules);
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const attachmentSection = (
      <section className="cr-sayembara-create-body-section">
        <span className="cr-sayembara-create-body-section--title">
          Sayembara Attachment
        </span>
        <div className="cr-sayembara-create-body-section--form">
          <div className="cr-sayembara-create-body-section--form-split">
            <Upload
              onChange={(files) => this.setFieldValue("attachments", files)}
              uploadButton={
                <Button
                  startIcon={<UploadFile />}
                  component="span"
                  variant="contained"
                  style={{ width: "100%" }}
                >
                  Upload Files
                </Button>
              }
            />
          </div>
        </div>
      </section>
    );
    return <>{attachmentSection}</>;
  }
}

export default SayembaraCreateAttachmentSection;
