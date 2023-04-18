import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SalesReport() {
  const [salesReport, setSalesReport] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateSalesReport = async () => {
    const response = await fetch(`http://localhost:9876/reports/sales?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    setSalesReport(data);
  };

  return (
    <div style={{ fontFamily: 'Arial', fontSize: '18px' }}>
      <h1 style={{ color: 'blue', textDecoration: 'underline' }}>Sales Report</h1>
      <label htmlFor="startDate" style={{ marginRight: '10px' }}>Start Date:</label>
      <input 
        type="date" 
        id="startDate" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
        style={{ marginBottom: '10px', marginLeft: '5px', borderRadius: '5px' }} 
      />
      <br />
      <label htmlFor="endDate" style={{ marginRight: '10px' }}>End Date:</label>
      <input 
        type="date" 
        id="endDate" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
        style={{ marginBottom: '10px', marginLeft: '5px', borderRadius: '5px' }} 
      />
      <br />
      <button onClick={generateSalesReport} style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
        Generate Report
      </button>
      {salesReport && (
        <div>
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total Sales: {salesReport.totalSales}</p>
          <p style={{ marginTop: '5px' }}>Start Date: {salesReport.startDate}</p>
          <p style={{ marginTop: '5px' }}>End Date: {salesReport.endDate}</p>
          <Link 
            to="/" 
            style={{ 
              backgroundColor: 'red', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '5px', 
              marginTop: '10px', 
              display: 'inline-block', 
              textDecoration: 'none' 
            }}
          >
            Cancel
          </Link>
        </div>
      )}
    </div>
  );
}
