import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text ?? null,
    };
    this.setText = this.setText.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  setText(value, callback = () => {}) {
    this.setState(
      {
        text: value ?? this.state.text,
      },
      () => callback(value)
    );
  }

  onSearch() {
    this.props.onSearch(this.state.text);
  }

  render() {
    return (
      <div className="cr-search-bar">
        <TextField
          size="small"
          className="cr-search-bar--input"
          variant="outlined"
          onChange={(e) => this.setText(e.target.value, this.props.onChange)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={this.onSearch}>
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
