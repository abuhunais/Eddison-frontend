import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddToCartForm = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9876/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    axios
      .post("http://localhost:9876/cart/addProduct", {
        productId: product.id,
        userId: 1,
        quantity: quantity,
      })
      .then((response) => {
        alert("Added to cart successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while adding to cart.");
      });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <form>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </label>
        <button type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </form>
    </div>
  );
};

export default AddToCartForm;
