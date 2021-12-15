import { getSayembaraList } from "api/sayembara";
import React from "react";
import SayembaraCard from "../SayembaraCard";

class SayembaraBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    getSayembaraList().then(({ data }) => {
      this.setState({ data: data });
    });
  }
  render() {
    return (
      <div className="cr-sayembara-body">
        <div className="cr-sayembara-items">
          {this.state.data.map((value, key) => (
            <SayembaraCard key={key} to={`/sayembara/${value.id}`} />
          ))}
        </div>
      </div>
    );
  }
}

export default SayembaraBody;
