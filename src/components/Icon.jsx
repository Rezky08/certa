import React from "react";

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: props.size ?? "1.5rem",
    };
    this.iconRef = React.createRef();
    this.setClickable = this.setClickable.bind(this);
  }
  setClickable() {
    this.iconRef.current.classList.add("cr-icon-clickable");
  }
  componentDidMount() {
    this.setClickable();
  }
  render() {
    return (
      <span className="cr-icon" ref={this.iconRef}>
        {React.cloneElement(this.props.icon, {
          height: this.state.size,
          width: this.state.size,
        })}
      </span>
    );
  }
}

export default Icon;
