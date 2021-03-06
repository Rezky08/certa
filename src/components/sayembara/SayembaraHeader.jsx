import React from "react";
import SearchBar from "../SearchBar";
import { IconButton } from "@mui/material";
import { Bookmark, FavoriteBorder } from "@mui/icons-material";
class SayembaraHeader extends React.Component {
  render() {
    return (
      <div className="cr-sayembara-header">
        <div className="cr-sayembara-header-container">
          <div className="cr-sayembara-header--search">
            <SearchBar
              onSearch={this.props.onSearch}
              onChange={this.props.onChange}
            />
          </div>
          <div className="cr-sayembara-header--actions">
            <IconButton>
              <Bookmark />
            </IconButton>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

SayembaraHeader.defaultProps = {
  onSearch: () => {},
  onChange: () => {},
};

export default SayembaraHeader;
