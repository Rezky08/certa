// import logo from "./logo.svg";
import "./App.css";
import "./assets/styles/index.scss";
import DefaultLayout from "./components/DefaultLayout";
import { useRoutes } from "react-router-dom";
import React from "react";
import { pages } from "./pages";

function App() {
  let element = useRoutes(pages);
  return (
    <div className="App">
      <DefaultLayout>{element}</DefaultLayout>
    </div>
  );
}

export default App;
