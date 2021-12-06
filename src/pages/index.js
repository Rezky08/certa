import Home from "./Home";
import Login from "./Login";
import AuthLayout from "components/AuthLayout";
import { Route, Outlet } from "react-router-dom";
import Sayembara from "./Sayembara";
import SayembaraDetail from "./sayembara/SayembaraDetail";
import SayembaraSubmission from "./sayembara/SayembaraSubmission";
import PrivateRoute from "components/PrivateRoute";
import AuthLayoutBody from "components/AuthLayoutBody";
import SayembaraCreate from "./sayembara/SayembaraCreate";

const pagesWithAuth = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <AuthLayoutBody />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "search",
            element: <Home />,
          },
        ],
      },
      {
        path: "",
        element: <AuthLayoutBody padding={false} />,
        children: [
          {
            path: "sayembara",
            element: <Outlet />,
            children: [
              {
                path: "create",
                element: <SayembaraCreate />,
              },
              {
                path: ":sayembaraId",
                element: <SayembaraDetail />,
              },
              {
                path: ":sayembaraId/submission",
                element: <SayembaraSubmission />,
              },
            ],
          },
        ],
      },
      {
        path: "sayembara",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Sayembara />,
          },
          {
            path: ":sayembaraId",
            element: <SayembaraDetail />,
          },
        ],
      },
    ],
  },
];

const pagesWithoutAuth = [
  {
    path: "/login",
    element: <Login />,
  },
];

const pages = [
  {
    path: "",
    element: <PrivateRoute />,
    children: pagesWithAuth,
  },
  {
    path: "",
    children: pagesWithoutAuth,
  },
];

const mapPagesWithAuth = (pages = []) =>
  pages.map((value) => {
    return (
      <Route key={value.path} path={value.path} element={value.element}>
        {value.children ? displayPagesWithAuth(value.children) : null}
      </Route>
    );
  });

const displayPagesWithAuth = (pages = []) =>
  pages.length > 0 ? mapPagesWithAuth(pages) : mapPagesWithAuth(pagesWithAuth);

const displayPagesWithoutAuth = () =>
  pagesWithoutAuth.map((value) => {
    return <Route key={value.path} path={value.path} element={value.element} />;
  });

export {
  pages,
  pagesWithAuth,
  pagesWithoutAuth,
  displayPagesWithoutAuth,
  displayPagesWithAuth,
};
