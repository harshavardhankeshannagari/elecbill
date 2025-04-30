import React, { useEffect, useState } from 'react';
import BillChart from './BillChart';
import { Link } from 'react-router-dom';
import '../styles/billing.css';

function BillingList() {
  const [records, setRecords] = useState([]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  const recordsPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('billings')) || [];
    setRecords(stored);
    setDisplayedRecords(stored);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  useEffect(() => {
    filterAndSortRecords();
  }, [search, sortField, records, selectedMonth]);

  const filterAndSortRecords = () => {
    let filtered = [...records];

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.meter.toLowerCase().includes(term) ||
          r.month.toLowerCase().includes(term)
      );
    }

    if (selectedMonth) {
      filtered = filtered.filter((r) => r.month === selectedMonth);
    }

    if (sortField) {
      filtered.sort((a, b) =>
        sortField === 'units' || sortField === 'amount'
          ? Number(a[sortField]) - Number(b[sortField])
          : a[sortField].localeCompare(b[sortField])
      );
    }

    // Sort pinned records to the top
    filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    setDisplayedRecords(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (record) => {
    setEditingRecord({ ...record });
  };

  const handleSave = () => {
    if (editingRecord) {
      const updatedRecords = records.map((r) =>
        r.id === editingRecord.id ? editingRecord : r
      );
      setRecords(updatedRecords);
      localStorage.setItem('billings', JSON.stringify(updatedRecords));
      setEditingRecord(null); // Close the edit form
      setDisplayedRecords(updatedRecords);
    }
  };

  const handleDelete = (id) => {
    const updatedRecords = records.filter((r) => r.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem('billings', JSON.stringify(updatedRecords));
    setDisplayedRecords(updatedRecords);
  };

  const togglePin = (record, index) => {
    const updated = [...records];
    updated[index].pinned = !updated[index].pinned;
    localStorage.setItem('billings', JSON.stringify(updated));
    setRecords(updated);
  };

  const paginate = (items) => {
    const start = (currentPage - 1) * recordsPerPage;
    return items.slice(start, start + recordsPerPage);
  };

  const pageCount = Math.ceil(displayedRecords.length / recordsPerPage);

  return (
    <div className="billing-container">
      <h2>Billing Records</h2>

      <div className="billing-toolbar">
        <input
          type="text"
          placeholder="Search by name, meter, month..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortField(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="units">Units</option>
          <option value="amount">Amount</option>
        </select>

        <select onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Filter by Month</option>
          {['January', 'February', 'March', 'April', 'May'].map((month, i) => (
            <option key={i} value={month}>
              {month}
            </option>
          ))}
        </select>

        <Link to={{ pathname: '/print' }} state={{ bill: displayedRecords[0] }}>
          <button>📜 Print Bill</button>
        </Link>
      </div>

      {displayedRecords.length === 0 ? (
        <p>No billing records found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Meter</th>
                <th>Month</th>
                <th>Units</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginate(displayedRecords).map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.meter}</td>
                  <td>{r.month}</td>
                  <td>{r.units}</td>
                  <td>{r.amount}</td>
                  <td>
                    <button onClick={() => togglePin(r, i)}>
                      {r.pinned ? '📌 Unpin' : '📍 Pin'}
                    </button>
                    <button onClick={() => handleEdit(r)}>Edit</button>
                    <button onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {[...Array(pageCount)].map((_, i) => (
              <button
                key={i}
                className={i + 1 === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <BillChart records={displayedRecords} />
        </>
      )}

      {editingRecord && (
        <div className="edit-form">
          <h3>Edit Billing Record</h3>
          <input
            type="text"
            value={editingRecord.name}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={editingRecord.meter}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, meter: e.target.value })
            }
            placeholder="Meter"
          />
          <input
            type="text"
            value={editingRecord.month}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, month: e.target.value })
            }
            placeholder="Month"
          />
          <input
            type="number"
            value={editingRecord.units}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, units: e.target.value })
            }
            placeholder="Units"
          />
          <input
            type="number"
            value={editingRecord.amount}
            onChange={(e) =>
              setEditingRecord({ ...editingRecord, amount: e.target.value })
            }
            placeholder="Amount"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default BillingList;
