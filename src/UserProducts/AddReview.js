import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

const AddReview = ({ productId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:9876/reviews/${productId}`, { rating, comment });
      console.log('Review added:', response.data);
      onClose(); // close the modal after successful submission
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Review</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input type="number" id="rating" min="0" max="5" value={rating} onChange={event => setRating(event.target.value)} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea id="comment" value={comment} onChange={event => setComment(event.target.value)} className="form-control" rows="5" required />
              </div>
              <button type="submit" className="btn btn-primary me-2">Submit</button>
              <Link  className="btn btn-outline-danger mx-2" to="/UserHome">Cancel</Link>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
