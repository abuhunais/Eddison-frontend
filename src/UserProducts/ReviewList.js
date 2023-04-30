import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import "./Reviewlist.css";

export default function ReviewList() {
  const { id} = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9876/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div>
      <h3>Product Reviews</h3>
      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link style={{
        backgroundColor: "#aaaad8"
      }} className="btn btn-outline-danger mx-2" to="/userhome">Cancel</Link>
    </div>
  );
}
