import React from "react";
import { Button, Chip } from "@mui/material";
import { withParams } from "components/route/WithParams";
import Upload from "components/Upload";
import { DateRange, Timer, UploadFile } from "@mui/icons-material";
import SayembaraLayout from "components/SayembaraLayout";

function SayembaraSubmitButton(props) {
  const onClick = () => {
    // uploadTest(formdata).then((response) => {
    //   console.log(response);
    // });
  };
  return (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      className="cr-button"
    >
      Submit
    </Button>
  );
}

function SayembaraEditSubmitButton(props) {
  const onClick = () => {
    // uploadTest(formdata).then((response) => {
    //   console.log(response);
    // });
  };
  return (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      className="cr-button"
    >
      Edit Submission
    </Button>
  );
}

function SayembaraDetailItem(props) {
  return (
    <div className="cr-sayembara-detail-card-item">
      <div className="cr-sayembara-detail-card-item--title">
        <span>{props.title}</span>
      </div>
      <div className="cr-sayembara-detail-card-item--content">
        <span>{props.content}</span>
      </div>
    </div>
  );
}

class SayembaraSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sayembaraId: 1,
      isSubmitted: true,
      files: props.files ?? [],
    };
  }
  fileHandle() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.state.files[0]);
    fileReader.onload = (e) => {
      // console.log(e.target.result);
    };
  }
  static Item = SayembaraDetailItem;
  render() {
    const sayembaraSubmissionHeaderTitle = (
      <SayembaraLayout.HeaderTitle>
        Submission Status
      </SayembaraLayout.HeaderTitle>
    );
    const sayembaraSubmissionBody = (
      <SayembaraLayout.Body className="cr-sayembara-submission-card-body">
        <div
          className={["cr-sayembara-submission-card--status", "submitted"].join(
            " "
          )}
        >
          {!this.state.isSubmitted ? (
            <Chip label={<span>No Attempt</span>} />
          ) : (
            <Chip label={<span>Submitted</span>} color="success" />
          )}
        </div>
        <div className="cr-sayembara-submission-card--detail">
          <Button
            startIcon={<DateRange />}
            className="cr-sayembara-submission-card--detail-item"
          >
            {this.props.end_date}
          </Button>
          <Button
            startIcon={<Timer />}
            className="cr-sayembara-submission-card--detail-item"
          >
            {this.props.end_date}
          </Button>
          <Upload
            uploadButton={
              <Button
                startIcon={<UploadFile />}
                component="span"
                variant="text"
                style={{ width: "100%" }}
              >
                Upload Files
              </Button>
            }
            onChange={(value) =>
              this.setState({ files: value }, this.fileHandle)
            }
          />
        </div>
      </SayembaraLayout.Body>
    );

    const sayembaraSubmissionFooter = !this.state.isSubmitted ? (
      <SayembaraSubmitButton {...this.state} />
    ) : (
      <SayembaraEditSubmitButton {...this.state} />
    );

    return (
      <SayembaraLayout
        headerTitle={sayembaraSubmissionHeaderTitle}
        body={sayembaraSubmissionBody}
        footer={sayembaraSubmissionFooter}
      />
    );
  }
}

SayembaraSubmission.Item = SayembaraDetailItem;

export default withParams(SayembaraSubmission);
