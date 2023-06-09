import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import Nav from '../UserLayout/Nav';
function ContactUsForm() {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [question, setQuestion] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuery = { name, emailId, phoneNo, question };
    axios
      .post("http://localhost:9876/contact/querypost", newQuery)
      .then((response) => {
        console.log(response);
        // Reset form fields on success
        setName("");
        setEmailId("");
        setPhoneNo("");
        setQuestion("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const usernamemain = localStorage.getItem('userName');
  // const useremailmain = localStorage.getItem('email');
  const [dropdownOpen, setDropdownOpen] = useState(false);


  // function handleLogout() {
  //   const { signOut } = useGoogleLogout();
  
  //   signOut();
  // }
  

  

//   const [isLoggedOut, setIsLoggedOut] = useState(false);
  
//   const logout = useGoogleLogout({
//     clientId: '839098834141-hq8lr99sogsmn2s54iins6c0ge7rln5d.apps.googleusercontent.com',
//     onLogoutSuccess: () => {
//         setIsLoggedOut(true);
//         console.log('Logout successful');
//     },
//     onFailure: (err) => {
//         console.log('Logout failed with error:', err);
//     }
// });

// if (isLoggedOut) {
//     window.location.href='http://localhost:3000/'; // Redirect to home page after logout
// }
  return (
  
      <div class="row justify-content-center">
        <Nav />
                    <div style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}></div>
      <div class="form-group col-md-6 col-md-offset-5 align-center ">
      <h1>Contact Us Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={usernamemain}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div></div>
  );
}

export default ContactUsForm;