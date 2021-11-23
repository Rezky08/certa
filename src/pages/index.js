import Home from "./Home";
import Login from "./Login";
import AuthLayout from "../components/AuthLayout";
import { Route } from "react-router-dom";
import SayembaraList from "./Sayembara";
import SayembaraHeader from "../components/sayembara/SayembaraHeader";

const pagesWithAuth = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/search",
    component: <Home />,
  },
  {
    path: "/sayembara",
    component: <SayembaraList />,
    header: <SayembaraHeader />,
  },
];

const pagesWithoutAuth = [
  {
    path: "/login",
    component: <Login />,
  },
];

const displayPagesWithAuth = () =>
  pagesWithAuth.map((value) => {
    return (
      <Route
        key={value.path}
        exact
        path={value.path}
        element={
          <AuthLayout header={value.header ?? null}>
            {value.component}
          </AuthLayout>
        }
      />
    );
  });

const displayPagesWithoutAuth = () =>
  pagesWithoutAuth.map((value) => {
    return (
      <Route
        key={value.path}
        exact
        path={value.path}
        element={value.component}
      />
    );
  });

export {
  pagesWithAuth,
  pagesWithoutAuth,
  displayPagesWithoutAuth,
  displayPagesWithAuth,
};
