import React, { Component } from "react";
import StudentService from "../services/StudentService";

export default class StudentSide extends Component {
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
        <h3 className="text-center">Your Details</h3>

        <div className=" d-flex justify-content-center  ">
          <div className="border w-75 border-dark border m-3 p-2 cardbgi">
            <div className="">
              <div className="">
                <div className=" text-center">
                  <h4> Name</h4>
                  <h3 className="text-primary" style={{ fontSize: 40 }}>
                    {this.state.student.firstName +
                      " " +
                      this.state.student.lastName}
                  </h3>
                </div>
              </div>

              <div className=" text-center">
                <h4> Email ID: </h4>
                <h3 className="text-primary" style={{ fontSize: 40 }}>
                  {this.state.student.emailId}
                </h3>
              </div>
              <div className="text-center">
                <h4> PhoneNo : </h4>
                <h3 className="text-primary" style={{ fontSize: 40 }}>
                  {this.state.student.phoneNo}
                </h3>
              </div>
              <div className="text-center">
                <h4> dob: </h4>
                <h3 className="text-primary" style={{ fontSize: 40 }}>
                  {this.state.student.dob}
                </h3>
              </div>
              <div className="text-center">
                <h4> password: </h4>
                <h3 className="text-primary" style={{ fontSize: 40 }}>
                  {" "}
                  {this.state.student.password}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
