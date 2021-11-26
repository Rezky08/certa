import React from "react";
import AuthLayoutBody from "../components/AuthLayoutBody";
import SayembaraBody from "../components/sayembara/SayembaraBody";
import SayembaraHeader from "../components/sayembara/SayembaraHeader";

class Sayembara extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(value) {
    console.log(value);
  }
  render() {
    return (
      <AuthLayoutBody header={<SayembaraHeader onSearch={this.onSearch} />}>
        <div className="cr-sayembara">
          <SayembaraBody />
        </div>
      </AuthLayoutBody>
    );
  }
}

export default Sayembara;
