import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryReport.css';
import InventNav from '../UserLayout/InventNav';

export default function InventReport() {
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:9888/reports/inventory')
      .then(response => {
        setInventoryReport(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, an error occurred: {error.message}</p>;
  }

  if (!inventoryReport) {
    return null;
  }

  return (
    <div className="inventory-report">
        <InventNav/>
      <h2 className="title">Inventory Report</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventoryReport.products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Products:</td>
            <td>{inventoryReport.totalProducts}</td>
          </tr>
          <tr>
            <td>Total Stock:</td>
            <td>{inventoryReport.totalStock}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
