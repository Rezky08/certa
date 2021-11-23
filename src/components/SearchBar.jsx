import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cr-search-bar">
        <TextField
          size="small"
          className="cr-search-bar--input"
          variant="outlined"
          onChange={(e) => {
            this.props.onChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={this.props.onSearch}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

SearchBar.defaultProps = {
  onChange: () => {},
  onSearch: () => {},
};

export default SearchBar;
