import React, { useState } from 'react';
import axios from 'axios';

function ProductDetails(props) {
  const { product } = props;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9876/reviews/${product.id}`, { comment, rating })
      .then((response) => {
        console.log(response);
        setShowReviewModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Reviews</h3>
      {product.reviews.map((review) => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <p>{review.rating}</p>
        </div>
      ))}
      <button onClick={() => setShowReviewModal(true)}>Add Review</button>
      {showReviewModal && (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Add a Review</h2>
            <div>
              <label htmlFor="comment">Comment:</label>
              <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
          </form>
          <button onClick={() => setShowReviewModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
