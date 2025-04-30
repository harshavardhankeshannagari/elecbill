import React from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function PrintBill() {
  const location = useLocation();
  const { bill } = location.state || {};

  // Ensure the bill data is available before rendering
  if (!bill) {
    return <p>No bill data found!</p>;
  }

  const handlePrint = () => {
    // Ensure the bill data is available for printing
    if (!bill) {
      alert("No bill data found!");
      return;
    }

    // Use html2canvas to capture the content
    html2canvas(document.getElementById('bill-print')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('bill.pdf');
    });
  };

  return (
    <div className="print-bill-container">
      <div id="bill-print" className="print-bill">
        <h2>Electricity Bill</h2>
        <p><strong>Name:</strong> {bill.name}</p>
        <p><strong>Meter No:</strong> {bill.meter}</p>
        <p><strong>Month:</strong> {bill.month}</p>
        <p><strong>Units:</strong> {bill.units}</p>
        <p><strong>Amount:</strong> ₹{bill.amount}</p>
        <p><strong>Due Date:</strong> {bill.dueDate}</p>
      </div>

      <button onClick={handlePrint}>📜 Print Bill</button>
    </div>
  );
}

export default PrintBill;
