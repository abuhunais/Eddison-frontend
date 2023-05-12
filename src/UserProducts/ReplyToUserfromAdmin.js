import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from '../UserLayout/UserNavbar';

// import NavNotification from "./NavNotification";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
function ReplyToUserfromAdmin() {
  const [queries, setQueries] = useState([]);

 

  useEffect(() => {
    axios
      .get("http://localhost:9876/reply/viewreply")
      .then((response) => {
        setQueries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
//   const [data, setData] = useState([]);

  

  return (
    


      <div className="container mt-5">
        <UserNavbar/>

        <h1 className="mb-4">Admin Message</h1>
        <table className="table table-striped table-dark table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} class="table-danger" >
                <td>{query.id}</td>
                <td>{query.reply}</td>
                {/* <td><button className="navbtn2" onClick={() => handleDelete(query.contactId)}>Delete</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
}

export default ReplyToUserfromAdmin;