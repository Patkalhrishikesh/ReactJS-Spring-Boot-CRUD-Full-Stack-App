import React, { Component } from "react";
import StudentService from "../services/StudentService";

class ListStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.logoutSession = this.logoutSession.bind(this);
  }

  deleteStudent(id) {
    StudentService.deleteStudent(id).then((res) => {
      this.setState({
        students: this.state.students.filter((student) => student.id !== id),
      });
    });
  }
  viewStudent(id) {
    this.props.history.push(`/view-student/${id}`);
  }
  editStudent(id) {
    this.props.history.push(`/add-student/${id}`);
  }

  componentDidMount() {
    StudentService.getStudents().then((res) => {
      this.setState({ students: res.data });
    });
  }

  addStudent() {
    this.props.history.push("/add-student/_add");
  }

  logoutSession() {
    this.props.history.push("/login");

    const name = sessionStorage.getItem("username");
    const pass = sessionStorage.getItem("password");

    sessionStorage.removeItem("userSession");
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("username");
    localStorage.removeItem("user");
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Students List</h2>
        <div className="row justify-content-between">
          <button className="btn btn-primary" onClick={this.addStudent}>
            Add Student
          </button>
          <button className="btn btn-danger" onClick={this.logoutSession}>
            Log out
          </button>
        </div>
        <br></br>
        <div className="row">
          <div className=" d-flex flex-wrap justify-content-between ">
            {this.state.students.map((student) => (
              <div
                className="border border-dark border m-3 p-2 cardbgi"
                style={{ width: "500px" }}
              >
                <div
                  className={
                    student.role === "admin"
                      ? "fw-bold text-primary h3"
                      : "text-success h5"
                  }
                >
                  {student.role === "admin" ? "Admin" : "User"}
                </div>
                <div key={student.id}>
                  <div>
                    <span className=" font-weight-bold">
                      {student.role === "admin" ? "Name :" : "Student Name :"}
                    </span>
                    {student.firstName + " " + student.lastName}
                  </div>

                  <div>
                    <span className=" font-weight-bold">
                      {student.role === "admin"
                        ? "Email Id :"
                        : "Student Email Id :"}
                    </span>
                    {student.emailId}
                  </div>
                  <div>
                    <span className=" font-weight-bold">
                      {student.role === "admin"
                        ? "Phone no :"
                        : "Student Phone no :"}
                    </span>
                    {student.phoneNo}
                  </div>

                  <div className="mt-3">
                    <button
                      className="btn btn-sm m-1"
                      onClick={() => this.editStudent(student.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm m-1"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteStudent(student.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm m-1"
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewStudent(student.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ListStudentComponent;

{
  /* <table className="table table-striped table-bordered">
<thead>
  <tr></tr>
</thead>
<tbody>
  {this.state.students.map((student) => (
    <tr key={student.id}>
      <td> {student.firstName} </td>
      <td> {student.lastName}</td>
      <td> {student.emailId}</td>
      <td> {student.phoneNo}</td>
      <td> {student.dob}</td>
      <td> {student.password}</td>
      <td>
        <button
          onClick={() => this.editStudent(student.id)}
          className="btn btn-info"
        >
          Update
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => this.deleteStudent(student.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => this.viewStudent(student.id)}
          className="btn btn-info"
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table> */
}
