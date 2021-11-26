import React from "react";
import SayembaraCard from "../SayembaraCard";

class SayembaraBody extends React.Component {
  render() {
    return (
      <div className="cr-sayembara-body">
        <div className="cr-sayembara-items">
          {[...Array(10)].map((value, key) => (
            <SayembaraCard key={key} to={`/sayembara/${key}`} />
          ))}
        </div>
      </div>
    );
  }
}

export default SayembaraBody;
