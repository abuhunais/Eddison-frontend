import React from 'react';
import { useLocation } from 'react-router-dom';

export default function UserOrderlist() {
  const { state } = useLocation();
  const orderedItems = state?.orderedItems || [];

  return (
    <div>
      <h2>Ordered Items</h2>
      {orderedItems.length === 0 ? (
        <p>No items ordered yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
