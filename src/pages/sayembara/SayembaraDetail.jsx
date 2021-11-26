import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { withParams } from "components/route/WithParams";
import SayembaraChips from "components/sayembara/SayembaraChips";
import { Timer } from "@mui/icons-material";
import { Link } from "react-router-dom";

function SayembaraDetailJoinButton({ sayembaraId }) {
  const onClick = () => {
    console.log(sayembaraId);
  };
  return (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      className="cr-button"
    >
      Join
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

class SayembaraDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sayembaraId: 1,
      isJoined: true,
    };
  }
  static Item = SayembaraDetailItem;
  render() {
    return (
      <div className="cr-sayembara-detail">
        <div className="cr-sayembara-detail-banner"></div>
        <div className="cr-sayembara-detail-container">
          <Card className="cr-sayembara-detail-card">
            <CardHeader
              className="cr-sayembara-detail-card-header--container"
              title={
                <div className="cr-sayembara-detail-card-header">
                  <div className="cr-sayembara-detail-card-header--title">
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </span>
                  </div>
                  <div className="cr-sayembara-detail-card-header--detail">
                    <SayembaraChips style={{ justifyContent: "space-around" }}>
                      <SayembaraChips.Item icon={<Timer />} />
                    </SayembaraChips>
                  </div>
                </div>
              }
            />
            <CardContent className="cr-sayembara-detail-card-body--container">
              <div className="cr-sayembara-detail-card-body">
                <SayembaraDetailItem title="Description" content="" />
                <SayembaraDetailItem title="Requirements" content="" />
                <SayembaraDetailItem title="Project Deadline" content="" />
              </div>
            </CardContent>
            <CardActions className="cr-sayembara-detail-card-footer">
              {this.state.isJoined ? (
                <SayembaraDetailAddSubmissionButton {...this.state} />
              ) : (
                <SayembaraDetailJoinButton {...this.state} />
              )}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

SayembaraDetail.Item = SayembaraDetailItem;

export default withParams(SayembaraDetail);
