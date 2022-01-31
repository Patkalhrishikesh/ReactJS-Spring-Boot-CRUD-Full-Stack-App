import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListStudentComponent from "./components/ListStudentComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateStudentComponent from "./components/CreateStudentComponent";
import UpdateStudentComponent from "./components/UpdateStudentComponent";
import ViewStudentComponent from "./components/ViewStudentComponent";
import LoginForm from "./components/LoginForm";
import StudentSide from "./components/StudentSide";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="contentbgi">
          <div className="container ">
            <Switch>
              <Route path="/" exact component={LoginForm}></Route>
              <Route path="/login" exact component={LoginForm}></Route>
              <Route path="/students" component={ListStudentComponent}></Route>
              <Route path="/forgot-password" component={ForgotPassword}></Route>
              <Route
                path="/student-section/:id"
                component={StudentSide}
              ></Route>
              <Route
                path="/add-student/:id"
                component={CreateStudentComponent}
              ></Route>
              <Route
                path="/view-student/:id"
                component={ViewStudentComponent}
              ></Route>
              {/* <Route path = "/update-student/:id" component = {UpdateStudentComponent}></Route> */}
            </Switch>
          </div>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
