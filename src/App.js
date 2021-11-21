// import logo from "./logo.svg";
import "./App.css";
import "./assets/styles/index.scss";
import DefaultLayout from "./components/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";

// import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </DefaultLayout>
      </div>
    </Router>
  );
}

export default App;
