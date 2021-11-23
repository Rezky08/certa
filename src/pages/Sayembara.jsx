import React from "react";
import SayembaraCard from "../components/SayembaraCard";

class SayembaraList extends React.Component {
  render() {
    return (
      <div className="cr-sayembara-list">
        <div className="cr-sayembara-list-body">
          <SayembaraCard />
        </div>
      </div>
    );
  }
}

export default SayembaraList;
