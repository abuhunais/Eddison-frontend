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
    <div>
      <h1>Sales Report</h1>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <br />
      <label htmlFor="endDate">End Date:</label>
      <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <br />
      <button onClick={generateSalesReport}>Generate Report</button>
      {salesReport && (
        <div>
          <p>Total Sales: {salesReport.totalSales}</p>
          <p>Start Date: {salesReport.startDate}</p>
          <p>End Date: {salesReport.endDate}</p>
          <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
        </div>
        
      )}
    </div>
  );
}

