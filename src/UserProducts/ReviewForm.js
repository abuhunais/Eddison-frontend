import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewForm() {
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const review = {
      userId: 1,
      rating: rating,
      comment: comment,
    };

    axios
      .post(`http://localhost:9876/reviews/${id}`, review, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newReview = response.data;
        console.log("New review:", newReview);
        setShowMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
      <h3 style={{ marginBottom: "1rem" }}>Write a customer review</h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>Rating:</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} style={{ marginRight: "0.5rem" }}>
              <input
                type="radio"
                name="rating"
                value={value}
                style={{ display: "none" }}
                onChange={(event) => setRating(parseInt(event.target.value))}
              />
              <span
                className={rating >= value ? "active" : ""}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  width: "1.5rem",
                  height: "1.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                  color: rating >= value ? "#f0c040" : "",
                  background: rating >= value ? "#ffd230" : "",
                }}
              >
                {value}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ marginBottom: "0.5rem", display: "block" }}>
          Add a headline:
        </span>
        <input
          type="text"
          style={{ width: "100%", padding: "0.5rem" }}
          placeholder="What's most important to know?"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ marginBottom: "0.5rem", display: "block" }}>
          Write your review:
        </span>
        <textarea
          style={{ width: "100%", padding: "0.5rem", minHeight: "8rem" }}
          placeholder="What did you like or dislike? What did you use this product for?"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit" style={{ background: "#f0c040", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", cursor: "pointer" }}>
        Submit
      </button>
      {showMessage && (
        <div
          style={{
            marginLeft: "20rem",
            display: "flex",
            alignItems: "space-between",
            color: "green",
          }}
        >
          <span>Review submitted!</span>
        </div>
      )}
      <Link style={{
        backgroundColor: "#aaaad8"
      }} className="btn btn-outline-danger mx-2" to="/userhome">Cancel</Link>
    </form>
  );
}






