import { Timer } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import React from "react";
import SayembaraChips from "./sayembara/SayembaraChips";
function SayembaraLayoutHeaderTitle(props) {
  return (
    <div
      className={["cr-sayembara-detail-card-header--title"]
        .concat(props.className?.split(" "))
        .join(" ")}
    >
      <span>{props.children}</span>
    </div>
  );
}

function SayembaraLayoutHeaderDetail(props) {
  return (
    <div
      className={["cr-sayembara-detail-card-header--detail"]
        .concat(props.className?.split(" "))
        .join(" ")}
    >
      {props.default === false ? (
        props.children
      ) : (
        <SayembaraChips style={{ justifyContent: "space-around" }}>
          <SayembaraChips.Item icon={<Timer />} />
        </SayembaraChips>
      )}
    </div>
  );
}

function SayembaraLayoutBody(props) {
  return (
    <div
      className={["cr-sayembara-layout-card-body"]
        .concat(props.className?.split(" "))
        .join(" ")}
    >
      {props.children}
    </div>
  );
}

class SayembaraLayout extends React.Component {
  static HeaderTitle = SayembaraLayoutHeaderTitle;
  static HeaderDetail = SayembaraLayoutHeaderDetail;
  static Body = SayembaraLayoutBody;
  render() {
    return (
      <div className="cr-sayembara-layout">
        <div className="cr-sayembara-layout-banner">{this.props.banner}</div>
        <div className="cr-sayembara-layout-container">
          <Card className="cr-sayembara-layout-card">
            <CardHeader
              className="cr-sayembara-layout-card-header--container"
              title={
                <div className="cr-sayembara-detail-card-header">
                  {this.props.headerTitle}
                  {this.props.headerDetail}
                </div>
              }
            />
            <CardContent className="cr-sayembara-layout-card-body--container">
              {this.props.body}
            </CardContent>

            <CardActions className="cr-sayembara-layout-card-footer--container">
              {this.props.footer}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

SayembaraLayout.HeaderTitle = SayembaraLayoutHeaderTitle;
SayembaraLayout.HeaderDetail = SayembaraLayoutHeaderDetail;
SayembaraLayout.Body = SayembaraLayoutBody;

export default SayembaraLayout;
