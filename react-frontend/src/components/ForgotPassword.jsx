import React, { Component } from "react";
import Axios from "axios";
import StudentService from "../services/StudentService";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      emailId: "",
      phoneNo: "",
      password: "",
      statement: false,
      id: 0,
      valid: true,
    };
    this.changePhoneNoHandler = this.changePhoneNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
  }

  changePhoneNoHandler(e) {
    this.setState({ phoneNo: e.target.value });
    console.log(e.target.value);
  }
  changeEmailHandler(e) {
    this.setState({ emailId: e.target.value });
  }

  componentDidMount() {
    StudentService.getStudents().then((res) => {
      this.setState({ students: res.data });
    });
    console.log("method called");
  }

  goTo = () => {
    let bool = false;
    this.state.students.map((student) => {
      console.log(student.emailId + " " + student.phoneNo);
      if (
        student.phoneNo == this.state.phoneNo &&
        student.emailId == this.state.emailId
      ) {
        this.setState({ password: student.password });
        this.setState({ valid: true });
        this.setState({ statement: true });
        bool = true;
      }
    });
    if (bool == false) {
      this.setState({ valid: false });
      this.setState({ statement: false });
    }
  };
  render() {
    const { phoneNo, password } = this.state;
    return (
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div
          className="container-fluid p-3 m-4 formbg"
          style={{
            width: "500px",
            borderRadius: "10px",
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)",
          }}
        >
          <div>
            <div className="form-group">
              <label> Email Id: </label>
              <input
                type="email"
                placeholder="Email Address"
                name="emailId"
                className="form-control"
                value={this.state.emailId}
                onChange={this.changeEmailHandler}
                required
              />
            </div>
            <div className="form-group">
              <label> Phone No</label>
              <input
                type="text"
                placeholder="phoneNo"
                name="phoneNo"
                className="form-control"
                value={this.state.phoneNo}
                onChange={this.changePhoneNoHandler}
                required
              />
            </div>
          </div>

          <div className="text-center h4">
            {this.state.statement ? "your passsword is" : ""}
          </div>
          <div
            className={
              this.state.valid ? "display-3 text-center" : "text-danger h5"
            }
          >
            {this.state.valid
              ? password
              : "*Invalid No , we dont have any user by this email and Phone number as registered"}
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary w-100"
              style={{ borderRadius: "5px" }}
              onClick={this.goTo}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
