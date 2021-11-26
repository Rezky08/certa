import { useLocation, useNavigationType } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useLocation();
    const navigationType = useNavigationType();

    return (
      <Component history={history} navigationType={navigationType} {...props} />
    );
  };
  return Wrapper;
};
