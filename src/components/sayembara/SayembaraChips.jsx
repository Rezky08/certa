import { CardGiftcard, FileCopy, People } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import Icon from "../Icon";

function SayembaraChipsItem(props) {
  return (
    <Chip
      size="small"
      variant="outlined"
      avatar={<Icon icon={props.icon} />}
      label={props.label ?? 0}
      className="cr-sayembara-chip-item"
    />
  );
}

class SayembaraChips extends React.Component {
  static Item = SayembaraChipsItem;
  render() {
    return (
      <div
        className={[
          "cr-sayembara-chips",
          this.props.vertical === true ? "vertical" : null,
        ].join(" ")}
        style={this.props.style ?? null}
      >
        <SayembaraChipsItem
          icon={<People />}
          label={this.props.participants ?? 0}
        />
        <SayembaraChipsItem
          icon={<FileCopy />}
          label={this.props.submissions ?? 0}
        />
        <SayembaraChipsItem
          icon={<CardGiftcard />}
          label={this.props.prize ?? 0}
        />
        {this.props.children}
      </div>
    );
  }
}

SayembaraChips.Item = SayembaraChipsItem;
export default SayembaraChips;
