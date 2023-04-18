import React, { Component } from "react";
// import "../style.css";
import User from "../Service/UserService.js";
import { Link } from "react-router-dom";

// import ViewUserComponent from "./ViewUserComponent";
// import Signin from "./Signin";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailId: "",
      password: "",
      number:"",
      address:"",
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  register = (event) => {
    event.preventDefault();
    let user = {
      // emailId: this.state.emailId,
      userName: this.state.userName,
      password: this.state.password,
      emailId: this.state.emailId,
      number:this.state.number,
      address:this.state.address,
    };
    console.log(JSON.stringify(user));
    User.getUserByName(this.state.userName)
      .then((res) => {
        if (res.data == "") {
          User.saveUser(user)
            .then((res) => {
              console.log(res.data);
              alert("registration successful");
              // window.location.reload(false);
              window.location.href = "/Signin";
              //window.location.href = "http://localhost:3000/login";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    return (
      <div id="op">
      
      <nav class="navbar navbar-dark bg-warning"><span></span>
      <a class="navbar-brand" href="#">ECOMMERCE</a>
      <Link class="btn btn-outline-success my-2 my-sm-0" to="/Signin" >Signin</Link>
      <Link class="btn btn-outline-success my-2 my-sm-0" to="/Admin" >Admin</Link>

  </nav>

     
        
<div className="main">
        <form className="form-main" onSubmit={this.register}>
          <h2>REGISTRATION</h2>
          <input
            type="text"
            className="field"
            name="userName"
            placeholder="Enter User Name"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="email"
            className="field"
            name="emailId"
            placeholder="Enter E-mail Address"
            value={this.state.emailId}
            onChange={this.handleChange.bind(this)}
            required
          />
          <input
            type="password"
            className="field"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            required
          />
          <input
            type="text"
            className="field"
            name="number"
            placeholder="Enter phone number"
            value={this.state.number}
            onChange={this.handleChange.bind(this)}
            required
          />
          <input
            type="text"
            className="field"
            name="address"
            placeholder="Enter  Address"
            value={this.state.address}
            onChange={this.handleChange.bind(this)}
            required
          />
          <button type="submit" className="butr">
            SIGNUP
          </button>
        </form><div className="text-center left-main p-2">
        

        
        {/* <ViewLoanComponent/> */}

       




        </div>
      </div></div>
    );
  }
}