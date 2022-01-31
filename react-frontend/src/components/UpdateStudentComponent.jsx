import React, { Component } from "react";
import StudentService from "../services/StudentService";

class UpdateStudentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      dob: "",
      phoneNo: "",
      password: "",
      formErrors: {},
    };

    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeDobHandler = this.changeDobHandler.bind(this);

    this.initialState = this.state;
  }

  componentDidMount() {
    // step 4

    StudentService.getStudentById(this.state.id).then((res) => {
      let student = res.data;
      this.setState({
        firstName: student.firstName,
        lastName: student.lastName,
        emailId: student.emailId,
        phoneNo: student.phoneNo,
        dob: student.dob,
        password: student.password,
        role: student.role,
      });
    });
  }

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeDobHandler = (event) => {
    this.setState({ dob: event.target.value });
  };

  cancel() {
    this.props.history.push("/students");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Student</h3>;
    } else {
      return <h3 className="text-center">Update Student</h3>;
    }
  }
  handleFormValidation() {
    const { firstName, lastName, emailId, password, phoneNo } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //first name
    if (!firstName) {
      formIsValid = false;
      formErrors["firstNameErr"] = "Name is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(firstName)) {
      formIsValid = false;
      formErrors["firstNameErr"] = "Invalid first name.";
    }

    //last name
    if (!lastName) {
      formIsValid = false;
      formErrors["lastNameErr"] = "Name is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(lastName)) {
      formIsValid = false;
      formErrors["lastNameErr"] = "Invalid last name.";
    }

    //Email
    if (!emailId) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id.";
    }

    //password
    if (!password) {
      formIsValid = false;
      formErrors["passwordErr"] = "password is required";
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password)
    ) {
      formIsValid = false;
      formErrors["passwordErr"] =
        "password shouls contain atleast one special char and number.";
    }

    //Phone number
    if (!phoneNo) {
      formIsValid = false;
      formErrors["phoneNoErr"] = "Phone number is required.";
    } else {
      var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
      if (!mobPattern.test(phoneNo)) {
        formIsValid = false;
        formErrors["phoneNoErr"] = "Invalid phone number.";
      }
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleFormValidation()) {
      e.preventDefault();
      let student = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
        phoneNo: this.state.phoneNo,
        dob: this.state.dob,
        password: this.state.password,
        role: this.state.role,
      };
      console.log("student => " + JSON.stringify(student));
      console.log("id => " + JSON.stringify(this.state.id));
      StudentService.updateStudent(student, this.state.id).then((res) => {
        this.props.history.push("/students");
      });
      // alert("You have been successfully registered.");
      this.setState(this.initialState);
    }
  };

  render() {
    const { firstNameErr, lastNameErr, passwordErr, emailIdErr, phoneNoErr } =
      this.state.formErrors;

    return (
      <div className="m-2">
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div
                className="container-fluid p-3 m-4 formbg"
                style={{
                  width: "500px",
                  borderRadius: "10px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)",
                }}
              >
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      placeholder="Your name.."
                      className={
                        firstNameErr ? "form-control showError" : "form-control"
                      }
                    />
                    {firstNameErr && (
                      <div style={{ color: "red", paddingBottom: 10 }}>
                        {firstNameErr}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      placeholder="Your name.."
                      className={
                        lastNameErr ? "form-control showError" : "form-control"
                      }
                    />
                    {lastNameErr && (
                      <div style={{ color: "red", paddingBottom: 10 }}>
                        {lastNameErr}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="emailId">Email Id</label>
                    <input
                      type="text"
                      name="emailId"
                      value={this.state.emailId}
                      onChange={this.handleChange}
                      placeholder="Your email id.."
                      className={
                        emailIdErr ? "form-control showError" : "form-control"
                      }
                    />
                    {emailIdErr && (
                      <div style={{ color: "red", paddingBottom: 10 }}>
                        {emailIdErr}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="emailId">Password</label>
                    <input
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Your password.."
                      className={
                        passwordErr ? "form-control showError" : "form-control"
                      }
                    />
                    {passwordErr && (
                      <div style={{ color: "red", paddingBottom: 10 }}>
                        {passwordErr}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label> Date of Birth: </label>
                    <input
                      type="date"
                      placeholder="Date Of Birth"
                      name="dob"
                      className="form-control"
                      value={this.state.dob}
                      onChange={this.changeDobHandler}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNo"
                      onChange={this.handleChange}
                      value={this.state.phoneNo}
                      placeholder="Your phone number.."
                      className={
                        phoneNoErr ? "form-control showError" : "form-control"
                      }
                    />
                    {phoneNoErr && (
                      <div style={{ color: "red", paddingBottom: 10 }}>
                        {phoneNoErr}
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    value="save"
                    className="btn btn-primary mt-2"
                  />
                  <button
                    className="btn btn-danger  mt-2"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStudentComponent;

/*
import React, { Component } from "react";
import StudentService from "../services/StudentService";

class UpdateStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNo: "",
      dob: "",
      password: "",
      role: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changePhoneNoHandler = this.changePhoneNoHandler.bind(this);
    this.changeDobHandler = this.changeDobHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then((res) => {
      let student = res.data;
      this.setState({
        firstName: student.firstName,
        lastName: student.lastName,
        emailId: student.emailId,
        phoneNo: student.phoneNo,
        dob: student.dob,
        password: student.password,
        role: student.role,
      });
    });
  }

  updateStudent = (e) => {
    e.preventDefault();
    let student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      phoneNo: this.state.phoneNo,
      dob: this.state.dob,
      password: this.state.password,
      role: this.state.role,
    };
    console.log("student => " + JSON.stringify(student));
    console.log("id => " + JSON.stringify(this.state.id));
    StudentService.updateStudent(student, this.state.id).then((res) => {
      this.props.history.push("/students");
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  changePhoneNoHandler = (event) => {
    this.setState({ phoneNo: event.target.value });
  };

  changeDobHandler = (event) => {
    this.setState({ dob: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  cancel() {
    this.props.history.push("/students");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Student</h3>
              <div
                className="container-fluid p-3 m-4 formbg"
                style={{
                  width: "500px",
                  borderRadius: "10px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)",
                }}
              >
                <form>
                  <div>
                    <div className="form-group">
                      <label> First Name: </label>
                      <input
                        placeholder="First Name"
                        name="firstName"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={this.changeFirstNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label> Last Name: </label>
                      <input
                        placeholder="Last Name"
                        name="lastName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label> Email Id: </label>
                      <input
                        placeholder="Email Address"
                        name="emailId"
                        className="form-control"
                        value={this.state.emailId}
                        onChange={this.changeEmailHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label> Phone No: </label>
                      <input
                        placeholder="Phone Number"
                        name="phoneNo"
                        className="form-control"
                        value={this.state.phoneNo}
                        onChange={this.changePhoneNoHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label> Date of Birth: </label>
                      <input
                        type="date"
                        placeholder="Date Of Birth"
                        name="dob"
                        className="form-control"
                        value={this.state.dob}
                        onChange={this.changeDobHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label> Password :</label>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.changePasswordHandler}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={this.updateStudent}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStudentComponent;

*/
