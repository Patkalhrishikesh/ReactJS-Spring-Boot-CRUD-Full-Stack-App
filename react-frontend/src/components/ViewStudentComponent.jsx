import React, { Component } from "react";
import StudentService from "../services/StudentService";

class ViewStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      student: {},
    };
    this.logoutSession = this.logoutSession.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      this.setState({ student: res.data });
    });
  }

  logoutSession() {
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className="m-2">
        <div className=" d-flex justify-content-end">
          <button className="btn btn-danger  m-2" onClick={this.logoutSession}>
            Log Out
          </button>
        </div>
        <div className=" d-flex justify-content-center ">
          <br></br>
          <div
            className="border border-dark border m-3 p-2 cardbgi"
            style={{ width: "500px" }}
          >
            <h3 className="text-center">
              {this.state.student.role === "admin"
                ? "view Admin Details"
                : "View Student Details"}
            </h3>
            <div className="card-body">
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? "Admin First Name: "
                    : "Student First Name: "}
                </label>
                <div> {this.state.student.firstName}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? "Admin Last Name:"
                    : "Student Last Name:"}
                </label>
                <div> {this.state.student.lastName}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? "Admin id: "
                    : "Student Roll no:  "}
                </label>
                <div> {this.state.student.id}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? "Admin Email ID: "
                    : "Student Email ID:"}
                </label>
                <div> {this.state.student.emailId}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? " Admin PhoneNo : "
                    : " Student PhoneNo : "}
                </label>
                <div> {this.state.student.phoneNo}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? " Admin dob:"
                    : " Student dob: "}
                </label>
                <div> {this.state.student.dob}</div>
              </div>
              <div className="row">
                <label>
                  {this.state.student.role === "admin"
                    ? "Admin password: "
                    : "Student password:"}
                </label>
                <div> {this.state.student.password}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewStudentComponent;
