import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryReport.css';
import InventNav from '../UserLayout/InventNav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function InventReport() {
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:9876/reports/inventory')
      .then(response => {
        setInventoryReport(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    const tableRows = [];
    const products = inventoryReport.products;
    products.forEach(product => {
      const productData = [product.name, product.stock];
      tableRows.push(productData);
    });
    doc.autoTable({
      head: [['Product Name', 'In Stock']],
      body: tableRows,
    });
    doc.text(`Total Products: ${inventoryReport.totalProducts}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total Stock: ${inventoryReport.totalStock}`, 14, doc.autoTable.previous.finalY + 20);
    doc.save('inventory_report.pdf');
  }

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
      <button onClick={handleDownload}>Download as PDF</button>
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

