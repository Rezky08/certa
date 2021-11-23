import { Card, CardContent, Chip } from "@mui/material";
import React from "react";
import { People, FileCopy, CardGiftcard } from "@mui/icons-material";
import Icon from "./Icon";

class SayembaraCard extends React.Component {
  render() {
    return (
      <Card sx={{ minWidth: 275 }} className="cr-sayembara-card">
        <CardContent className="cr-sayembara-card-container">
          <div className="cr-sayembara-card-header">
            <div className="cr-sayembara-card--thumbnail">
              {this.props.thumbnail}
            </div>
          </div>
          <div className="cr-sayembara-card-body">
            <div className="cr-sayembara-card--title">
              <span>{this.props.title}</span>
            </div>
            <div className="cr-sayembara-card--content">
              {this.props.content}
            </div>
          </div>
          <div className="cr-sayembara-card-footer">
            <Chip
              size="small"
              variant="outlined"
              avatar={<Icon icon={<People />} />}
              label={this.props.participants ?? 0}
              className="cr-sayembara-card-footer--chip"
            />
            <Chip
              size="small"
              variant="outlined"
              avatar={<Icon icon={<FileCopy />} />}
              label={this.props.submissions ?? 0}
              className="cr-sayembara-card-footer--chip"
            />
            <Chip
              size="small"
              variant="outlined"
              avatar={<Icon icon={<CardGiftcard />} />}
              label={this.props.prize ?? 0}
              className="cr-sayembara-card-footer--chip"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default SayembaraCard;
