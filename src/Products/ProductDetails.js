import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9876/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Description:</td>
            <td>{product.description}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>${product.price}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/view">Back to Products</Link>
      <style jsx>{`
        table {
          border-collapse: collapse;
          margin-top: 1rem;
          width: 50%;
        }
        td {
          border: 1px solid black;
          padding: 0.5rem;
          text-align: left;
        }
        td:first-child {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;
