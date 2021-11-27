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
import SayembaraLayout from "components/SayembaraLayout";

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
    const sayembaraDetailHeaderTitle = (
      <SayembaraLayout.HeaderTitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </SayembaraLayout.HeaderTitle>
    );
    const sayembaraDetailHeaderDetail = (
      <SayembaraLayout.HeaderDetail>
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </SayembaraLayout.HeaderDetail>
    );
    const sayembaraDetailBody = (
      <SayembaraLayout.Body>
        <SayembaraDetailItem title="Description" content="" />
        <SayembaraDetailItem title="Requirements" content="" />
        <SayembaraDetailItem title="Project Deadline" content="" />
      </SayembaraLayout.Body>
    );
    const sayembaraDetailFooter = this.state.isJoined ? (
      <SayembaraDetailAddSubmissionButton {...this.state} />
    ) : (
      <SayembaraDetailJoinButton {...this.state} />
    );
    return (
      <SayembaraLayout
        headerTitle={sayembaraDetailHeaderTitle}
        headerDetail={sayembaraDetailHeaderDetail}
        body={sayembaraDetailBody}
        footer={sayembaraDetailFooter}
      />
    );
  }
}

SayembaraDetail.Item = SayembaraDetailItem;

export default withParams(SayembaraDetail);
