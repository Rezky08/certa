// import logo from "./logo.svg";
import "./App.css";
import "./assets/styles/index.scss";
import DefaultLayout from "./components/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { displayPagesWithAuth, displayPagesWithoutAuth } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              {displayPagesWithAuth()}
            </Route>
            {displayPagesWithoutAuth()}
          </Routes>
        </DefaultLayout>
      </div>
    </Router>
  );
}

export default App;
