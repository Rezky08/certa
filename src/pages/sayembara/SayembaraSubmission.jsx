import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import { withParams } from "components/route/WithParams";
import { Link } from "react-router-dom";
import Upload from "components/Upload";
import { uploadTest } from "api/fileUpload";
import { DateRange, Timer, UploadFile } from "@mui/icons-material";

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

function SayembaraDetailAddSubmissionButton({ sayembaraId }) {
  const onClick = () => {
    console.log(sayembaraId);
  };
  return (
    <Link to={`submission`} style={{ width: "100%" }}>
      <Button
        variant="contained"
        fullWidth
        onClick={onClick}
        className="cr-button"
      >
        Add Submission
      </Button>
    </Link>
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
      isJoined: true,
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
    return (
      <div className="cr-sayembara-detail cr-sayembara-submission">
        <div className="cr-sayembara-detail-banner"></div>
        <div className="cr-sayembara-detail-container">
          <Card className="cr-sayembara-detail-card">
            <CardHeader
              className="cr-sayembara-detail-card-header--container"
              title={
                <div className="cr-sayembara-detail-card-header">
                  <div className="cr-sayembara-detail-card-header--title">
                    <span>Submission Status</span>
                  </div>
                </div>
              }
            />
            <CardContent className="cr-sayembara-detail-card-body--container cr-sayembara-submission-card-body--container">
              <div className="cr-sayembara-detail-card-body cr-sayembara-submission-card-body">
                <div className="cr-sayembara-submission-card--status">
                  <Chip label={<span>No Attempt</span>} />
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
                        className="cr-sayembara-submission-card--detail-item"
                      >
                        Upload Files
                      </Button>
                    }
                    onChange={(value) =>
                      this.setState({ files: value }, this.fileHandle)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardActions className="cr-sayembara-detail-card-footer">
              <SayembaraSubmitButton {...this.state} />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

SayembaraSubmission.Item = SayembaraDetailItem;

export default withParams(SayembaraSubmission);
