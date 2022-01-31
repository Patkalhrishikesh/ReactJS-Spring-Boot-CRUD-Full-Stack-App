import React, { Component } from "react";
import Axios from "axios";
import StudentService from "../services/StudentService";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      emailId: "",
      password: "",
      id: 0,
      valid: true,
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
  }

  componentDidMount() {
    StudentService.getStudents().then((res) => {
      this.setState({ students: res.data });
    });
  }

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changeEmailHandler = (event) => {
    // console.log(event.target.value);
    this.setState({ emailId: event.target.value });
  };

  viewStudent(id) {
    this.props.history.push(`/student-section/${id}`);
  }

  goTo = () => {
    let validuser = false;
    let validadmin = false;

    this.state.students.map((student) => {
      console.log(student.emailId + " " + student.password);
      if (
        student.emailId === this.state.emailId &&
        student.password === this.state.password &&
        student.role === "admin"
      ) {
        validadmin = true;
        this.setState({ valid: true });
        sessionStorage.setItem("admin", "admin");
        sessionStorage.setItem("username", student.emailId);
        sessionStorage.setItem("password", student.passWord);
        const userdata = {
          email: student.emailId,
          password: student.password,
        };
        sessionStorage.setItem(
          "userdata",
          userdata.email + " " + userdata.password
        );
        sessionStorage.setItem("userSession", student.emailId);
        localStorage.setItem("user", student.emailId);
      } else if (
        student.emailId === this.state.emailId &&
        student.password === this.state.password
      ) {
        validuser = true;
        this.setState({ valid: true });
        this.viewStudent(student.id);
      } else {
        this.setState({ valid: false });
      }
    });

    if (validadmin) {
      this.props.history.push("/students");
      console.log("welcome admin");
      return;
    } else if (validuser) {
      // this.props.history.push(`/view-student/${this.state.id}`);
      console.log("welcome user");
    } else {
      console.log("invalid user");
    }
  };
  render() {
    const { emailId, password } = this.state;
    return (
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
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
            <label> Password :</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.changePasswordHandler}
              required
            />
          </div>
          <div className="text-danger" style={{ fontSize: 25 }}>
            {this.state.valid ? "" : "*Please enter valid details"}
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary w-100"
              style={{ borderRadius: "5px" }}
              onClick={this.goTo}
            >
              log in
            </button>
          </div>

          <div className="d-flex justify-content-end">
            <a href="/forgot-password" className="text-dark mt-2">
              <u>ForgotPassword</u>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

































/*
useEffect(() => {
  document.title = "Login";
}, []);

const [user, setuser] = useState({});

//Handler of Login form
const handlerForm = (e) => {
  checkLogin(user);
  e.preventDefault();
};

//Login check method
const checkLogin = (data) => {
  axios.post(`${base_url}/login`, data).then(
    (response) => {
      if (response.data.length == 0) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Credentials Entered or you have not registered yet.",
        });
      } else {
        if (response.data[0].admin == true) {
          window.location = "/admin";
          sessionStorage.setItem("admin", "admin");
        } else {
          sessionStorage.setItem("username", response.data[0].name);
          const userdata = {
            name: response.data[0].name,
            email: response.data[0].email,
            city: response.data[0].city,
            phone: response.data[0].phone,
          };
          sessionStorage.setItem("userdata", JSON.stringify(userdata));
          sessionStorage.setItem("userSession", response.data[0].email);
          localStorage.setItem("user", response.data[0].email);
          window.location = "/home";
        }
      }
    },
    (error) => {
      console.log(error);
      swal.fire({
        icon: "error",
        title: "Oh no!",
        text: "Server is down",
      });
    }
  );
};




const name = sessionStorage.getItem("username");
  const endSession = () => {
    sessionStorage.removeItem("userSession");
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("username");
    localStorage.removeItem("user");
  };
*/
